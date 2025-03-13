import {db, bucket} from "./firebase.js";
import express, {json} from "express"
import cors from "cors"; //To allow cross-origin requests 
import multer from "multer"; // For handling file uploads 
import{v4 as uuidv4}from 'uuid'; // Import UUID to generate unique file names 
import { verifyToken } from "./auth-middleware.js";

const app = express();//Initialize Express app 
app.use(json()); //Enable JSON parsing in request bodies 
app.use(cors()); // Enables CORS for cross-origin requests

//Configure Multer to store files in memory before uploading
const upload = multer({storage: multer.memoryStorage()});

//GET endpoint: Fetch all reports from Firestore 
app.get("/reports", async(req, res)=>{
    try{
        //Fetching all documents from the "reports" collection
        const snapshot = await db.collection("reports").get();

        //Mapping the documents to an array, including their ID
        const reports = snapshot.docs.map (doc =>({id:doc.id, ...doc.data()}));

        //Sending the list of reports as JSON response 
        res.json(reports);
    } catch(error){
        //Loggin and handling errors 
        console.error("Error fetching reports", error)
        res.status(500).json({error:"Internal Server Error"});
    }
});

//Defining a POST endpoint to add a new animal to the database 
app.post("/reports", verifyToken, upload.single("image"), async (req, res) => {
    console.log(req.body) // Log request body for debbuging

    let imageUrl = null; // Initialize image URL as null 
    if(req.file){ //If an image is uploaded 
        const fileName = `uploads/${uuidv4()}_${req.file.originalname}`;//Generate unique file name 
        const file = bucket.file(fileName); //Create reference to storage 

        await file.save(req.file.buffer,{ //Save file to Firebase Storage 
            metadata: {contentType:req.file.mimetype},
        });

        await file.makePublic();//Make file publicly accessible 
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`//Generate public URL
    }

    const {user_id} = req.user; //Extract user ID from authentication 
    db.collection('reports').add({...req.body, imageUrl, user_id})//Add report to Firestore 
        .then((docRef) => {
            console.log('Documento adicionado com ID:', docRef.id);//Log document ID
            res.send({ id: docRef.id });//Respond with document ID 
        })
        .catch((error) => {
            console.error('Erro ao adicionar documento:', error);//Log error
            res.sendStatus(500);//return internal server error
        });
});


//DELETE endpoint: Remove a report by ID
app.delete("/reports/:id", async (req, res)=>{
    try {
        const {id} = req.params; //Get report ID request parameters 

        const docRef = db.collection("reports").doc(id);//Reference the document 
        const doc = await docRef.get();//Fetch document data

        if (!doc.exists) { //Check if the document exists
            return res.status(404).json({error: "Document not found"});
        }

        await docRef.delete();//Delete the document 

        res.json({message: "Animal deleted successfully", id});//Confirm deletion 
    }catch (error) {
        console.error("Error deleting animal:", error);//Log error
        res.status(500).json({error: "Internal Server Error"});//Return error response 
    }
});



app.put("/reports/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const updatedData = req.body;

        if(!updatedData || Object.keys(updatedData).length === 0){
            return res.status(400).json({error: "No data provided for update"});
        }

        const docRef = db.collection("animals").doc(id);
        const doc = await docRef.get();

        if(!doc.exists){
            return res.status(404).json({error:"Document not found"});
        }

        await docRef.update(updatedData);

        res.json({message: "Animal updated successfully!", id});
    }catch(error){
        console.error("Error updating animal:", error);
        res.status(500).json({error:"Internal Server Error"});
    }
});



app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});

