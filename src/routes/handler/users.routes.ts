import {Router} from "express";
import * as controllers from '../../handler/users.controllers';
import auth from '../../mWare/auth.mWare';

// user routes
const routes = Router();
//routes.route('/').get(controllers.getMany).post(controllers.create);
routes.route('/').get(controllers.Index).post(controllers.create);
routes.route('/:id').get(controllers.Show).patch(auth, controllers.updateOne).delete(auth, controllers.deleteOne);
routes.route('/auth').post(controllers.auth);
export default routes;