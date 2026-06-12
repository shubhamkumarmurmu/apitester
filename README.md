# apitester

> A lightweight command-line tool for testing HTTP APIs.

![GitHub stars](https://img.shields.io/github/stars/shubhamkumarmurmu/apitester?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/shubhamkumarmurmu/apitester?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/shubhamkumarmurmu/apitester?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/shubhamkumarmurmu/apitester?style=for-the-badge&logo=github) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

##  Table of Contents

- [Description](#description)
- [Key Features](#key-features)
- [Use Cases](#use-cases)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [License](#license)

##  Description

apitester is a lightweight, terminal-based command-line interface (CLI) designed for executing and validating HTTP API requests. It addresses the need for a fast, minimal alternative to resource-heavy desktop application clients, enabling developers to run API tests directly from their local terminal environments.

##  Key Features

- ** Command-Line Execution** — Run and manage HTTP API test suites directly from your local terminal environment.
- ** Structured Test Collections** — Organize related HTTP request configurations and assertions inside dedicated collections directories.
- ** Node.js Powered** — Leverages the lightweight Node.js runtime for fast execution and easy integration into JS workflows.

##  Use Cases

- Verifying API responses and status codes locally during backend development.
- Grouping complex HTTP request sequences into logical collections for organized testing.
- Executing fast, automated API checks via local shell commands.

##  Tech Stack

-  **JavaScript**
-  **Node.js**

##  Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/shubhamkumarmurmu/apitester.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

##  Key Dependencies

```
arg: ^5.0.2
axios: ^1.17.0
chalk: ^5.6.2
```

##  Available Scripts

- **test** — `npm run test`

##  Project Structure

```
.
├── LICENSE
├── collections
│   └── shubh.json
├── package.json
└── src
    ├── commands
    │   ├── collection.js
    │   ├── delete.js
    │   ├── get.js
    │   ├── help.js
    │   ├── post.js
    │   ├── put.js
    │   ├── run.js
    │   └── save.js
    ├── logger.js
    ├── services
    │   └── http.js
    └── utils
        ├── args.js
        ├── formatter.js
        └── request-runner.js
```

##  Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

##  Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/shubhamkumarmurmu/apitester.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

##  License

This project is licensed under the **ISC** License.

