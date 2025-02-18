import express from "express"
import db from "./firebase.js";

const app = express();
app.get("/", async(req, res)=>{
    try{
        const snapshot = await db.collection("animals").get();
        const animals = snapshot.docs.map (doc =>({ id:doc.id, ...doc.data() }));
        res.json(animals);
    } catch (error){
        console.error("Error", error);
    }
});

app.post("/", (req, res) => {
    const animal = {
        nickname: 'Ethan',
        description: 'An adorable cat',
        data: new Date()
    };

    db.collection('animals').add(animal)
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

