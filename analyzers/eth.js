const { execSync } = require('child_process');

function analyze(content) {
  const tempFile = `/tmp/${Date.now()}.sol`;
  fs.writeFileSync(tempFile, content);

  const output = execSync(`slither ${tempFile}`).toString();
  const results = parseSlitherOutput(output);

  // Cleanup
  fs.unlinkSync(tempFile);

  return results;
}

function parseSlitherOutput(output) {
  const results = [];
  const lines = output.split('\n');
  lines.forEach(line => {
    if (line.includes('High') || line.includes('Medium') || line.includes('Low')) {
      const [severity, message, location] = line.split(/[: ]+/);
      results.push({ severity, message, location });
    }
  });
  return results;
}

module.exports = { analyze };