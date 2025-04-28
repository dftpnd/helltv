const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: "postgres",
  host: "192.168.1.116",
  port: 5438,
  username: "postgres",
  password: "7878",
  database: "payment",
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/migrations/*.ts']
});

module.exports = dataSource;