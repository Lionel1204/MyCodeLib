import { BaseDAO } from './BaseDAO';

class ExamplesDAO extends BaseDAO {
  constructor() {
    const TABLE_NAME = 'public.example'
    super(TABLE_NAME);
  }
}

export default new ExamplesDAO();
