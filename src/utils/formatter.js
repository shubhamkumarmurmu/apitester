const chalk = require('chalk').default;

function formatStatus(status, statusText) {
  const text = `${status} ${statusText || ''}`.trim();
  if (status >= 500) return chalk.red.bold(text);
  if (status >= 400) return chalk.yellow.bold(text);
  if (status >= 300) return chalk.cyan.bold(text);
  return chalk.green.bold(text);
}

function formatTime(ms) {
  if (ms < 200)  return chalk.green(`${ms} ms`);
  if (ms < 1000) return chalk.yellow(`${ms} ms`);
  return chalk.red(`${ms} ms`);
}

function formatBody(body) {
  if (typeof body === 'object' && body !== null) {
    return syntaxHighlight(JSON.stringify(body, null, 2));
  }
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return syntaxHighlight(JSON.stringify(parsed, null, 2));
    } catch {
      return body;
    }
  }
  return String(body);
}

function syntaxHighlight(json) {
  return json
    .replace(/"([^"]+)":/g, (_, k) => `${chalk.cyan('"' + k + '"')}:`)
    .replace(/: "([^"]*)"/g, (_, v) => `: ${chalk.green('"' + v + '"')}`)
    .replace(/: (-?\d+\.?\d*)/g, (_, v) => `: ${chalk.yellow(v)}`)
    .replace(/: (true|false)/g, (_, v) => `: ${chalk.magenta(v)}`)
    .replace(/: null/g, `: ${chalk.dim('null')}`);
}

function formatHeaders(headers) {
  if (!headers || typeof headers !== 'object') return '';
  return Object.entries(headers)
    .map(([k, v]) => `  ${chalk.dim(k)}: ${chalk.white(v)}`)
    .join('\n');
}

function parseHeaders(headerArray) {
  if (!Array.isArray(headerArray)) return {};
  return headerArray.reduce((acc, h) => {
    const idx = h.indexOf(':');
    if (idx === -1) {
      throw new Error(`Invalid header format: "${h}". Expected "Key: Value".`);
    }
    const key   = h.slice(0, idx).trim();
    const value = h.slice(idx + 1).trim();
    if (!key) throw new Error(`Header key is empty in: "${h}"`);
    acc[key] = value;
    return acc;
  }, {});
}


function formatResponse({ status, statusText, headers, data, timeTaken, verbose }) {
  const lines = [];

  lines.push('');
  lines.push(`${chalk.bold('Status:')} ${formatStatus(status, statusText)}`);
  lines.push(`${chalk.bold('Time:')}   ${formatTime(timeTaken)}`);

  if (verbose && headers) {
    lines.push('');
    lines.push(chalk.bold('Response Headers:'));
    lines.push(formatHeaders(headers));
  }

  lines.push('');
  lines.push(chalk.bold('Body:'));
  lines.push(formatBody(data));
  lines.push('');

  return lines.join('\n');
}

module.exports = {
  formatStatus,
  formatTime,
  formatBody,
  formatHeaders,
  parseHeaders,
  formatResponse,
  syntaxHighlight,
};
