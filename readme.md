<div align="center">
  <h1>🛠️ QR Code & Password Toolkit para E-commerce</h1>
  <p><strong>CLI em Node.js com um kit de utilidades para e-commerce: geração de QR Codes e de senhas criptograficamente seguras.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+" />
    <img src="https://img.shields.io/badge/JavaScript-ESM-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ESM" />
    <img src="https://img.shields.io/badge/License-MIT-E94D5F?style=for-the-badge" alt="MIT License" />
  </p>
</div>

---

## 💻 Sobre o projeto

Kit de utilidades de linha de comando pensado para o dia a dia de um **e-commerce**, construído para ser **escalável** e **reaproveitável** em outros projetos.

A arquitetura separa a **lógica de negócio pura** (funções sem efeitos colaterais, fáceis de testar e importar em qualquer outro projeto) da **camada de interface (CLI)**. Ou seja: você pode pegar `generateQRCode()` ou `generatePassword()` e plugar direto numa API, num worker ou num outro CLI sem arrastar nada de `console` ou `prompt` junto.

Este projeto foi desenvolvido como parte de um desafio da [DIO](https://www.dio.me/) e reformulado para portfólio.

## ✨ Funcionalidades

- **Gerador de QR Code** — gera QR Code a partir de uma URL, direto no terminal (ASCII art), nos formatos normal ou compacto. Valida se o link é uma URL `http(s)` válida.
- **Gerador de senhas** — gera senhas aleatórias usando `crypto.randomInt` (criptograficamente seguro, não `Math.random`). Conjuntos de caracteres e tamanho configuráveis via variáveis de ambiente.
- **Menu interativo** no terminal para escolher a ferramenta.

## 🧰 Stack

| Tecnologia | Papel |
|---|---|
| [Node.js 20+](https://nodejs.org/) | Runtime (usa `--env-file` e `node:crypto`) |
| [prompt](https://www.npmjs.com/package/prompt) | Entrada interativa no terminal |
| [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) | Renderização do QR Code em ASCII |
| [chalk](https://www.npmjs.com/package/chalk) | Estilização das mensagens no terminal |

## 🚀 Como executar

Pré-requisito: **Node.js 20 ou superior**.

```bash
# 1. Clone o repositório
git clone https://github.com/Gtvnv/QRCode_Ecommerce.git
cd QRCode_Ecommerce

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env   # no Windows (PowerShell): Copy-Item .env.example .env

# 4. Rode o CLI
npm start
```

## ⚙️ Configuração (.env)

As variáveis controlam o **gerador de senhas**:

| Variável | Descrição | Exemplo |
|---|---|---|
| `UPPERCASE_LETTERS` | Incluir letras maiúsculas (`true`/`false`) | `true` |
| `LOWERCASE_LETTERS` | Incluir letras minúsculas (`true`/`false`) | `true` |
| `NUMBERS` | Incluir números (`true`/`false`) | `true` |
| `SPECIAL_CHARACTERS` | Incluir caracteres especiais (`true`/`false`) | `true` |
| `PASSWORD_LENGTH` | Tamanho da senha (inteiro `>= 1`) | `12` |

> Se nenhum conjunto de caracteres estiver habilitado, o gerador avisa com um erro claro em vez de produzir uma senha inválida.

## 🕹️ Uso

Ao rodar `npm start`, escolha a ferramenta no menu:

```
🛠️  Kit de utilidades para e-commerce

prompt: Escolha a ferramenta (1 - QRCODE ou (2- PASSWORD:  1
prompt: Digite o link para gerar o QR CODE:  https://github.com/Gtvnv
prompt: Escolha entre o tipo de QRcode (1- NORMAL ou (2- TERMINAL:  2

QR Code gerado com sucesso:

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ ██▀▀▀▄▄ █ ▄▄▄▄▄ █
█ █   █ █  ▀█ ▀▄█▀█ █   █ █
...
```

## 📂 Estrutura do projeto

```
src/
├── index.js                          # Ponto de entrada: menu principal
├── prompts-schema/                   # Schemas de entrada do prompt (camada CLI)
│   ├── prompt-schema-main.js
│   └── prompt-schema-qrcode.js
└── services/
    ├── qr-code/
    │   ├── generate-qrcode.js        # 🧠 Lógica pura reaproveitável
    │   └── create.js                 # 🖥️ Fluxo CLI (prompt + console)
    └── password/
        ├── generate-password.js      # 🧠 Lógica pura reaproveitável
        └── create.js                 # 🖥️ Fluxo CLI (lê .env + console)
```

## ♻️ Reaproveitando a lógica em outros projetos

As funções de negócio são puras e independentes da CLI — é só importar:

```js
import { generateQRCode } from "./src/services/qr-code/generate-qrcode.js";
import { generatePassword } from "./src/services/password/generate-password.js";

// QR Code a partir de uma URL (retorna a arte ASCII como string)
const qr = await generateQRCode("https://minha-loja.com", { small: true });

// Senha segura com conjuntos de caracteres escolhidos
const senha = generatePassword({
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  special: true,
});
```

## 🗺️ Melhorias futuras

- [ ] Exportar o QR Code como imagem (PNG/SVG), além do terminal
- [ ] Adicionar testes automatizados (Vitest/Jest)
- [ ] Novas utilidades (gerador de slugs, cupons, SKUs)
- [ ] Modo não interativo (flags de linha de comando) para uso em scripts

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais detalhes.

---

<div align="center">
  Feito com 💜 por <a href="https://github.com/Gtvnv">Gtvnv</a>
</div>
