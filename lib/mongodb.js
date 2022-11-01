import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;


if (!MONGODB_URI)
{
    throw new Error('MONGODB_URI is not set. Set the environment variable to continue.');
}


let cachedClient = global.mongoose;

if (!cachedClient) {
    cachedClient = global.mongoose = {conn: null, promise: null}
}

export default async function ConnectToDB() {
    if (cachedClient)
    {
        return cachedClient.conn;
    }

    if(!cachedClient.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: true,
            useCreateIndex: true
        };

        cachedClient.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            return mongoose
        })
    }

    cachedClient.conn= await cachedClient.promise;
    return cachedClient.conn;
}