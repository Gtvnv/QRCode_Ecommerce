import qr from "qrcode-terminal";

/**
 * Valida se uma string é uma URL http(s) utilizável.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidUrl(value) {
  if (typeof value !== "string" || value.trim() === "") return false;

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Gera a representação em texto de um QR Code a partir de um link.
 *
 * Função pura e reaproveitável: não imprime nada e não lê prompts,
 * apenas resolve com a string do QR Code (ASCII art).
 *
 * @param {string} link - URL http(s) a ser codificada.
 * @param {object} [options]
 * @param {boolean} [options.small=false] - Usa a versão compacta (ideal p/ terminal).
 * @returns {Promise<string>} QR Code renderizado como texto.
 * @throws {Error} Se o link for inválido.
 */
export function generateQRCode(link, { small = false } = {}) {
  if (!isValidUrl(link)) {
    throw new Error(`Link inválido: "${link}". Informe uma URL http(s) válida.`);
  }

  return new Promise((resolve) => {
    qr.generate(link.trim(), { small }, (qrcode) => resolve(qrcode));
  });
}

export default generateQRCode;
