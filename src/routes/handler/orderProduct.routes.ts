import {Router} from "express";
import * as controllers from '../../handler/orderProduct.controllers';
import auth from '../../mWare/auth.mWare';

// order routes
const routes = Router();
routes.route('/').post(auth, controllers.create);
routes.route('/:id').get(auth, controllers.Index);

export default routes;