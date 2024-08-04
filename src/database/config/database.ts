import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:root@localhost:3307/userAuthSystem', {
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
