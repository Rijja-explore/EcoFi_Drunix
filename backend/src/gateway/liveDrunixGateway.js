export class LiveDrunixGateway {
  constructor(config) {
    this.config = config;
  }

  notImplemented(operation) {
    throw new Error(
      `[Drunix live gateway] ${operation} is not wired yet. Configure Drunix/Fabric Gateway credentials and implement submit/evaluate calls in backend/src/gateway/liveDrunixGateway.js.`
    );
  }

  CreateProject() { return this.notImplemented('CreateProject'); }
  GetProject() { return this.notImplemented('GetProject'); }
  CreateInvestment() { return this.notImplemented('CreateInvestment'); }
  CreatePaymentRequest() { return this.notImplemented('CreatePaymentRequest'); }
  SubmitMilestone() { return this.notImplemented('SubmitMilestone'); }
  SubmitImpactData() { return this.notImplemented('SubmitImpactData'); }
  VerifyMilestone() { return this.notImplemented('VerifyMilestone'); }
  EvaluatePaymentRisk() { return this.notImplemented('EvaluatePaymentRisk'); }
  ApprovePayment() { return this.notImplemented('ApprovePayment'); }
  RejectPayment() { return this.notImplemented('RejectPayment'); }
  ReleaseMilestonePayment() { return this.notImplemented('ReleaseMilestonePayment'); }
  FlagSuspiciousTransaction() { return this.notImplemented('FlagSuspiciousTransaction'); }
  ResolveRiskAlert() { return this.notImplemented('ResolveRiskAlert'); }
  GetTransactionHistory() { return this.notImplemented('GetTransactionHistory'); }
  IssueImpactCertificate() { return this.notImplemented('IssueImpactCertificate'); }
  getDashboard() { return this.notImplemented('getDashboard'); }
}
