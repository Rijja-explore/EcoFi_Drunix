import { config } from '../config.js';
import { MockDrunixGateway } from './mockDrunixGateway.js';
import { LiveDrunixGateway } from './liveDrunixGateway.js';

export function createGateway() {
  if (config.gatewayMode === 'live') {
    if (!config.liveReady) {
      return {
        mode: 'mock',
        warning:
          'DRUNIX_GATEWAY_MODE=live requested, but required identity/network env variables are missing. Falling back to in-memory mock gateway.',
        gateway: new MockDrunixGateway()
      };
    }

    return {
      mode: 'live',
      warning: 'Live gateway selected. Ensure channel, contract, peer endpoint, and identity files are valid.',
      gateway: new LiveDrunixGateway(config.liveConfig)
    };
  }

  return {
    mode: 'mock',
    warning: 'Mock gateway active. No live Drunix network is connected.',
    gateway: new MockDrunixGateway()
  };
}
