import { verify } from 'jsonwebtoken';

const expressJwtMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = await verifyJWT(token);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                reject(`JWT verification failed: ${err.message}`);
            } else {
                resolve(decoded);
            }
        });
    });
};

export { expressJwtMiddleware };
export default verifyJWT;
