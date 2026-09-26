# 🌱 EcoFi Drunix

## Transparent Green-Finance Payment and Impact Tracking Platform

EcoFi Drunix is a permissioned green-finance platform designed to make renewable-energy funding more transparent, milestone-driven, and auditable.

The platform connects project issuers, investors, renewable-energy operators, independent verifiers, financial institutions, and compliance teams through a shared workflow for project financing, milestone payments, environmental-impact verification, and transaction monitoring.

> **Project status:** The current repository contains the EcoFi frontend and Solidity-based local prototype. The Drunix integration, permissioned network, backend gateway, AI risk engine, and expanded business workflows described below are the planned implementation direction for the project.

---

## 🎯 Problem

Renewable-energy projects often face challenges obtaining transparent, milestone-based funding. Investors and financial institutions may not have real-time visibility into:

- How project funds are being used
- Whether project milestones have been completed
- Whether reported environmental benefits are accurate
- Which payment requests require additional review
- How project performance affects investment outcomes

Traditional funding processes can depend on manual approvals, disconnected payment systems, and delayed reporting. This can lead to limited transparency, delayed payments, duplicate requests, inefficient reconciliation, and weak auditability.

EcoFi Drunix addresses these challenges by combining application workflows, permissioned ledger records, milestone-based payment rules, environmental-impact reporting, and AI-assisted risk analysis.

---

## 💡 Proposed Solution

An issuer registers a renewable-energy project, defines its funding requirements, and creates payment milestones. Investors or financial institutions record investments, while project operators submit progress and environmental-impact data.

Funds are released only after the required project milestone and impact information have been reviewed and approved. Each project, investment, payment request, approval, milestone, risk decision, and impact report is recorded through Drunix to create a reliable transaction history.

The platform will also use AI-assisted monitoring to identify unusual activity, including:

- Duplicate payment requests
- Unusually large transactions
- Payments unrelated to project progress
- Repeated failed payment attempts
- Unusual activity from a participant or organization

AI will support risk analysis, while Drunix will remain the trusted platform for authorization, transaction processing, business rules, payment status, and audit records.

---

## ✨ Main Features

- Renewable-energy project registration
- Investor and organization onboarding
- Green-bond and project investment records
- Milestone-based payment processing
- Environmental-impact data submission
- Independent verifier approval workflow
- AI-assisted fraud and anomaly detection
- Transaction and payment audit history
- Investor portfolio tracking
- CO₂-reduction and renewable-energy dashboards
- Downloadable investment and impact certificates
- Role-based access for issuers, operators, investors, and verifiers

---

## 🔄 Demonstration Workflow

```text
Issuer Registers Project
        ↓
Investor Records Investment
        ↓
Operator Submits Project Milestone
        ↓
Environmental Data Is Submitted
        ↓
AI Checks Payment Risk
        ↓
Verifier Approves Milestone
        ↓
Drunix Records Payment Outcome
        ↓
Investor Views Funding and Environmental Impact
        ↓
Impact Certificate Is Generated
```

This workflow demonstrates meaningful use of Drunix through application interaction, transaction processing, business rules, multi-party approvals, payment orchestration, and verifiable environmental outcomes.

---

## 🏗️ Target Architecture

```text
React Web Dashboard
        |
        v
Node.js / Express API
        |
        +----------------------+
        |                      |
        v                      v
Drunix Gateway          AI Risk Engine
        |                      |
        v                      |
Drunix Network <-------------+
        |
        v
EcoFi Project, Payment, and Impact Ledger
```

### Frontend

The existing React application provides the foundation for:

- Project and investment dashboards
- Milestone and payment status views
- Environmental-impact visualizations
- Portfolio tracking
- Certificate generation
- Role-specific user experiences

### Backend and Gateway

The planned Node.js / Express backend will:

- Connect the application to Drunix
- Submit and query transactions
- Enforce user and organization roles
- Process payment workflows
- Call the AI risk-analysis service
- Apply business rules
- Provide APIs for the React frontend
- Generate certificates and reports

### Drunix Business Logic

The core project, payment, approval, and audit workflows will be implemented through Drunix smart-contract or chaincode logic.

