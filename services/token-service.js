import jwt from 'jsonwebtoken';


class TokentService {
    generateToken(data) {
        console.log(process.env.JWT_ACCESS_SECRET);
        const token = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '10m',
        })
        return token;
    }

    tokenVerify(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            console.log("TOKEN VERIFY PIZDANYLSA" + e);

            // throw ApiError.TokenKiller('token invalid, authorization repeat please');
        }
      }
}

export default new TokentService();