# EcoFi Drunix Chaincode Scaffold

This folder contains a minimal JavaScript chaincode contract scaffold for Drunix/Fabric-style deployment.

## Core records
Project, Investment, PaymentRequest, Milestone, ImpactReport, RiskAlert, Certificate, Organization, UserRole.

## Implemented function signatures
CreateProject, GetProject, CreateInvestment, CreatePaymentRequest, SubmitMilestone, SubmitImpactData, VerifyMilestone, EvaluatePaymentRisk, ApprovePayment, RejectPayment, ReleaseMilestonePayment, FlagSuspiciousTransaction, ResolveRiskAlert, GetTransactionHistory, IssueImpactCertificate.

## TODO for live network
- Wire each method to world-state reads/writes (`ctx.stub.getState`, `putState`, history APIs).
- Configure channel/contract names to match backend env.
- Package/deploy through your Drunix/Fabric lifecycle process with valid MSP identities, TLS certificates, and peer endpoints.
