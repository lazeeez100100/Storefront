import  config  from "../config";
import { Request, Response, NextFunction} from "express";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

// create user
export const create =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const user =await userModel.create(req.body);
        res.json(user);
        } catch (error) {
        next(error);
    }
}

//show all users
export const Index =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const users =await userModel.Index();
        res.json(users);

    } catch (error) {
        next(error);
    }
}

//show one user
export const Show =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const user =await userModel.Show(req.params.id as unknown as string);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// update one user by id
export const updateOne =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const user =await userModel.updateOne(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

//delete one user from table
export const deleteOne =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const user =await userModel.deleteOne(req.params.id as unknown as string);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

//authenticate user
export const auth =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const {email, password} =req.body;
        const userInfo =await userModel.auth(email, password);
        const token = jwt.sign({userInfo}, config.tokenSecret as unknown as string);
        if(!userInfo){
            return res.status(401).json({
                data:'invalid user info',
                message: 'please check your user info and try again'
            });
        }
       return res.json({ 
            data: {...userInfo, token},
            message: 'user auth and log in is available for him'
        })
    } catch (error) {
        return next(error);
    }
};


