import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Task from "./models/Task.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/tasks",async (req,res)=>{
    const tasks = await Task.find();
    res.status(200).json(tasks);
})

app.post("/api/tasks",async(req,res)=>{
    const newTaskTitle = req.body.title;
    if(!newTaskTitle){
        return res.status(400).json({"error":"Invalid Request Body"});
    }
    const newTask = await Task.create({ title: newTaskTitle });
    res.status(201).json(newTask);
})

app.patch("/api/tasks/:id",async(req,res)=>{
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { completed: true },
        { returnDocument: "after" }
        );

    if(!updatedTask){
        return res.status(404).json({"error":"Task not found"});
    }

    res.status(200).json(updatedTask);
})

app.delete("/api/tasks/:id",async(req,res)=>{
    const taskId = req.params.id; 
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if(!deletedTask){
        return res.status(404).json({"error":"Task not found"});
    }
    res.status(200).json({"message":"Task Deleted"});
})

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myapp").then(()=>{
        console.log("MongoDB running in localhost:27017");
        app.listen(5001,()=>{
            console.log("Express App is running in localhost:5001");
        });
})
