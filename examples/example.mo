/import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

// ICP Motoko Example
actor class ICPChallenge() = this {
  
  // Types
  type User = {
    id: Principal;
    name: Text;
    balance: Nat;
    joinedAt: Int;
  };
  
  type Transaction = {
    from: Principal;
    to: Principal;
    amount: Nat;
    timestamp: Int;
  };
  
  // State variables
  private stable var totalUsers: Nat = 0;
  private var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  private var transactions: [Transaction] = [];
  private var adminPrincipal: ?Principal = null;
  
  // Vulnerability 1: No access control on admin setting
  public func setAdmin(principal: Principal): async Bool {
    adminPrincipal := ?principal;
    true
  };
  
  // Register a new user
  public func registerUser(name: Text): async Result.Result<Text, Text> {
    let caller = Principal.fromActor(this); // Non-optimization: should use msg.caller
    
    // Vulnerability 2: No input validation on name length
    switch (users.get(caller)) {
      case (?existingUser) {
        #err("User already registered")
      };
      case null {
        let newUser: User = {
          id = caller;
          name = name;
          balance = 100; // Starting balance
          joinedAt = Time.now();
        };
        users.put(caller, newUser);
        totalUsers += 1;
        #ok("User registered successfully")
      };
    }
  };
  
  // Get user info
  public query func getUser(principal: Principal): async ?User {
    users.get(principal)
  };
  
  // Transfer tokens between users
  public func transfer(to: Principal, amount: Nat): async Result.Result<Text, Text> {
    let caller = Principal.fromActor(this); // Same non-optimization
    
    switch (users.get(caller)) {
      case null { #err("Sender not registered") };
      case (?sender) {
        switch (users.get(to)) {
          case null { #err("Recipient not registered") };
          case (?recipient) {
            // Vulnerability 3: No check for transfer to self
            if (sender.balance < amount) {
              #err("Insufficient balance")
            } else {
              // Update sender balance
              let updatedSender: User = {
                id = sender.id;
                name = sender.name;
                balance = sender.balance - amount;
                joinedAt = sender.joinedAt;
              };
              
              // Update recipient balance
              let updatedRecipient: User = {
                id = recipient.id;
                name = recipient.name;
                balance = recipient.balance + amount;
                joinedAt = recipient.joinedAt;
              };
              
              users.put(caller, updatedSender);
              users.put(to, updatedRecipient);
              
              // Non-optimization: Using inefficient array concatenation
              let newTransaction: Transaction = {
                from = caller;
                to = to;
                amount = amount;
                timestamp = Time.now();
              };
              transactions := Array.append(transactions, [newTransaction]);
              
              #ok("Transfer completed successfully")
            }
          };
        }
      };
    }
  };
  
  // Get all transactions (inefficient for large datasets)
  public query func getAllTransactions(): async [Transaction] {
    transactions // Non-optimization: returning all transactions without pagination
  };
  
  // Mint tokens - only admin function
  public func mintTokens(to: Principal, amount: Nat): async Result.Result<Text, Text> {
    let caller = Principal.fromActor(this);
    
    // Vulnerability 4: Weak admin check
    switch (adminPrincipal) {
      case null { #err("No admin set") };
      case (?admin) {
        if (Principal.equal(caller, admin)) {
          switch (users.get(to)) {
            case null { #err("User not found") };
            case (?user) {
              let updatedUser: User = {
                id = user.id;
                name = user.name;
                balance = user.balance + amount; // Vulnerability 5: No overflow check
                joinedAt = user.joinedAt;
              };
              users.put(to, updatedUser);
              #ok("Tokens minted successfully")
            };
          }
        } else {
          #err("Only admin can mint tokens")
        }
      };
    }
  };
  
  // Get total number of users
  public query func getTotalUsers(): async Nat {
    totalUsers
  };
  
  // Get user count by iterating (non-optimized)
  public query func getUserCountSlow(): async Nat {
    var count = 0;
    for (user in users.vals()) {
      count += 1; // Non-optimization: could just return totalUsers
    };
    count
  };
  
  // Vulnerability 6: Public function that could be expensive
  public func resetAllBalances(): async Text {
    for ((principal, user) in users.entries()) {
      let resetUser: User = {
        id = user.id;
        name = user.name;
        balance = 0;
        joinedAt = user.joinedAt;
      };
      users.put(principal, resetUser);
    };
    "All balances reset to 0"
  };
  
  // Get leaderboard (inefficient sorting)
  public query func getLeaderboard(): async [(Principal, Nat)] {
    let userArray = Iter.toArray(users.entries());
    // Non-optimization: Simple bubble sort instead of efficient sorting
    let sorted = Array.sort(userArray, func(a: (Principal, User), b: (Principal, User)): {#less; #equal; #greater} {
      if (a.1.balance > b.1.balance) { #less }
      else if (a.1.balance < b.1.balance) { #greater }
      else { #equal }
    });
    
    Array.map(sorted, func(entry: (Principal, User)): (Principal, Nat) {
      (entry.0, entry.1.balance)
    })
  };
};