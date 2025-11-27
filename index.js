// ---------------------------------------
// Secure Login System Using Closures
// ---------------------------------------

function createLogin(correctPassword, maxAttempts = 3) {
    let attempts = 0;
    let locked = false;

    // Arrow function to check password
    const passwordMatches = (input) => input === correctPassword;

    // Inner function returned — uses closure
    function attemptLogin(inputPassword) {
        if (locked) {
            return "Account locked. Too many failed attempts.";
        }

        if (passwordMatches(inputPassword)) {
            attempts = 0;  // reset on success
            return "Login successful!";
        }

        attempts++;

        if (attempts >= maxAttempts) {
            locked = true;
            return "Account locked due to too many failed attempts.";
        }

        return `Incorrect password. Attempts left: ${maxAttempts - attempts}`;
    }

    return attemptLogin;
}

// ---------------------------------------
// Example Usage
// ---------------------------------------

const login = createLogin("superSecret123", 3);

console.log(login("wrong"));        // Incorrect password. Attempts left: 2
console.log(login("nope"));         // Incorrect password. Attempts left: 1
console.log(login("badAgain"));     // Account locked due to too many failed attempts.
console.log(login("superSecret123")); // Account locked. Too many failed attempts.



module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};