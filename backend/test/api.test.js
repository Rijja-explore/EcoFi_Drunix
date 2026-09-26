import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('health endpoint reports mode', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.ok, true);
  assert.equal(typeof res.body.mode, 'string');
});

test('project to payment workflow works in mock gateway', async () => {
  const projectRes = await request(app).post('/api/projects').send({
    name: 'Wind Cluster',
    issuerOrganizationId: 'ORG-NEW-1',
    fundingTarget: 100000,
    location: 'Pune'
  });
  assert.equal(projectRes.status, 200);
  const projectId = projectRes.body.data.id;

  const investRes = await request(app).post('/api/investments').send({
    projectId,
    investorOrganizationId: 'ORG-INV-22',
    amount: 25000,
    currency: 'INR'
  });
  assert.equal(investRes.status, 200);

  const paymentRes = await request(app).post('/api/payments/requests').send({
    projectId,
    milestoneName: 'Site Preparation',
    amount: 20000,
    requestedBy: 'USER-OP-1'
  });
  assert.equal(paymentRes.status, 200);
  const paymentRequestId = paymentRes.body.data.id;

  const riskRes = await request(app)
    .post(`/api/payments/${paymentRequestId}/evaluate-risk`)
    .send({ evaluatorUserId: 'USER-RISK-1' });
  assert.equal(riskRes.status, 200);
  assert.ok(['LowRisk', 'HighRisk'].includes(riskRes.body.data.riskStatus));

  const approveRes = await request(app)
    .post(`/api/payments/${paymentRequestId}/approve`)
    .send({ approverUserId: 'USER-VERIFIER-1' });
  assert.equal(approveRes.status, 200);

  const releaseRes = await request(app)
    .post(`/api/payments/${paymentRequestId}/release`)
    .send({ operatorUserId: 'USER-FINOPS-1' });
  assert.equal(releaseRes.status, 200);
  assert.equal(releaseRes.body.data.status, 'Released');

  const certRes = await request(app).post('/api/certificates').send({
    projectId,
    investmentId: investRes.body.data.id,
    summary: 'Milestone payment completed and impact data recorded.'
  });
  assert.equal(certRes.status, 200);

  const historyRes = await request(app).get('/api/history');
  assert.equal(historyRes.status, 200);
  assert.ok(historyRes.body.data.length >= 5);
});
