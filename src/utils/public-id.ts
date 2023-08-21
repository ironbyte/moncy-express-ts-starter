import { customAlphabet } from 'nanoid';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const length = 14;

const nanoid = customAlphabet(alphabet, length);

export function generatePublicId() {
  return nanoid();
}

// https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api
