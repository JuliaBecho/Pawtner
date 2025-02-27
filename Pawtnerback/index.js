import {db, bucket} from "./firebase.js";
import express, {json} from "express"
import cors from "cors";
import multer from "multer";
import{v4 as uuidv4}from 'uuid';
import { verifyToken } from "./auth-middleware.js";

const app = express();
app.use(json()); 
app.use(cors()); 

const upload = multer({storage: multer.memoryStorage()});
//Defining a GET endpoint to fetch all animals from the Firebase Firestore database 
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
    console.log(req.body)

    let imageUrl = null; 
    if(req.file){
        const fileName = `uploads/${uuidv4()}_${req.file.originalname}`;
        const file = bucket.file(fileName);

        await file.save(req.file.buffer,{
            metadata: {contentType:req.file.mimetype},
        });

        await file.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
    }

    const {user_id} = req.user;
    db.collection('reports').add({...req.body, imageUrl, user_id})
        .then((docRef) => {
            console.log('Documento adicionado com ID:', docRef.id);
            res.send({ id: docRef.id });
        })
        .catch((error) => {
            console.error('Erro ao adicionar documento:', error);
            res.sendStatus(500);
        });
});



app.delete("/reports/:id", async (req, res)=>{
    try {
        const {id} = req.params;

        const docRef = db.collection("reports").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({error: "Document not found"});
        }

        await docRef.delete();

        res.json({message: "Animal deleted successfully", id});
    }catch (error) {
        console.error("Error deleting animal:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});



app.put("/animals/:id", async (req, res)=>{
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

