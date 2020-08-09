import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileConroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileConroller.show);

export default profileRouter;
