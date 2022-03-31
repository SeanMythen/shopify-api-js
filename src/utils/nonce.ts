import {crypto, asHex} from '../runtime/http/';

export default function nonce(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);

  return asHex(bytes).slice(0, 15);
}
