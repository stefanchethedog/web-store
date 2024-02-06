import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import itemsRoute from './routes/itemsRoutes.js';
import cors from 'cors'

const app = express();

app.use(express.json());    // parsing request body -> JSON

app.use(cors()) // cors * -> allow every request

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the APP");
});


//routes handling:
app.use('/items', itemsRoute);


mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connected to database.')
    app.listen(PORT, ()=>{
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})