import { z } from 'zod';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config/database';

export interface userModel {
    id: number,
    username: string,
    email: string,
    password: string
}

export class User extends Model<userModel> implements userModel {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'Users',
        sequelize,
    }
);

export const initializeDatabase = async () => {
    await sequelize.sync();
};


export const userRegistrationSchema = z.object({
    username: z.string().min(5, "userName must be at least 5 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
})

export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})