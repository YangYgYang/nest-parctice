import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  // host: "localhost",
  // port: 3306,
  // username: "test",
  // password: "test",
  database: 'test',
  // logging:"query"
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
