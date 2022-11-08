import  config  from "../config";
import { Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

// validate user

const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader: string | undefined = req.headers.authorization;
      const token: string = authHeader ? authHeader.split(' ')[1] : '';
      const decode: string | object = jwt.verify(token, config.tokenSecret as unknown as string);
      decode ? next() : res.send('please try again');
    } catch (error) {
        res.send("log in failed \n"+ error);
    }
  };


export default authToken;