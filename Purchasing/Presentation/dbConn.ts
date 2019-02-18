import { createConnection } from 'typeorm';

export async function getDbConnection() {
    // Add process.env.NODE_ENV checks later...
    return await createConnection();
}