function createLoginTracker(userInfo) {
    const { password } = userInfo;

    let attempts = 0;
    const maxAttempts = 3;
    let locked = false;

    const attemptLogin = (inputPassword) => {

        if (locked) {
            return "Account locked due to too many failed login attempts";
        }

        // Correct password
        if (inputPassword === password) {
            return "Login successful";
        }

        // Wrong password
        attempts++;

        // Attempt 1–3 → show "Attempt X: Login failed"
        if (attempts <= maxAttempts) {
            return `Attempt ${attempts}: Login failed`;
        }

        // Attempt 4 → lock
        locked = true;
        return "Account locked due to too many failed login attempts";
    };

    return attemptLogin;
}



const userInfo = {
    username: "johnDoe",
    password: "abc123",
    maxAttempts: 3
};

const login = createLoginTracker(userInfo);

console.log(login("123"));      // Incorrect password. Attempts left: 2
console.log(login("pass"));     // Incorrect password. Attempts left: 1
console.log(login("nope"));     // Too many failed attempts. Account for johnDoe is now locked.
console.log(login("abc123"));   // Account for johnDoe is locked.
module.exports = {...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })}