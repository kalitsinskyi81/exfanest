import { Request, Response, ErrorRequestHandler } from 'express';
import { MongooseError } from 'mongoose';

const index = (req: Request, res: Response) => {
  try {
    console.log('ERROR');
    // if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    return res.status(500).send('An unknown errorHandler occurred.');
  } catch (err) {
    res.status(500).send('An unknown errorHandler occurred.');
  }
};

export default index;
