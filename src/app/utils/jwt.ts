import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string | Number) =>{
    const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };
    const token = jwt.sign(payload, secret , options);
    return token;
}

export const verifiedToken = (token: string, secret: string) =>{
    const verifiedToken = jwt.verify(token, secret) as JwtPayload;
    return verifiedToken;
}
