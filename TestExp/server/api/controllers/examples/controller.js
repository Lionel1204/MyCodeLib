import ExamplesService from '../../services/examples.service';
import statusCode from '../../../common/statusCode';

export class Controller {
  // change the promise to async:
  // https://blog.risingstack.com/mastering-async-await-in-nodejs/
  async all(req, res) {
    const r = await ExamplesService.all();
    return res.json(r);
  }

  async get(req, res) {
    const r = await ExamplesService.byId(req.params.id)
    if (r) res.json(r);
    else res.status(statusCode.badRequest).end();
  }

  async create(req, res) {
    const r = await ExamplesService.create(req.body.name)
    return res.status(statusCode.created).location(`/api/v1/examples/${r.id}`).json(r);
  }

  async update(req, res) {
    const r = await ExamplesService.update(req.params.id, req.body)
    return res.json(r);
  }

  async delete(req, res) {
    const r = await ExamplesService.delete(req.params.id)
    if (r) res.status(statusCode.noContent).end();
    else res.status(statusCode.notFound).end();
  }
}
export default new Controller();
