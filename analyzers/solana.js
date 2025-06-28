function analyze(content) {
  return [
    {
      severity: 'HIGH',
      message: 'Hypothetical vulnerability',
      location: 'line 1',
    },
  ];
}

module.exports = { analyze };