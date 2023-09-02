import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt: {
        secret: process.env.JWT_SCRET,
        expired_in: process.env.JWT_EXPIRED_IN,
        refresh_token: process.env.JWT_SCRET,
        salt_round: process.env.JWT_SCRET_SALT_ROUND
    }
}