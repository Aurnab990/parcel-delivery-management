import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { envVar } from "./app/config/env";


dotenv.config();

let server: Server;

const DB_URL = envVar.db_url;
const PORT = envVar.port;

const startServer = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Server connected");

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error);
  }
};

process.on("uncaughtException", (err)=>{
    console.log("Uncaught Exception error: ", err);
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
});

process.on("unhandledRejection", (err)=>{
    console.log("Uncaught rejection error: ", err);
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
});

process.on("SIGTERM",()=>{
    console.log("SIGTERM rejection detected... Server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
});

( async ()=>{
    await startServer();
    await seedSuperAdmin();
})()
