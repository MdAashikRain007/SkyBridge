import httpStatus from "http-status";
import {User} from '../models/userModel.js';
import {Meeting} from '../models/meetingModel.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto'




const login = async(req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(400).json({message:"Please Provide"});
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User credentials are not match "})
        }

           const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            let token=crypto.randomBytes(20).toString("hex");
            user.token=token;
            return res.status(httpStatus.OK).json({token:token})
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username or Password"});
        }
 
    }catch(err){
        return res.status(500).json({message:`Something went wrong ${err}`});

    }
}


const register = async(req,res)=>{
    const{name,username,password}=req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword
        })
        await newUser.save();

        res.status(httpStatus.CREATED).json({message:"User register"});
    }catch(err){
        res.json(`Something went wrong ${err}`);

    }
}

const getUserHistory=async(req,res)=>{
    const{token} = req.query;
    try{
        const user = await User.findOne({token:token});
        const meeting=await Meeting.find({user_id:user.username})

    }catch(err){
      res.json({message:`SomeThing Went Wrong ${err}`})

    }

}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}


export {login,register,addToHistory,getUserHistory};