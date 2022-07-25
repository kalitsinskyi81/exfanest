import mongoose, { Mongoose } from 'mongoose';

const connect = (): Promise<Mongoose> =>
  mongoose.connect(process.env.MONGO_BD_CONNECTION_URI, {
    dbName: 'exfanest'
  });

export default connect;
