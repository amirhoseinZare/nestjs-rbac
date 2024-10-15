import { DataSource, DataSourceOptions } from 'typeorm';

import { databaseConfiguration } from '../src/config/db';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: databaseConfiguration.host,
    username: databaseConfiguration.user,
    password: databaseConfiguration.password,
    database: databaseConfiguration.db,
    port: databaseConfiguration.port,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
    extra: {
        max: 10000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        retryDelay: 3000,
        retryAttempts: 5,
    },
    logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;