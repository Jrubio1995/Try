const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    // Checking for a token
    if (!token) {
        return res.status(401).json({ msg: 'Token Is Required' })
    }
    // Token checking
    try {
        const verifyToken = jwt.verify(token, "secret");
        req.user = verifyToken.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid' });
    }
}