import prompt from "prompt";
import chalk from "chalk";

import promptSchemaQRCode from "../../prompts-schema/prompt-schema-qrcode.js";
import { generateQRCode } from "./generate-qrcode.js";

/**
 * Fluxo CLI do gerador de QR Code: coleta o link/tipo via prompt,
 * delega para a lógica pura e imprime o resultado.
 */
async function createQRCode() {
  prompt.start();

  prompt.get(promptSchemaQRCode, async (err, result) => {
    if (err) {
      console.log(chalk.red("\nOperação cancelada."));
      return;
    }

    try {
      // type: 1 = NORMAL (grande) | 2 = TERMINAL (compacto)
      const small = result.type === "2";
      const qrcode = await generateQRCode(result.link, { small });

      console.log(chalk.green("\nQR Code gerado com sucesso:\n"));
      console.log(qrcode);
    } catch (error) {
      console.log(chalk.red(`\n${error.message}`));
    }
  });
}

export default createQRCode;
