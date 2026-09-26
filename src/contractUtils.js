const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || 'API request failed');
  }
  return payload;
}

export const drunixApi = {
  health: () => request('/api/health'),
  dashboard: () => request('/api/dashboard'),
  createProject: (body) => request('/api/projects', { method: 'POST', body: JSON.stringify(body) }),
  createInvestment: (body) => request('/api/investments', { method: 'POST', body: JSON.stringify(body) }),
  createPaymentRequest: (body) => request('/api/payments/requests', { method: 'POST', body: JSON.stringify(body) }),
  submitMilestone: (body) => request('/api/milestones', { method: 'POST', body: JSON.stringify(body) }),
  submitImpactData: (body) => request('/api/impact-reports', { method: 'POST', body: JSON.stringify(body) }),
  evaluatePaymentRisk: (paymentRequestId, body = {}) =>
    request(`/api/payments/${paymentRequestId}/evaluate-risk`, { method: 'POST', body: JSON.stringify(body) }),
  approvePayment: (paymentRequestId, body = {}) =>
    request(`/api/payments/${paymentRequestId}/approve`, { method: 'POST', body: JSON.stringify(body) }),
  releasePayment: (paymentRequestId, body = {}) =>
    request(`/api/payments/${paymentRequestId}/release`, { method: 'POST', body: JSON.stringify(body) }),
  issueImpactCertificate: (body) => request('/api/certificates', { method: 'POST', body: JSON.stringify(body) })
};

export { API_BASE_URL };
