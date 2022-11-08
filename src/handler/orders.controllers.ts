import { Request, Response, NextFunction} from "express";
import OrderModel from "../models/order.model";


const orderModel = new OrderModel();

// create order for one user and return all orders for user
export const create =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orders =await orderModel.create(req.body);
        res.json({ ...orders})
    } catch (error) {
        next(error);
    }
}

// show all orders 
export const Index =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orders =await orderModel.Index(req.params.id as unknown as string);
        res.json(orders)
    } catch (error) {
        next(error);
    }
}

// show activated order only
export const Show =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orders =await orderModel.Show(req.params.id as unknown as string, req.params.status as unknown as number);
        res.json(orders)
    } catch (error) {
        next(error);
    }


};

// delete user orders from table 
export const deleteAll =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const orders =await orderModel.deleteAll(req.params.id as unknown as string);
        res.json(orders)
    } catch (error) {
        next(error);
    }
}
