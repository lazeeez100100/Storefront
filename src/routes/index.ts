import {Router} from "express";
import usersRoutes from './handler/users.routes';
import productsRoutes from './handler/products.routes';
import ordersRoutes from './handler/orders.routes';
import orderProductRoutes from './handler/orderProduct.routes';
const routes = Router();
// index routes
routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/orderProduct', orderProductRoutes);

export default routes;