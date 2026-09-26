# EcoFi Drunix

EcoFi Drunix is a green-finance prototype focused on milestone-based project funding, payment risk checks, and impact tracking using a Drunix-first architecture.

## What is implemented now

- React dashboard for project/investment/payment workflow
- Node.js/Express backend gateway (`/backend`)
- Drunix gateway adapter boundary with two modes:
  - **mock** (default): in-memory ledger for safe local demo
  - **live**: scaffolded adapter with explicit TODOs for Drunix/Fabric Gateway wiring
- Domain workflow APIs for:
  - `CreateProject`, `GetProject`, `CreateInvestment`, `CreatePaymentRequest`
  - `SubmitMilestone`, `SubmitImpactData`, `VerifyMilestone`
  - `EvaluatePaymentRisk`, `ApprovePayment`, `RejectPayment`, `ReleaseMilestonePayment`
  - `FlagSuspiciousTransaction`, `ResolveRiskAlert`, `GetTransactionHistory`, `IssueImpactCertificate`
- Minimal Drunix chaincode scaffold in `drunix-chaincode/`

## Removed from this repository

The previous EVM prototype has been removed, including Solidity contracts, Hardhat scripts/tests/config, MetaMask wallet flow, ethers/Web3 contract calls, and Ethereum-specific environment usage.

## Project structure

- `src/` React frontend
- `backend/` Express API + Drunix gateway adapters + API tests
- `drunix-chaincode/` chaincode/application scaffold

## Local setup

### 1) Install dependencies

```bash
npm install
npm --prefix backend install
```

### 2) Configure environment

Frontend:

```bash
cp .env.example .env
```

Backend:

```bash
cp backend/.env.example backend/.env
```

### 3) Run backend + frontend

Backend:

```bash
npm run start:backend
```

Frontend:

```bash
npm start
```

## Backend gateway configuration

Default mode is `DRUNIX_GATEWAY_MODE=mock`, so the app runs without credentials or a live network.

For live integration, set:

- `DRUNIX_GATEWAY_MODE=live`
- `DRUNIX_CONNECTION_PROFILE`
- `DRUNIX_IDENTITY_MSPID`
- `DRUNIX_IDENTITY_PATH`
- `DRUNIX_TLS_CERT_PATH`
- `DRUNIX_PEER_ENDPOINT`
- `DRUNIX_CHANNEL_NAME`
- `DRUNIX_CONTRACT_NAME`

> Live mode in this repo is a scaffold only. You must implement submit/evaluate transaction calls in `backend/src/gateway/liveDrunixGateway.js` and provide valid identities/certificates/network endpoints.

## Tests

Backend workflow tests:

```bash
npm run test:backend
```

Combined test script:

```bash
npm test
```

## Current limitations

- No live Drunix network is connected by default.
- `live` adapter methods are intentionally TODO stubs until network artifacts and identities are supplied.
- Mock mode is for demonstration and local development only.
