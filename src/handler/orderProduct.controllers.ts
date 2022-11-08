import { Request, Response, NextFunction} from "express";
import OrderProductModel from "../models/orderProduct.model";


const OPModel = new OrderProductModel();

// add item to  order for one user and return all items for user
export const create =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orderProduct =await OPModel.create(req.body);
        res.json({ ...orderProduct})
    } catch (error) {
        next(error);
    }
}

// show all items 
export const Index =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orderProduct =await OPModel.Index(req.params.id as unknown as string);
        res.json(orderProduct)
    } catch (error) {
        next(error);
    }
}
