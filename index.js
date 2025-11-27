 // --------------------------------------------
// Login Tracker with Closures + Arrow Functions
// --------------------------------------------

function createLoginTracker(correctPassword) {
    let attempts = 0;
    const maxAttempts = 3;

    // Arrow function to check if password matches
    const isCorrect = (input) => input === correctPassword;

    // Returned function (closure)
    return function (inputPassword) {

        // Allow immediate correct login even if attempts are high
        if (isCorrect(inputPassword)) {
            attempts = 0;  // reset after correct login
            return "Login successful!";
        }

        // If incorrect password
        attempts++;

        if (attempts >= maxAttempts) {
            return "Account locked. Too many failed attempts.";
        }

        return `Incorrect password. Attempts left: ${maxAttempts - attempts}`;
    };
}

// --------------------------------------------
// Example Tests
// --------------------------------------------
const login = createLoginTracker("secret");

// Fails, keeps count
console.log(login("wrong"));     // Incorrect password. Attempts left: 2
console.log(login("nope"));      // Incorrect password. Attempts left: 1

// Allows correct login even after failures
console.log(login("secret"));    // Login successful!

// Test lockout
console.log(login("x"));         // Incorrect password. Attempts left: 2
console.log(login("y"));         // Incorrect password. Attempts left: 1
console.log(login("z"));         // Account locked. Too many failed attempts.
console.log(login("secret"));    // Account locked. Too many failed attempts.




module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};