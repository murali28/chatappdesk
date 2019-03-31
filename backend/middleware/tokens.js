const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: '2h' }) //expires in two hours
        const obj = {
            success: true,
            message: 'Generated token',
            token: token
        }
        return obj;
    }
}