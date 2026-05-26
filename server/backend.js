import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js'
import taskRouter from './routes/tasksRoutes.js'
import userRouter from './routes/userRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Routes are mentioned in routes folder
app.use('/api/tasks',taskRouter)
app.use('/api/users',userRouter)

//Error middleware
app.use(errorMiddleware);

const PORT  = process.env.EXPRESS_PORT || 5001;

// DB connection is in config/db/js
await connectDB(); 
app.listen(PORT,()=>{
            console.log(`Express App is running in localhost:${PORT}`);
        });