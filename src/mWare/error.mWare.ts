import { Response, Request, NextFunction } from "express";
import Err from '../inFace/error.inFace'

const err = (err:Err,req: Request,res: Response,next: NextFunction)=> {
        const st = err.st || 5000;
        const msg = err.ms || "something wrong";
        res.status(st).json({st, msg});
    };
    export default err;