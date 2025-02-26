import { auth }  from "firebase-admin";

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
        return res.status(401).json({error: "Token de autenticacao"});
    }

    try{
        const decodedToken = await auth.verifyIdToken(token);
        req.user =decodedToken;
        next();
    } catch(error){
        return res.status(403).json({error: "Token invalido"});
    }

}

export {verifyToken}