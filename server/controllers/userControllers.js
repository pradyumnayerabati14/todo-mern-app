
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signUpUser(req,res,next){
    try{
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        // check if any of the fields are not mentioned
        if(name===undefined || password===undefined || email===undefined){
            return res.status(400).json({"error":"Missing required fields"});
        }

        // check if user already exists;
        const userExists = await User.findOne({email:email});
        if(userExists){
            return res.status(400).json({"message":"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        // create a new user, if above checks fail
        const newUser = await User.create({
            name:name,
            password:hashedPassword,
            email:email
        })

        res.status(201).json({"message":"New user created","user":newUser});
    }
    catch(error){
        next(error);
    }
}

async function loginUser(req,res,next){
    try{
        const password = req.body.password;
        const email = req.body.email;

        if(email === undefined || password === undefined){
            return res.status(400).json({"error":"Missing required fields"});
        }
        const userExists = await User.findOne({"email":email})
        if(!userExists){
            return res.status(400).json({"error":"User doesnot exist. Please Sign-Up first"});
        }
        else{
            const comparePasswords = await bcrypt.compare(password, userExists.password);
            if(!comparePasswords){
                return res.status(400).json({"error":"Wrong Password"})
            }
            else{
                    const token = jwt.sign(
                            {userId:userExists._id},
                            process.env.JWT_SECRET,
                            {expiresIn: '1h'}
                        );
                return res.status(200).json({"message":"Successfully Logged in!",token:token});
            }
        }
    }
    catch(error){
        next(error);
    }
}

export {signUpUser,loginUser};