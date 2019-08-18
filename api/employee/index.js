import { Router } from 'express';
import * as controller from './employee.controller';

const router = Router();

router.get('/',  controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);

exports = module.exports = router;