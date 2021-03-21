module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task-management',
  models: [__dirname + '/**/*.model.ts'],
  autoLoadModels: true,
  repositoryMode: true,
};
