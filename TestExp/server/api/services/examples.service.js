import uuid from 'uuid';
import l from '../../common/logger';
import ExamplesDAO from '../DAO/examplesDAO';


class ExamplesService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return ExamplesDAO.getAll();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return ExamplesDAO.getById(id);
  }

  create(name) {
    l.info(`${this.constructor.name}.create()`);
    const objectId = uuid.v1();
    const example = { id: objectId, name: name };
    return ExamplesDAO.create(example);
  }

  update(id, example) {
    l.info(`${this.constructor.name}.update(${id})`);
    const exData = Object.assign(example)
    delete exData.id
    return ExamplesDAO.update(id, exData);
  }

  delete(id) {
    l.info(`${this.constructor.name}.delete(${id})`);
    return ExamplesDAO.deleteById(id);
  }
}

export default new ExamplesService();
