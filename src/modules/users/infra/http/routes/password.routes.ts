import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPassowrdController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPassowrdController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
