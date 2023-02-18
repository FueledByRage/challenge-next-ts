import jwt from 'jsonwebtoken';

export const tokenHasExpired = ( jwtToken : string) =>{
    const decoded = jwt.decode(jwtToken) as jwt.JwtPayload;
    if(!decoded.exp) return true;
    const expirationDate = new Date(decoded.exp * 1000); // Convert expiration time (in seconds) to a date object
    const now = new Date();
    return now.getTime() > expirationDate.getTime();
}