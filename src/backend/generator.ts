const LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NUMS = "0123456789".split("");
const SYMBOLS = "!@#$%^&*()_+".split("");

export interface PasswordOptions {
  length: number;
  letters: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function randomIndex(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);

  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limit);

  return buffer[0] % max;
}

export function generateRandomString(options: PasswordOptions): string {
  const { length, letters, uppercase, numbers, symbols } = options;

  const pool: string[] = [
    ...(letters ? LOWERCASE : []),
    ...(letters && uppercase ? UPPERCASE : []),
    ...(numbers ? NUMS : []),
    ...(symbols ? SYMBOLS : []),
  ];

  if (pool.length === 0) {
    throw new Error("Select at least one character type.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += pool[randomIndex(pool.length)];
  }

  return password;
}