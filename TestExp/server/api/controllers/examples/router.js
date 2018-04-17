import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.get)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
