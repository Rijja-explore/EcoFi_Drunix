import path from 'node:path';

const mode = (process.env.DRUNIX_GATEWAY_MODE || 'mock').toLowerCase();

const liveConfig = {
  channelName: process.env.DRUNIX_CHANNEL_NAME || 'ecofi-channel',
  contractName: process.env.DRUNIX_CONTRACT_NAME || 'ecofi-contract',
  connectionProfile: process.env.DRUNIX_CONNECTION_PROFILE || '',
  identityMspId: process.env.DRUNIX_IDENTITY_MSPID || '',
  identityPath: process.env.DRUNIX_IDENTITY_PATH || '',
  tlsCertPath: process.env.DRUNIX_TLS_CERT_PATH || '',
  peerEndpoint: process.env.DRUNIX_PEER_ENDPOINT || ''
};

const requiredForLive = [
  liveConfig.connectionProfile,
  liveConfig.identityMspId,
  liveConfig.identityPath,
  liveConfig.tlsCertPath,
  liveConfig.peerEndpoint
];

const liveReady = requiredForLive.every(Boolean);

export const config = {
  port: Number(process.env.PORT || 4000),
  gatewayMode: mode,
  liveReady,
  liveConfig,
  baseDir: path.resolve(process.cwd())
};
