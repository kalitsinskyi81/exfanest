import mongoose, { Mongoose } from 'mongoose';

const connect = (): Promise<Mongoose> =>
  mongoose.connect('mongodb+srv://root:password!@exfanest.56g8r.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'exfanest'
  });

export default connect;
