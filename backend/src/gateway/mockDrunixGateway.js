const now = () => new Date().toISOString();

const id = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export class MockDrunixGateway {
  constructor() {
    this.projects = new Map();
    this.investments = new Map();
    this.paymentRequests = new Map();
    this.milestones = new Map();
    this.impactReports = new Map();
    this.riskAlerts = new Map();
    this.certificates = new Map();
    this.organizations = new Map();
    this.userRoles = new Map();
    this.history = [];
    this.seed();
  }

  seed() {
    const project = this.CreateProject({
      name: 'Solar Community Grid',
      issuerOrganizationId: 'ORG-ISSUER-001',
      fundingTarget: 250000,
      location: 'Jaipur',
      description: 'Distributed rooftop solar and battery project.'
    });

    this.organizations.set('ORG-ISSUER-001', {
      id: 'ORG-ISSUER-001',
      name: 'Green Infra Finance Ltd',
      type: 'Issuer',
      createdAt: now()
    });
    this.userRoles.set('USER-VERIFIER-001', {
      userId: 'USER-VERIFIER-001',
      role: 'Verifier',
      organizationId: 'ORG-ISSUER-001',
      createdAt: now()
    });

    this.CreateInvestment({
      projectId: project.id,
      investorOrganizationId: 'ORG-INVESTOR-001',
      amount: 50000,
      currency: 'INR'
    });
  }

  record(txType, payload) {
    const entry = { id: id('TX'), txType, timestamp: now(), payload };
    this.history.unshift(entry);
    return entry;
  }

  CreateProject(input) {
    const project = {
      id: id('PROJECT'),
      status: 'Registered',
      createdAt: now(),
      ...input
    };
    this.projects.set(project.id, project);
    this.record('CreateProject', project);
    return project;
  }

  GetProject(projectId) {
    return this.projects.get(projectId) || null;
  }

  CreateInvestment(input) {
    if (!this.projects.has(input.projectId)) throw new Error('Project not found');
    const investment = { id: id('INVEST'), createdAt: now(), ...input };
    this.investments.set(investment.id, investment);
    this.record('CreateInvestment', investment);
    return investment;
  }

  CreatePaymentRequest(input) {
    if (!this.projects.has(input.projectId)) throw new Error('Project not found');
    const paymentRequest = {
      id: id('PAYREQ'),
      status: 'Requested',
      riskStatus: 'Pending',
      createdAt: now(),
      ...input
    };
    this.paymentRequests.set(paymentRequest.id, paymentRequest);
    this.record('CreatePaymentRequest', paymentRequest);
    return paymentRequest;
  }

  SubmitMilestone(input) {
    if (!this.projects.has(input.projectId)) throw new Error('Project not found');
    const milestone = { id: id('MILESTONE'), status: 'Submitted', createdAt: now(), ...input };
    this.milestones.set(milestone.id, milestone);
    this.record('SubmitMilestone', milestone);
    return milestone;
  }

  SubmitImpactData(input) {
    const report = { id: id('IMPACT'), createdAt: now(), ...input };
    this.impactReports.set(report.id, report);
    this.record('SubmitImpactData', report);
    return report;
  }

  VerifyMilestone({ milestoneId, verifierUserId, approved, notes }) {
    const milestone = this.milestones.get(milestoneId);
    if (!milestone) throw new Error('Milestone not found');
    milestone.status = approved ? 'Verified' : 'Rejected';
    milestone.verifiedBy = verifierUserId;
    milestone.verificationNotes = notes || '';
    milestone.verifiedAt = now();
    this.record('VerifyMilestone', milestone);
    return milestone;
  }

  EvaluatePaymentRisk({ paymentRequestId }) {
    const payment = this.paymentRequests.get(paymentRequestId);
    if (!payment) throw new Error('Payment request not found');
    const riskScore = payment.amount > 100000 ? 78 : 22;
    payment.riskScore = riskScore;
    payment.riskStatus = riskScore >= 70 ? 'HighRisk' : 'LowRisk';

    if (riskScore >= 70) {
      this.FlagSuspiciousTransaction({
        transactionId: payment.id,
        reason: 'High value payment request above demo threshold'
      });
    }

    this.record('EvaluatePaymentRisk', payment);
    return payment;
  }

  ApprovePayment({ paymentRequestId, approverUserId, comments }) {
    const payment = this.paymentRequests.get(paymentRequestId);
    if (!payment) throw new Error('Payment request not found');
    payment.status = 'Approved';
    payment.approvedBy = approverUserId;
    payment.approvalComments = comments || '';
    payment.approvedAt = now();
    this.record('ApprovePayment', payment);
    return payment;
  }

  RejectPayment({ paymentRequestId, approverUserId, reason }) {
    const payment = this.paymentRequests.get(paymentRequestId);
    if (!payment) throw new Error('Payment request not found');
    payment.status = 'Rejected';
    payment.rejectedBy = approverUserId;
    payment.rejectionReason = reason;
    payment.rejectedAt = now();
    this.record('RejectPayment', payment);
    return payment;
  }

  ReleaseMilestonePayment({ paymentRequestId, operatorUserId }) {
    const payment = this.paymentRequests.get(paymentRequestId);
    if (!payment) throw new Error('Payment request not found');
    if (payment.status !== 'Approved') throw new Error('Only approved payments can be released');
    payment.status = 'Released';
    payment.releasedBy = operatorUserId;
    payment.releasedAt = now();
    this.record('ReleaseMilestonePayment', payment);
    return payment;
  }

  FlagSuspiciousTransaction({ transactionId, reason }) {
    const alert = {
      id: id('RISK'),
      transactionId,
      reason,
      status: 'Open',
      createdAt: now()
    };
    this.riskAlerts.set(alert.id, alert);
    this.record('FlagSuspiciousTransaction', alert);
    return alert;
  }

  ResolveRiskAlert({ riskAlertId, resolverUserId, resolution }) {
    const alert = this.riskAlerts.get(riskAlertId);
    if (!alert) throw new Error('Risk alert not found');
    alert.status = 'Resolved';
    alert.resolvedBy = resolverUserId;
    alert.resolution = resolution;
    alert.resolvedAt = now();
    this.record('ResolveRiskAlert', alert);
    return alert;
  }

  GetTransactionHistory({ entityId } = {}) {
    if (!entityId) return this.history;
    return this.history.filter((tx) => JSON.stringify(tx.payload).includes(entityId));
  }

  IssueImpactCertificate(input) {
    const certificate = {
      id: id('CERT'),
      issuedAt: now(),
      status: 'Issued',
      ...input
    };
    this.certificates.set(certificate.id, certificate);
    this.record('IssueImpactCertificate', certificate);
    return certificate;
  }

  getDashboard() {
    return {
      projects: [...this.projects.values()],
      investments: [...this.investments.values()],
      paymentRequests: [...this.paymentRequests.values()],
      milestones: [...this.milestones.values()],
      impactReports: [...this.impactReports.values()],
      riskAlerts: [...this.riskAlerts.values()],
      certificates: [...this.certificates.values()],
      organizations: [...this.organizations.values()],
      userRoles: [...this.userRoles.values()],
      history: this.GetTransactionHistory()
    };
  }
}
