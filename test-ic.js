#!/usr/bin/env node

const { ICPManager } = require("./cli/ic.js");

async function testICP() {
  console.log(" Testing ICP Integration...\n");
  
  const icpManager = new ICPManager();
  
  try {
    // Test 1: Check dfx setup
    console.log("1. Checking dfx setup...");
    const dfxExists = await icpManager.checkDfxSetup();
    console.log(`   dfx.json exists: ${dfxExists ? "" : ""}`);
    
    // Test 2: Initialize if needed
    if (!dfxExists) {
      console.log("\n2. Initializing dfx setup...");
      await icpManager.init();
    } else {
      console.log("\n2. dfx setup already exists, skipping init");
    }
    
    // Test 3: Try to call a method (this will fail if not deployed, but that"s expected)
    console.log("\n3. Testing canister call...");
    try {
      await icpManager.call("get_info");
    } catch (error) {
      console.log("   Expected error (canister not deployed):", error.message);
    }
    
    console.log("\n ICP integration test completed!");
    console.log("\nNext steps:");
    console.log("1. Install dfx: https://internetcomputer.org/docs/current/developer-docs/setup/install/");
    console.log("2. Run: chainrivals ic deploy");
    console.log("3. Run: chainrivals ic call analyze_code \"your code here\"");
    
  } catch (error) {
    console.error(" Test failed:", error.message);
  }
}

testICP();
