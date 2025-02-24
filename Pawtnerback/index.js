import db from "./firebase.js";
import express, {json} from "express"
import cors from "cors";

const app = express();
app.use(json()); 
app.use(cors()); 
//Defining a GET endpoint to fetch all animals from the Firebase Firestore database 
app.get("/", async(req, res)=>{
    try{
        //Fetching all documents from the "animals" collection
        const snapshot = await db.collection("animals").get();

        //Mapping the documents to an array, including their ID
        const animals = snapshots.docs.map (doc =>({id:doc.id, ...doc.data()}));

        //Sending the list of animals as JSON response 
        res.json(animals);
    } catch(error){
        //Loggin and handling errors 
        console.error("Error", error)
    }
});

//Defining a POST endpoint to add a new animal to the database 
app.post("/reports", (req, res) => {
    console.log(req.body)

    db.collection('reports').add(req.body)
        .then((docRef) => {
            console.log('Documento adicionado com ID:', docRef.id);
            res.send({ id: docRef.id });
        })
        .catch((error) => {
            console.error('Erro ao adicionar documento:', error);
            res.sendStatus(500);
        });
});



app.delete("/",(req, res)=>{
    res.send("delete is working!")
})



app.put("/",(req, res)=>{
    res.send("Put is working!")
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})

