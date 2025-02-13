import express from "express"
import db from "./firebase.js";

const app = express();
app.get("/",(req, res)=>{
    res.send("Hello world")
})

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
    res.send("Deleted!")
})

app.put("/",(req, res)=>{
    res.send("Put is working!")
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})

