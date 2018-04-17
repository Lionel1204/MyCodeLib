import { Pool } from 'pg';
import _ from 'lodash';

export class BaseDAO {
  constructor(tableName) {
    this._pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    this._tableName = tableName;
  }

  // Note: If there are massive records in the table,
  // Cursor should be used to get records in pagination way
  async getAll() {
    const client = await this._pool.connect();
    try {
      const text = `SELECT * FROM ${this._tableName}`;
      const res = await client.query(text);
      return res.rows;
    } catch (ex) {
      console.log(ex.message);
      return [];
    } finally {
      client.release();
    }
  }

  async close() {
    await this._pool.end();
  }

  async getById(id) {
    const client = await this._pool.connect();
    try {
      const text = `SELECT * FROM ${this._tableName} WHERE id = $1`;
      const res = await client.query(text, [id]);
      return res.rowCount > 0 ? res.rows[0] : null;
    } catch (ex) {
      console.log(ex.message);
      return null;
    } finally {
      client.release();
    }
  }

  async create(data) {
    const client = await this._pool.connect();

    try {
      const text = this.buildInsertStatement(data);
      const value = this.buildUpsertValue(data);
      const res = await client.query(text, value);
      return (res.rowCount === 1);
    } catch (ex) {
      console.log(ex.message);
      return false;
    } finally {
      client.release();
    }
  }

  async update(id, data) {
    const client = await this._pool.connect();
    try {
      const text = this.buildUpldateStatement(id, data);
      const value = this.buildUpsertValue(data);
      const res = await client.query(text, value);
      return (res.rowCount === 1);
    } catch (ex) {
      console.log(ex.message);
      return false;
    } finally {
      client.release();
    }
  }

  async deleteById(id) {
    const client = await this._pool.connect();
    try {
      const text = `DELETE FROM ${this._tableName} WHERE id = $1`;
      const res = await client.query(text, [id]);
      return (res.rowCount === 1);
    } catch (ex) {
      console.log(ex.message);
      return false;
    } finally {
      client.release();
    }
  }

  buildInsertStatement(data) {
    if (_.isEmpty(data)) {
      return '';
    }

    const keys = Object.keys(data);
    const values = keys.map(k => data[k]);
    const valuePlaceHolder = values.map((v, ind) => `$${(ind + 1)}`);
    return `INSERT INTO ${this._tableName}(${keys.join(',')}) VALUES (${valuePlaceHolder.join(',')})`;
  }

  buildUpldateStatement(id, data) {
    if (_.isEmpty(data)) {
      return '';
    }

    const keys = Object.keys(data);
    const values = keys.map(k => data[k]);
    const valuePlaceHolder = values.map((v, ind) => `$${(ind + 1)}`);
    const setParams = keys.map((v, i) => `${v}=${valuePlaceHolder[i]}`).join(',');
    return `UPDATE ${this._tableName} SET ${setParams} WHERE id='${id}'`;
  }

  buildUpsertValue(data) {
    if (_.isEmpty(data)) {
      return [];
    }

    const keys = Object.keys(data);
    const values = keys.map(k => data[k]);
    return values;
  }
}

export default new BaseDAO();
