import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_HOST_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log("");

export const ormconfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_HOST_PORT) || 10,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": [
        "dist/**/**/*.entity{.ts,.js}"
    ],
    "synchronize": true,
}