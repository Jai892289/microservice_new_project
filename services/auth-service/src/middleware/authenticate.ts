import jwt from "jsonwebtoken";

export const authenticateToken = (req: any, res: any, next: any) => { 
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token is missing");
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        throw new Error("Invalid token");
    }
}
