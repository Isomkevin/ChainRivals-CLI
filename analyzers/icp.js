function analyze(content) {
  const results = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('public func')) {
      results.push({
        severity: 'HIGH',
        message: 'Public method without guard',
        location: `line ${index + 1}: ${line.trim()}`,
      });
    }

    if (line.includes('preupgrade') === false && line.includes('init')) {
      results.push({
        severity: 'MEDIUM',
        message: 'Missing post-upgrade hook',
        location: `line ${index + 1}: ${line.trim()}`,
      });
    }

    if (line.includes('while (')) {
      results.push({
        severity: 'LOW',
        message: 'Loop with dynamic termination',
        location: `line ${index + 1}: ${line.trim()}`,
      });
    }
  });

  return results;
}

module.exports = { analyze };