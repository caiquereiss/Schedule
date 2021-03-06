import { Router } from 'express';
import {celebrate, Segments, Joi} from 'celebrate';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const appointmentsController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', appointmentsController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.BODY]:{
      provider_id: Joi.string().uuid().required(),
    }
  }),
   providerMonthAvailabilityController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.BODY]:{
      provider_id: Joi.string().uuid().required(),
    }
  }), providerDayAvailabilityController.index);

export default providersRouter;

//localhost:3333/providers:/id/month-availability
//localhost:3333/providers:/id/day-availability
