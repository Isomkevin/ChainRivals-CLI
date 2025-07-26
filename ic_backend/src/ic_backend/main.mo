import Text "mo:base/Text";
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
        
        let report = Text.concat("=== ChainRivals Security Analysis Report ===\n", 
            Text.concat("Timestamp: ", Nat.toText(timestamp)));
        let report = Text.concat(report, "\nSeverity: ");
        let report = Text.concat(report, severity);
        let report = Text.concat(report, "\nVulnerabilities Found: ");
        let report = Text.concat(report, Nat.toText(vulnCount));
        let report = Text.concat(report, "\n\n");
        
        if (vulnCount > 0) {
            for (vuln in vulnerabilities.vals()) {
                let report = Text.concat(report, " ");
                let report = Text.concat(report, vuln);
                let report = Text.concat(report, "\n");
            };
        } else {
            let report = Text.concat(report, "No obvious vulnerabilities detected.\n");
        };
        
        let report = Text.concat(report, "\nRecommendations:\n");
        let report = Text.concat(report, "1. Implement proper access controls for public methods\n");
        let report = Text.concat(report, "2. Add bounds checking for loops\n");
        let report = Text.concat(report, "3. Implement post-upgrade hooks for state management\n");
        let report = Text.concat(report, "4. Use Internet Identity for authentication\n");
        
        return report;
    };
};
