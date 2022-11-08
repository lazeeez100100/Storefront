import {Router} from "express";
import * as controllers from '../../handler/orders.controllers';
import auth from '../../mWare/auth.mWare';

// order routes
const routes = Router();
routes.route('/').post(auth, controllers.create);
routes.route('/:id').get(auth, controllers.Index).delete(auth, controllers.deleteAll);
routes.route('/:id/:status').get(auth, controllers.Show);

export default routes;