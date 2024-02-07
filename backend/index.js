import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import schemaRoute from './routes/schemaRoutes.js';
import itemRoute from './routes/itemRoutes.js';

import cors from 'cors'

const app = express();

app.use(express.json());    // parsing request body -> JSON

app.use(cors()) // cors * -> allow every request

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the APP");
});


//routes handling:
app.use('/schema', schemaRoute);
app.use('/items', itemRoute);


mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connected to database.')
    app.listen(PORT, ()=>{
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})