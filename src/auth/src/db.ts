import knex from 'knex';

export default knex({
  client: 'pg',
  connection: {
    host: 'database',
    user: 'postgres',
    password: 'password',
    database: 'postgres'
  }
});