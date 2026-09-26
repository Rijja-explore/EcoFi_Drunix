import express from 'express';
import cors from 'cors';
import { createGateway } from './gateway/index.js';

const { gateway, mode, warning } = createGateway();

const app = express();
app.use(cors());
app.use(express.json());

const execute = (res, fn) => {
  try {
    res.json({ ok: true, data: fn(), mode, warning });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message, mode, warning });
  }
};

app.get('/api/health', (_, res) => {
  res.json({ ok: true, mode, warning });
});

app.get('/api/dashboard', (_, res) => execute(res, () => gateway.getDashboard()));
app.post('/api/projects', (req, res) => execute(res, () => gateway.CreateProject(req.body)));
app.get('/api/projects/:projectId', (req, res) => execute(res, () => gateway.GetProject(req.params.projectId)));
app.post('/api/investments', (req, res) => execute(res, () => gateway.CreateInvestment(req.body)));
app.post('/api/payments/requests', (req, res) => execute(res, () => gateway.CreatePaymentRequest(req.body)));
app.post('/api/milestones', (req, res) => execute(res, () => gateway.SubmitMilestone(req.body)));
app.post('/api/impact-reports', (req, res) => execute(res, () => gateway.SubmitImpactData(req.body)));
app.post('/api/milestones/:milestoneId/verify', (req, res) =>
  execute(res, () => gateway.VerifyMilestone({ milestoneId: req.params.milestoneId, ...req.body }))
);
app.post('/api/payments/:paymentRequestId/evaluate-risk', (req, res) =>
  execute(res, () => gateway.EvaluatePaymentRisk({ paymentRequestId: req.params.paymentRequestId, ...req.body }))
);
app.post('/api/payments/:paymentRequestId/approve', (req, res) =>
  execute(res, () => gateway.ApprovePayment({ paymentRequestId: req.params.paymentRequestId, ...req.body }))
);
app.post('/api/payments/:paymentRequestId/reject', (req, res) =>
  execute(res, () => gateway.RejectPayment({ paymentRequestId: req.params.paymentRequestId, ...req.body }))
);
app.post('/api/payments/:paymentRequestId/release', (req, res) =>
  execute(res, () => gateway.ReleaseMilestonePayment({ paymentRequestId: req.params.paymentRequestId, ...req.body }))
);
app.post('/api/transactions/:transactionId/flag', (req, res) =>
  execute(res, () => gateway.FlagSuspiciousTransaction({ transactionId: req.params.transactionId, ...req.body }))
);
app.post('/api/risk-alerts/:riskAlertId/resolve', (req, res) =>
  execute(res, () => gateway.ResolveRiskAlert({ riskAlertId: req.params.riskAlertId, ...req.body }))
);
app.get('/api/history', (req, res) => execute(res, () => gateway.GetTransactionHistory({ entityId: req.query.entityId })));
app.post('/api/certificates', (req, res) => execute(res, () => gateway.IssueImpactCertificate(req.body)));

export default app;
