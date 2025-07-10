import express from "express";
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import {config} from 'dotenv'
config()

const app = express();
//app.use(cors());
app.use(cors({
  origin: "https://funny-client.onrender.com"
}));
app.use(express.json());

app.use('/api/v1/user', userRoutes)
app.use('/ping', function(req,res){
    res.send("Pong")
})
app.all('/*any',(req,res)=>{
    res.status(400).send("OOPS! 404 Page not found")
})

export default app;