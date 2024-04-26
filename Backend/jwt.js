const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    
    console.log('JWT Middleware executed');

    //first check request header has authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    // Extract the JWT token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN, {expiresIn: 30000});
        res.user = decoded;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Generate token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_TOKEN);
};

module.exports = { jwtAuthMiddleware, generateToken };
