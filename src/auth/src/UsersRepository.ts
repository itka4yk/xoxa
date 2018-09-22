import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db';

const config = require('./config.json');

interface IUser {
  username: string;
  password: string;
}

class UsersRepository {
  constructor() {
    db.schema.hasTable('users').then((exists) => {
      if (!exists) {
        return db.schema.createTable('users', function(t) {
          t.increments('id').primary();
          t.string('username', 100);
          t.string('hash', 100);
        });
      }
    });
  }

  async authenticate({ username, password }: IUser) {
    const user = await db('users').select().where({ username }).first();
    if (user && bcrypt.compareSync(password, user.hash)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      return { token };
    }
  }

  async getAll() {
    return await db.select().table('users');
  }

  async getById(id: string) {
    return await db('users').where({ id });
  }

  async create({ username, password }: IUser) {
    const hash = bcrypt.hashSync(password, 10);

    await db('users').insert({
      username,
      hash
    })
  }

  async update(id, userParam) {
    const user = await db('users').select().where({ id }).first();

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await db('users').select().where({ username: userParam.username }).first()) {
      throw 'Username "' + userParam.username + '" is already taken';
    }

    if (userParam.password) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await db('users').update({ ...user, ...userParam });
  }

  async del(id) {
    await db('users').where({ id }).delete();
  }

}

export default new UsersRepository();