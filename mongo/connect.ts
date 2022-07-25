import mongoose, { Mongoose } from 'mongoose';

const bdUri: string = process.env.MONGO_BD_CONNECTION_URI || 'mongodb+srv://root:password!@exfanest.56g8r.mongodb.net/?retryWrites=true&w=majority';

const connect = (): Promise<Mongoose> =>
  mongoose.connect(bdUri, {
    dbName: 'exfanest'
  });

export default connect;
