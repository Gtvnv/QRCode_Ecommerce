import prompt from "prompt";
import chalk from "chalk";

import promptSchemaMain from "./prompts-schema/prompt-schema-main.js";

import createQRCode from "./services/qr-code/create.js";
import createPassword from "./services/password/create.js";

/**
 * Ponto de entrada do CLI: exibe o menu e encaminha para a ferramenta escolhida.
 */
async function main() {
  console.log(chalk.cyan.bold("\n🛠️  Kit de utilidades para e-commerce\n"));

  prompt.start();

  prompt.get(promptSchemaMain, async (err, choose) => {
    if (err) {
      console.log(chalk.red("\nOperação cancelada."));
      return;
    }

    if (choose.select === "1") return createQRCode();
    if (choose.select === "2") return createPassword();
  });
}

main();
