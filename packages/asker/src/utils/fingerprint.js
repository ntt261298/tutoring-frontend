import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { makeRandomString } from 'utils/string';

const Fingerprint = () => {
  let fingerprint;

  const createFingerprint = async () => {
    // Always create new fingerprint for testing purpose
    if (['dev', 'local'].includes(process.env.REACT_APP_ENV)) {
      return makeRandomString();
    }

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    // Get the visitor identifier when you need it.
    const fp = await fpPromise;
    const result = await fp.get();

    // This is the visitor identifier:
    const { visitorId } = result;
    return visitorId;
  };

  return {
    getFingerprint: async () => {
      if (!fingerprint) {
        fingerprint = await createFingerprint();
      }
      return fingerprint;
    },
  };
};

export default Fingerprint();
