import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
    // State variables
    private stable var owner: Principal = Principal.fromText("2vxsx-fae");
    private stable var balances: [(Principal, Nat)] = [];
    
    // Public method without access control - HIGH severity
    public func transfer(to: Principal, amount: Nat) {
        // Missing access control check
        // This should be restricted to the caller
    };
    
    // Another public method - HIGH severity
    public func mint(amount: Nat) {
        // No access control
    };
    
    // Loop with dynamic termination - MEDIUM severity
    public func processItems(items: [Text]) {
        var i = 0;
        while (i < items.size()) {
            // Process item
            i += 1;
        };
    };
    
    // Missing post-upgrade hook - LOW severity
    public shared({caller}) func init() {
        owner := caller;
    };
    
    // Good practice - manual caller validation
    public shared({caller}) func secureMethod() {
        if (Principal.equal(caller, owner)) {
            // Only owner can call this
        };
    };
    
    // Pre-upgrade hook exists
    system func preupgrade() {
        // Save state
    };
};