---

## 📋 Proposed Transactions

The planned business transactions include:

```text
CreateProject
GetProject
CreateInvestment
CreatePaymentRequest
SubmitMilestone
SubmitImpactData
VerifyMilestone
EvaluatePaymentRisk
ApprovePayment
RejectPayment
ReleaseMilestonePayment
FlagSuspiciousTransaction
ResolveRiskAlert
GetTransactionHistory
IssueImpactCertificate
```

## 📚 Ledger Records

The platform will maintain records for:

- `Project`
- `Investment`
- `PaymentRequest`
- `Milestone`
- `ImpactReport`
- `RiskAlert`
- `Certificate`
- `Organization`
- `UserRole`

Drunix will provide the authoritative record of transaction status, approvals, payment outcomes, risk decisions, and audit history.

---

## 🧩 Current Prototype

The current prototype uses a React dashboard with Solidity smart contracts and a local Hardhat blockchain to demonstrate key green-finance concepts:

- Green-bond investment records
- Milestone-based escrow releases
- Oracle-style environmental data updates
- Renewable-energy and CO₂ metrics
- Portfolio tracking
- MetaMask wallet connectivity
- PDF impact certificates
- Role-oriented platform views

The prototype is being evolved toward the full EcoFi Drunix architecture with a permissioned Drunix network, backend gateway, AI-assisted risk monitoring, and multi-party approval workflows.

---

## 🛠️ Technology Stack

### Current Prototype

- **Frontend:** React 18
- **Blockchain Prototype:** Solidity 0.8.24 and Hardhat
- **Web3 Integration:** Ethers.js and MetaMask
- **Styling:** CSS and Tailwind-inspired UI components
- **Local Network:** Hardhat JSON-RPC network
- **Certificates:** PDF report generation

### Planned Platform Components

- **Core Platform:** Drunix permissioned ledger
- **Backend:** Node.js and Express
- **Business Logic:** Drunix smart contracts or chaincode
- **AI Layer:** Payment fraud and anomaly-detection service
- **Reporting:** PDF certificates and analytics dashboards
- **Source Control:** GitHub

---

## 🚀 Quick Start: Current Local Prototype

### Prerequisites

- Node.js 16 or higher
- Git
- MetaMask browser extension

### Installation

```bash
git clone https://github.com/Rijja-explore/EcoFi_Drunix.git
cd EcoFi_Drunix
npm install

# Install backend dependencies
cd src/Backend
npm install
cd ../..
```

### Start the Local Blockchain

```bash
cd src/Backend
npx hardhat node --port 8545
```

### Deploy the Contracts

In a second terminal:

```bash
cd src/Backend
npx hardhat run scripts/deployCombined.js --network localhost
```

### Start the React Dashboard

In a third terminal:

```bash
npm start
```

The application should be available at `http://localhost:3000`.

### Configure MetaMask

Add the local network with the following settings:

| Setting | Value |
|---|---|
| Network name | Hardhat Local |
| RPC URL | `http://127.0.0.1:8545` |
| Chain ID | `31337` |
| Currency symbol | ETH |

For local demonstration only, import one of the test accounts printed by Hardhat. Never use Hardhat private keys on a real network or with real funds.

---

## 📊 Environmental Impact Tracking

EcoFi connects financial activity with measurable environmental outcomes, including:

- Renewable energy generated in kWh
- CO₂ emissions reduced
- Trees-equivalent impact
- Water conserved
- Project milestones completed
- Environmental impact associated with each investment

The current prototype supports configurable environmental multipliers through environment variables:

```env
REACT_APP_CO2_PER_KWH=0.4
REACT_APP_TREES_PER_KWH=0.02
REACT_APP_WATER_PER_KWH=0.5
REACT_APP_SHOW_DEMO_DATA=false
```

These values are demonstration parameters and should be replaced with verified methodology and trusted data sources for production use.

---

## 🛡️ Risk and Payment Monitoring

The planned AI-assisted risk engine will evaluate payment activity before approval. Example signals include:

1. Duplicate payment requests
2. Amounts that exceed project or milestone expectations
3. Payment requests submitted without corresponding progress
4. Repeated failed transactions
5. Unusual behavior from a participant or organization

