import {Router} from "express";
import * as controllers from '../../handler/products.controllers';
import auth from '../../mWare/auth.mWare';

// product routes
const routes = Router();
routes.route('/').get(controllers.Index).post(auth, controllers.create);
routes.route('/:id').get(controllers.Show);
export default routes;