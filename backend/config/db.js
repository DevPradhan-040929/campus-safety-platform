import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // If no Mongo URI is provided or it's localhost, let's use an in-memory database to ensure it works anywhere instantly!
        if (!uri || uri.includes('localhost')) {
            console.log('No remote Mongo URI detected. Starting an in-memory MongoDB server for demonstration...');
            mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
        }

        const conn = await mongoose.connect(uri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
