import { randomInt } from "node:crypto";

export const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()-_",
};

/**
 * Monta o conjunto de caracteres permitidos a partir das opções.
 * @param {object} options
 * @returns {string} caracteres permitidos concatenados.
 */
export function buildCharset({
  uppercase = false,
  lowercase = false,
  numbers = false,
  special = false,
} = {}) {
  let charset = "";
  if (uppercase) charset += CHARSETS.uppercase;
  if (lowercase) charset += CHARSETS.lowercase;
  if (numbers) charset += CHARSETS.numbers;
  if (special) charset += CHARSETS.special;
  return charset;
}

/**
 * Gera uma senha aleatória criptograficamente segura.
 *
 * Função pura e reaproveitável: não lê variáveis de ambiente nem imprime nada.
 * Usa `crypto.randomInt` em vez de `Math.random` para aleatoriedade segura.
 *
 * @param {object} [options]
 * @param {number} [options.length=12] - Tamanho da senha (>= 1).
 * @param {boolean} [options.uppercase=false]
 * @param {boolean} [options.lowercase=false]
 * @param {boolean} [options.numbers=false]
 * @param {boolean} [options.special=false]
 * @returns {string} senha gerada.
 * @throws {Error} Se o tamanho for inválido ou nenhum conjunto for selecionado.
 */
export function generatePassword(options = {}) {
  const length = Number(options.length ?? 12);

  if (!Number.isInteger(length) || length < 1) {
    throw new Error(`Tamanho inválido: "${options.length}". Use um inteiro >= 1.`);
  }

  const charset = buildCharset(options);

  if (charset.length === 0) {
    throw new Error(
      "Nenhum conjunto de caracteres selecionado. Habilite ao menos uma opção (maiúsculas, minúsculas, números ou especiais)."
    );
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[randomInt(charset.length)];
  }

  return password;
}

export default generatePassword;
