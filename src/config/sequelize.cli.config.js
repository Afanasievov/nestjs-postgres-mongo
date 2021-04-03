// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');

const dbConfig = config.get('db');

module.exports = {
  dialect: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
};
