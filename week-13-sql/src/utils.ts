import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://neondb_owner:npg_i5O8DUxpdtLP@ep-snowy-glade-a132kzbl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
    await client.connect();
    return client;
}