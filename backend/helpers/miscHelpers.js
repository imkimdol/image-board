const checkAuthorized = (req, username) => {
    try {
        const sessionUsername = req.user.username;
        return (sessionUsername === username) || (sessionUsername === "admin");
    } catch {
        return false;
    }
}

module.exports = {checkAuthorized};