import Task from "../models/Task.js";

async function getTasks(req, res,next) {
    try{
        const tasks = await Task.find({userId: req.userId});
        res.status(200).json(tasks);
    }
    catch(error){
        next(error);
    }
}

async function postTasks(req,res,next){
    try{
        const title = req.body.title;

        if (typeof title !== "string") {
            return res.status(400).json({ error: "Title must be a string" });
        }

        const newTaskTitle = title.trim();
        const userId = req.userId;

        if (!newTaskTitle) {
            return res.status(400).json({ error: "Title cannot be empty" });
        }

        if (newTaskTitle.length > 100) {
            return res.status(400).json({ error: "Title must be 100 characters or less" });
        }

        const newTask = await Task.create({ title: newTaskTitle, userId: userId });
        res.status(201).json(newTask);
    }
    catch(error){
        next(error);
    }
}


async function patchTasks(req,res,next){
    try{
        const taskId = req.params.id;
        const status = req.body.completed;
        const userId = req.userId;
        
        if(status === undefined){
            return res.status(400).json({"error":"Completed status should exists"});
        }
        if(typeof status!=="boolean"){
            return res.status(400).json({"error":"Completed status should be boolean"});
        }

        const updatedTask = await Task.findOneAndUpdate(
            {_id:taskId, userId:userId},
            { completed: status},
            { returnDocument: "after" }
            );
        if(!updatedTask){
            return res.status(404).json({"error":"Task not found"});
        }

        res.status(200).json(updatedTask);
    }
    catch(error){
        next(error);
    }
}

async function deleteTasks(req,res,next){
    try{
        const taskId = req.params.id; 
        const userId = req.userId;
        const deletedTask = await Task.findOneAndDelete({_id:taskId,userId:userId});
        if(!deletedTask){
            return res.status(404).json({"error":"Task not found"});
        }
        res.status(200).json({"message":"Task Deleted"});
    }
    catch(error){
        next(error);
    }
}

export { getTasks,postTasks,patchTasks,deleteTasks};