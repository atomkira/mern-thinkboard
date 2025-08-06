import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRouter.js"; 
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

// Create an instance of express
const app = express();
const PORT=process.env.PORT || 5001;



// Middleware to parse JSON
app.use(cors({

  origin:"http://localhost:5173",
}
));
app.use(express.json());
app.use(rateLimiter)




app.use((req,res,next)=>
{
console.log(`Req method is ${req.method} & Req URL is ${req.url}`);  next();
});

// Define route
app.use("/api/notes", notesRoutes);
//first coennect to the database then start the server
connectDB().then(()=>{
// Start the server
app.listen(5001, () => {
  console.log("Server started on PORT:",PORT);
}); 

});