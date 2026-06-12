# apitester

> A lightweight, terminal-first CLI for testing and validating HTTP APIs without leaving your shell.

![GitHub stars](https://img.shields.io/github/stars/shubhamkumarmurmu/apitester?style=for-the-badge\&logo=github)
![GitHub forks](https://img.shields.io/github/forks/shubhamkumarmurmu/apitester?style=for-the-badge\&logo=github)
![GitHub issues](https://img.shields.io/github/issues/shubhamkumarmurmu/apitester?style=for-the-badge\&logo=github)
![Last commit](https://img.shields.io/github/last-commit/shubhamkumarmurmu/apitester?style=for-the-badge\&logo=github)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

---

## Table of Contents

* [Overview](#overview)
* [Why apitester](#why-apitester)
* [Features](#features)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [CLI Commands](#cli-commands)
* [Collection Support](#collection-support)
* [Examples](#examples)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Development Setup](#development-setup)
* [Available Scripts](#available-scripts)
* [Future Roadmap](#future-roadmap)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

**apitester** is a lightweight command-line tool built with Node.js that enables developers to send HTTP requests, validate responses, and organize API tests directly from the terminal.

Instead of relying on large desktop API clients, apitester provides a fast and scriptable workflow that integrates naturally with local development environments and automation pipelines.

---

## Why apitester

Many API testing tools are powerful but often require a graphical interface and significant system resources.

apitester focuses on:

* Fast startup and execution
* Terminal-native workflows
* Lightweight dependency footprint
* Simple collection-based organization
* Easy integration with automation scripts

---

## Features

### HTTP Request Execution

Execute API requests directly from your terminal.

Supported methods:

* GET
* POST
* PUT
* DELETE

### Collection Management

Save and organize requests into reusable collections.

### Lightweight Architecture

Built using Node.js with minimal dependencies.

### Developer Friendly

* Human-readable output
* Colored terminal responses
* Easy command structure
* Extensible architecture

### Automation Ready

Can be integrated into:

* Local development workflows
* Shell scripts
* CI/CD pipelines
* Automated testing setups

---

## Installation

### Using NPX (Recommended)

```bash
npx github:shubhamkumarmurmu/apitester
```

Verify installation:

```bash
apitester --version
```

Display help:

```bash
apitester --help
```

---

### Clone and Run Locally

```bash
git clone https://github.com/shubhamkumarmurmu/apitester.git

cd apitester

npm install
```

---

## Quick Start

### GET Request

```bash
apitester get https://jsonplaceholder.typicode.com/posts/1
```

### POST Request

```bash
apitester post https://jsonplaceholder.typicode.com/posts \
--data '{"title":"Hello","body":"Testing"}'
```

### PUT Request

```bash
apitester put https://jsonplaceholder.typicode.com/posts/1 \
--data '{"title":"Updated"}'
```

### DELETE Request

```bash
apitester delete https://jsonplaceholder.typicode.com/posts/1
```

---

## CLI Commands

| Command      | Description                |
| ------------ | -------------------------- |
| `get`        | Send GET request           |
| `post`       | Send POST request          |
| `put`        | Send PUT request           |
| `delete`     | Send DELETE request        |
| `save`       | Save request to collection |
| `run`        | Execute collection         |
| `collection` | Manage collections         |
| `help`       | Display CLI help           |

Get command-specific help:

```bash
apitester get --help
apitester post --help
apitester run --help
```

---

## Collection Support

Collections allow grouping related requests together.

Example:

```json
{
  "name": "User API Tests",
  "requests": [
    {
      "method": "GET",
      "url": "https://api.example.com/users"
    },
    {
      "method": "POST",
      "url": "https://api.example.com/users"
    }
  ]
}
```

Run a collection:

```bash
apitester run collections/users.json
```

---

## Examples

### Fetch User Details

```bash
apitester get https://api.example.com/users/1
```

### Create User

```bash
apitester post https://api.example.com/users \
--data '{"name":"John"}'
```

### Update User

```bash
apitester put https://api.example.com/users/1 \
--data '{"name":"Updated User"}'
```

### Delete User

```bash
apitester delete https://api.example.com/users/1
```

---

## Tech Stack

### Core Technologies

* JavaScript (ES Modules)
* Node.js

### Key Dependencies

| Package | Purpose                       |
| ------- | ----------------------------- |
| axios   | HTTP client                   |
| arg     | Command-line argument parsing |
| chalk   | Colored terminal output       |

---

## Project Structure

```text
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

---

## Development Setup

### Prerequisites

* Node.js v18+
* npm v9+

### Install Dependencies

```bash
npm install
```

### Start Development

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```

---

## Available Scripts

| Script         | Description      |
| -------------- | ---------------- |
| `npm run dev`  | Development mode |
| `npm run test` | Run test suite   |

---

## Future Roadmap

Planned improvements:

* Request headers support
* Environment variables
* Authentication helpers
* Response assertions
* JSON schema validation
* Collection folders
* Export/import collections
* CI integration support
* Interactive mode

---

## Contributing

Contributions are welcome.

### Workflow

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit changes

```bash
git commit -m "feat: add new feature"
```

4. Push branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

Please ensure:

* Code follows existing conventions
* New functionality includes tests
* Documentation is updated when required

---

## License

Licensed under the ISC License.

See the `LICENSE` file for complete details.

---

### Author

**Shubham Kumar Murmu**

If you find this project useful, consider starring the repository to support development.
