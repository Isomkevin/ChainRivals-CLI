const { runScan } = require("./cli/scan.js");

// Test the scan functionality
async function testScan() {
  console.log(" Testing Enhanced Scan Functionality...\n");
  
  // Test 1: Basic static analysis
  console.log("1. Testing basic static analysis...");
  try {
    await runScan({
      target: "examples/test-contract.mo",
      chain: "icp",
      output: "cli",
      explain: false,
      export: null,
      useCanister: false
    });
  } catch (error) {
    console.log("   Error:", error.message);
  }
  
  console.log("\n2. Testing ICP canister analysis...");
  try {
    await runScan({
      target: "examples/test-contract.mo",
      chain: "icp",
      output: "cli",
      explain: false,
      export: null,
      useCanister: true
    });
  } catch (error) {
    console.log("   Expected error (dfx not installed):", error.message);
  }
  
  console.log("\n Scan functionality test completed!");
  console.log("\nTo use the enhanced scan:");
  console.log("1. Install dfx: https://internetcomputer.org/docs/current/developer-docs/setup/install/");
  console.log("2. Run: node cli/index.js ic:init");
  console.log("3. Run: node cli/index.js ic:deploy");
  console.log("4. Run: node cli/index.js scan --target examples/test-contract.mo --chain icp --use-canister");
}

testScan();
