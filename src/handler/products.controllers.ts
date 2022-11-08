import { Request, Response, NextFunction} from "express";
import ProductModel from "../models/product.model";


const productModel = new ProductModel();

// create new product and return response to view
export const create =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const product =await productModel.create(req.body);
        res.json({...product})
    } catch (error) {
        next(error);
    }
}

// show all products
export const Index =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const products =await productModel.Index();
        res.json(products)
    } catch (error) {
        next(error);
    }
}

//show one products 
export const Show =async (req: Request, res: Response ,next: NextFunction) => {
    try {
        const product =await productModel.Show(req.params.id as unknown as string);
        res.json(product)
    } catch (error) {
        next(error);
    }


};


