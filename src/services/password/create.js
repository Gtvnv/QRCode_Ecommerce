import chalk from "chalk";

import { generatePassword } from "./generate-password.js";

/**
 * Lê a configuração de geração de senha das variáveis de ambiente.
 * @returns {object} opções para generatePassword.
 */
function readPasswordConfigFromEnv() {
  return {
    length: Number(process.env.PASSWORD_LENGTH ?? 12),
    uppercase: process.env.UPPERCASE_LETTERS === "true",
    lowercase: process.env.LOWERCASE_LETTERS === "true",
    numbers: process.env.NUMBERS === "true",
    special: process.env.SPECIAL_CHARACTERS === "true",
  };
}

/**
 * Fluxo CLI do gerador de senha: monta as opções a partir do .env,
 * delega para a lógica pura e imprime o resultado.
 */
async function createPassword() {
  try {
    const config = readPasswordConfigFromEnv();
    const password = generatePassword(config);

    console.log(chalk.green("\nSenha gerada com sucesso:\n"));
    console.log(chalk.bold(password));
  } catch (error) {
    console.log(chalk.red(`\n${error.message}`));
  }
}

export default createPassword;