Risk results will not replace authorization or business rules. Instead, the AI service will produce a risk assessment, while Drunix records the final review, approval, rejection, hold, or resolution decision.

---

## 🗺️ Roadmap

### Milestone 1: Requirements and System Design

- Finalize user roles and business workflows
- Define project, investment, payment, and milestone data models
- Design Drunix transaction flows
- Define AI fraud-detection requirements
- Prepare the development environment

### Milestone 2: Drunix Integration

- Configure the Drunix development environment
- Set up participating organizations and identities
- Establish gateway connectivity
- Deploy initial EcoFi business logic
- Test transaction submission and ledger queries

### Milestone 3: Core Payment Workflows

- Implement project registration
- Implement investment records
- Implement payment requests
- Implement milestone-based payment rules
- Add payment approval and rejection
- Add transaction-history queries

### Milestone 4: Impact Verification and AI Monitoring

- Implement environmental-impact submissions
- Implement milestone verification
- Add duplicate-payment detection
- Add anomaly and risk scoring
- Add payment hold and review workflows
- Record risk decisions through Drunix

### Milestone 5: Frontend Integration

- Connect the React dashboard to the backend
- Add issuer, operator, investor, verifier, and compliance screens
- Add payment and milestone dashboards
- Add environmental-impact visualizations
- Add certificates and downloadable reports

### Milestone 6: Testing and Demonstration

- Test complete payment workflows
- Test authorized and unauthorized transactions
- Test suspicious transaction scenarios
- Validate Drunix audit history
- Deploy a controlled demonstration environment
- Prepare documentation and presentation

---

## 🧪 Testing

Run the current smart-contract tests with:

```bash
cd src/Backend
npx hardhat test
```

Suggested end-to-end demonstration scenarios:

1. Register a renewable-energy project
2. Record an investor contribution
3. Submit a project milestone
4. Submit renewable-energy and impact data
5. Evaluate the payment for risk
6. Approve or reject the milestone
7. Release the approved payment
8. Review the transaction history
9. Generate an impact certificate

---

## 🌍 Expected Impact

### Financial and Operational Impact

- Automate milestone-based payment workflows
- Reduce manual reconciliation
- Improve payment transparency
- Create a permanent audit trail
- Reduce delays in funding release
- Improve exception and approval management

### Investor Impact

- Transparent project-funding information
- Verifiable investment and payment records
- Real-time milestone visibility
- Environmental-impact tracking
- Downloadable certificates and reports

### Institutional Impact

- Permissioned participation
- Organization-based access control
- Improved transaction traceability
- Automated payment operations
- Better compliance monitoring
- Reusable infrastructure for API-based financial services

### Environmental Impact

- Connect capital allocation with measurable outcomes
- Track renewable-energy generation
- Track CO₂ reduction and resource conservation
- Associate environmental impact with project milestones and investments

---

## 📁 Project Structure

```text
EcoFi_Drunix/
├── public/                 # Static assets
├── src/
│   ├── Backend/            # Smart contracts and deployment scripts
│   │   ├── contracts/      # Solidity contracts
│   │   ├── scripts/        # Deployment scripts
│   │   ├── test/           # Contract tests
│   │   └── oracle/         # Oracle utilities
│   ├── artifacts/          # Compiled contract artifacts
│   ├── App.js              # Main React component
│   ├── EcoFiDashboard.js   # Primary dashboard
│   └── contractUtils.js    # Web3 utilities
├── .env                    # Local environment configuration
├── package.json            # Frontend dependencies and scripts
└── README.md               # Project documentation
```

---

## ⚠️ Disclaimer

This repository is an educational and demonstration prototype. It is not a production financial system, investment product, payment processor, or source of verified environmental claims. Local Hardhat accounts, test private keys, sample impact multipliers, and simulated data must not be used with real funds or presented as independently verified results.

---

## 📄 License

This project is being developed for educational, research, and innovation-challenge purposes. Add the final project license before production or public commercial use.

---

**EcoFi Drunix — making green finance more transparent, verifiable, and accountable. 🌱**
