const { execa } = require("execa");
const fs = require("fs-extra");
const path = require("path");

class ICPManager {
  constructor() {
    this.icBackendPath = path.join(process.cwd(), "ic_backend");
    this.dfxJsonPath = path.join(this.icBackendPath, "dfx.json");
  }

  // Check if dfx.json exists
  async checkDfxSetup() {
    try {
      await fs.access(this.dfxJsonPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Initialize dfx setup
  async init() {
    console.log(" Initializing ICP backend setup...");
    
    try {
      // Check if dfx is installed
      await execa("dfx", ["--version"]);
    } catch (error) {
      console.error(" dfx is not installed. Please install dfx first:");
      console.error("   Visit: https://internetcomputer.org/docs/current/developer-docs/setup/install/");
      process.exit(1);
    }

    // Create ic_backend directory if it doesn"t exist
    await fs.ensureDir(this.icBackendPath);
    await fs.ensureDir(path.join(this.icBackendPath, "src", "ic_backend"));

    // Check if dfx.json already exists
    const dfxExists = await this.checkDfxSetup();
    if (dfxExists) {
      console.log(" dfx.json already exists");
      return;
    }

    // Create dfx.json
    const dfxConfig = {
      canisters: {
        ic_backend: {
          type: "motoko",
          main: "src/ic_backend/main.mo"
        }
      },
      defaults: {
        build: {
          packtool: "",
          args: ""
        },
        canister_http: {
          enabled: false
        },
        proguard: {
          enabled: false
        },
        rust: {
          args: ""
        }
      },
      dfx: "0.15.0",
      networks: {
        local: {
          bind: "127.0.0.1:8000",
          type: "ephemeral"
        }
      },
      version: 1
    };

    await fs.writeJson(this.dfxJsonPath, dfxConfig, { spaces: 2 });
    console.log(" Created dfx.json");

    // Create main.mo if it doesn"t exist
    const mainMoPath = path.join(this.icBackendPath, "src", "ic_backend", "main.mo");
    if (!await fs.pathExists(mainMoPath)) {
      const mainMoContent = `import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

actor {
    // Analyze code and return a security report
    public shared query func analyze_code(text: Text) : async Text {
        let timestamp = Time.now();
        let report = generateSecurityReport(text, timestamp);
        return report;
    };

    // Get canister info
    public shared query func get_info() : async Text {
        return "ChainRivals ICP Backend - Security Analysis Canister v1.0.0";
    };

    // Health check
    public shared query func health() : async Text {
        return "OK";
    };

    // Private function to generate security report
    private func generateSecurityReport(code: Text, timestamp: Int) : Text {
        let vulnerabilities = Buffer.Buffer<Text>(0);
        
        // Mock vulnerability analysis
        if (Text.contains(code, #text "public func")) {
            vulnerabilities.add("HIGH: Public method without access control");
        };
        
        if (Text.contains(code, #text "while")) {
            vulnerabilities.add("MEDIUM: Potential infinite loop detected");
        };
        
        if (Text.contains(code, #text "preupgrade") == false and Text.contains(code, #text "init")) {
            vulnerabilities.add("LOW: Missing post-upgrade hook");
        };
        
        if (Text.contains(code, #text "ic0.msg_caller")) {
            vulnerabilities.add("INFO: Manual caller validation detected");
        };

        let vulnCount = vulnerabilities.size();
        let severity = if (vulnCount > 2) { "HIGH" } else if (vulnCount > 0) { "MEDIUM" } else { "LOW" };
        
        let report = Text.concat("=== ChainRivals Security Analysis Report ===\\n", 
            Text.concat("Timestamp: ", Nat.toText(timestamp)));
        let report = Text.concat(report, "\\nSeverity: ");
        let report = Text.concat(report, severity);
        let report = Text.concat(report, "\\nVulnerabilities Found: ");
        let report = Text.concat(report, Nat.toText(vulnCount));
        let report = Text.concat(report, "\\n\\n");
        
        if (vulnCount > 0) {
            for (vuln in vulnerabilities.vals()) {
                let report = Text.concat(report, " ");
                let report = Text.concat(report, vuln);
                let report = Text.concat(report, "\\n");
            };
        } else {
            let report = Text.concat(report, "No obvious vulnerabilities detected.\\n");
        };
        
        let report = Text.concat(report, "\\nRecommendations:\\n");
        let report = Text.concat(report, "1. Implement proper access controls for public methods\\n");
        let report = Text.concat(report, "2. Add bounds checking for loops\\n");
        let report = Text.concat(report, "3. Implement post-upgrade hooks for state management\\n");
        let report = Text.concat(report, "4. Use Internet Identity for authentication\\n");
        
        return report;
    };
};`;

      await fs.writeFile(mainMoPath, mainMoContent);
      console.log(" Created main.mo");
    }

    console.log(" ICP backend setup complete!");
    console.log(" Backend location:", this.icBackendPath);
  }

  // Deploy the canister
  async deploy() {
    console.log(" Deploying ICP backend canister...");
    
    const dfxExists = await this.checkDfxSetup();
    if (!dfxExists) {
      console.error(" dfx.json not found. Run \"chainrivals ic init\" first.");
      process.exit(1);
    }

    try {
      // Start dfx if not running
      console.log(" Starting dfx replica...");
      await execa("dfx", ["start", "--background"], { 
        cwd: this.icBackendPath,
        stdio: "inherit"
      });

      // Wait a moment for replica to start
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Deploy the canister
      console.log(" Building and deploying canister...");
      const { stdout } = await execa("dfx", ["deploy"], { 
        cwd: this.icBackendPath,
        stdio: "inherit"
      });

      console.log(" Canister deployed successfully!");
      
      // Get canister ID
      const { stdout: canisterId } = await execa("dfx", ["canister", "id", "ic_backend"], { 
        cwd: this.icBackendPath 
      });
      
      console.log(" Canister ID:", canisterId.trim());
      
    } catch (error) {
      console.error(" Deployment failed:", error.message);
      process.exit(1);
    }
  }

  // Call a canister method
  async call(method, args = []) {
    console.log(` Calling canister method: ${method}`);
    
    const dfxExists = await this.checkDfxSetup();
    if (!dfxExists) {
      console.error(" dfx.json not found. Run \"chainrivals ic init\" first.");
      process.exit(1);
    }

    try {
      const command = ["canister", "call", "ic_backend", method, ...args];
      const { stdout } = await execa("dfx", command, { 
        cwd: this.icBackendPath 
      });
      
      console.log(" Response:");
      console.log(stdout);
      
    } catch (error) {
      console.error(" Method call failed:", error.message);
      process.exit(1);
    }
  }

  // Analyze code using the deployed canister
  async analyzeCode(code) {
    console.log(" Analyzing code with ICP canister...");
    
    try {
      const command = ["canister", "call", "ic_backend", "analyze_code", `"${code}"`];
      const { stdout } = await execa("dfx", command, { 
        cwd: this.icBackendPath 
      });
      
      return stdout;
      
    } catch (error) {
      console.error(" Analysis failed:", error.message);
      throw error;
    }
  }
}

module.exports = { ICPManager };
