import { auth }  from "./firebase.js";

//Middleware function to verify Firebase authentication token 
const verifyToken = async (req, res, next) => {
    //Extract the token from the "Authorization" header
    const token = req.headers.authorization?.split(" ")[1];//Codigo nn quebra apenas retorna Undefined por causa do ?.

    //If there is no token, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({error: "Authentication Token"});
    }

    try{
        //Verify the token using Firebase authentication
        const decodedToken = await auth.verifyIdToken(token);

        //Attach the decoded token data to the request object for use in subsequent middlewar or routes
        req.user =decodedToken;

        //Move to the next middleware or route handler
        next();
    } catch(error){
        //If token verification fails, return a 403 Forbidden response
        return res.status(403).json({error: "Invalid Token"});
    }

}

//Export the verifyToken function for use in other parts of the application
export {verifyToken}
