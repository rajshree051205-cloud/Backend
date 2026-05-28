

import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed", err);
});

/*import dns from 'node:dns';
dns.setServers(['8.8.8.8','8.8.4.4']);


import connectDB from "./db/index.js"

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(` Server is running at port : $
           ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed");
})*/














/*
import express from "express"
const app =express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}
            /${DB_NAME}`)
            app.on("error",(error) => {
                console.log("ERROR:",error);
                throw error
            })
        app.listen(process.env.PORT,() =>{
            console.log(`App is listening on port$
                {process.env.PORT}`);
        })
        
     } catch ( error) {
            console.error("ERROR: ",error)
            throw err
        }
    }
)()

*/