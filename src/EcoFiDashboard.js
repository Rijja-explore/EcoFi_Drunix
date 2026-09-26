import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Database, Leaf, ShieldAlert, TrendingUp } from 'lucide-react';
import { drunixApi } from './contractUtils';

const MetricCard = ({ title, value, icon: Icon }) => (
  <div className="glass-card rounded-xl p-4 text-left">
    <div className="flex items-center justify-between text-sm text-gray-300">
      <span>{title}</span>
      <Icon className="w-4 h-4" />
    </div>
    <div className="text-2xl mt-2 font-semibold">{value}</div>
  </div>
);

const EcoFiDashboard = () => {
  const [health, setHealth] = useState({ mode: 'unknown', warning: '' });
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [investmentForm, setInvestmentForm] = useState({ amount: 10000, investorOrganizationId: 'ORG-INVESTOR-001' });
  const [paymentForm, setPaymentForm] = useState({ amount: 25000, milestoneName: 'Phase-1 EPC Completion', requestedBy: 'USER-OP-001' });
  const [impactForm, setImpactForm] = useState({ energyGeneratedKwh: 5000, co2ReducedKg: 1800, submittedBy: 'USER-OP-001' });

  const activeProject = useMemo(() => dashboard?.projects?.[0], [dashboard]);

  const refresh = async () => {
    setLoading(true);
    try {
      const [healthPayload, dashboardPayload] = await Promise.all([drunixApi.health(), drunixApi.dashboard()]);
      setHealth({ mode: healthPayload.mode, warning: healthPayload.warning });
      setDashboard(dashboardPayload.data);
      setMessage('Drunix gateway data refreshed.');
    } catch (error) {
      setMessage(`Gateway unavailable: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const createInvestment = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      await drunixApi.createInvestment({ ...investmentForm, projectId: activeProject.id, currency: 'INR' });
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const createPaymentRequest = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      await drunixApi.createPaymentRequest({ ...paymentForm, projectId: activeProject.id });
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const submitImpact = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      await drunixApi.submitImpactData({ ...impactForm, projectId: activeProject.id });
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const evaluateApproveReleaseLatestPayment = async () => {
    const latestPayment = dashboard?.paymentRequests?.[0];
    if (!latestPayment) return;
    setLoading(true);
    try {
      await drunixApi.evaluatePaymentRisk(latestPayment.id, { evaluatorUserId: 'USER-RISK-001' });
      await drunixApi.approvePayment(latestPayment.id, { approverUserId: 'USER-VERIFIER-001' });
      await drunixApi.releasePayment(latestPayment.id, { operatorUserId: 'USER-FINOPS-001' });
      await drunixApi.issueImpactCertificate({
        projectId: latestPayment.projectId,
        paymentRequestId: latestPayment.id,
        summary: 'Milestone verified and payment released through Drunix workflow.'
      });
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto text-white">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">EcoFi Drunix Dashboard</h1>
          <p className="text-gray-300 mt-2">Green-finance workflow through a Drunix gateway (mock by default).</p>
          <p className="text-sm mt-2 text-amber-300">{health.warning}</p>
        </div>
        <button onClick={refresh} disabled={loading} className="px-4 py-2 rounded-lg bg-custom-purple hover:bg-bright-purple disabled:opacity-50">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Gateway mode" value={health.mode} icon={Database} />
        <MetricCard title="Projects" value={dashboard?.projects?.length || 0} icon={Leaf} />
        <MetricCard title="Investments" value={dashboard?.investments?.length || 0} icon={TrendingUp} />
        <MetricCard title="Risk alerts" value={dashboard?.riskAlerts?.length || 0} icon={ShieldAlert} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold mb-3">Record Investment</h2>
          <input className="w-full mb-2 p-2 rounded bg-slate-800" type="number" value={investmentForm.amount} onChange={(e) => setInvestmentForm((p) => ({ ...p, amount: Number(e.target.value) }))} />
          <button onClick={createInvestment} className="w-full p-2 rounded bg-emerald-600 hover:bg-emerald-500" disabled={loading || !activeProject}>CreateInvestment</button>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold mb-3">Create Payment Request</h2>
          <input className="w-full mb-2 p-2 rounded bg-slate-800" type="text" value={paymentForm.milestoneName} onChange={(e) => setPaymentForm((p) => ({ ...p, milestoneName: e.target.value }))} />
          <input className="w-full mb-2 p-2 rounded bg-slate-800" type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm((p) => ({ ...p, amount: Number(e.target.value) }))} />
          <button onClick={createPaymentRequest} className="w-full p-2 rounded bg-blue-600 hover:bg-blue-500" disabled={loading || !activeProject}>CreatePaymentRequest</button>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold mb-3">Submit Impact Data</h2>
          <input className="w-full mb-2 p-2 rounded bg-slate-800" type="number" value={impactForm.energyGeneratedKwh} onChange={(e) => setImpactForm((p) => ({ ...p, energyGeneratedKwh: Number(e.target.value) }))} />
          <input className="w-full mb-2 p-2 rounded bg-slate-800" type="number" value={impactForm.co2ReducedKg} onChange={(e) => setImpactForm((p) => ({ ...p, co2ReducedKg: Number(e.target.value) }))} />
          <button onClick={submitImpact} className="w-full p-2 rounded bg-purple-600 hover:bg-purple-500" disabled={loading || !activeProject}>SubmitImpactData</button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 mb-6">
        <h2 className="font-semibold mb-3">Milestone Payment Orchestration</h2>
        <button onClick={evaluateApproveReleaseLatestPayment} className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500" disabled={loading || !dashboard?.paymentRequests?.length}>
          EvaluatePaymentRisk → ApprovePayment → ReleaseMilestonePayment → IssueImpactCertificate
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold mb-3">Recent Payment Requests</h2>
          {(dashboard?.paymentRequests || []).slice(0, 5).map((item) => (
            <div key={item.id} className="border-b border-slate-700 py-2 text-sm">
              <div>{item.milestoneName} • ₹{item.amount}</div>
              <div className="text-gray-400">{item.status} / {item.riskStatus}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold mb-3">Transaction History</h2>
          {(dashboard?.history || []).slice(0, 6).map((item) => (
            <div key={item.id} className="border-b border-slate-700 py-2 text-sm">
              <div className="font-medium">{item.txType}</div>
              <div className="text-gray-400">{new Date(item.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-200">
          {message.startsWith('Gateway unavailable') ? <AlertTriangle className="w-4 h-4 text-red-300" /> : <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default EcoFiDashboard;
