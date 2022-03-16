import mongoose from 'mongoose';

import env from '@/main/config/env';

export const MongoHelper = {
  async connect(): Promise<void> {
    await mongoose.connect(env.mongoUrl);
  },

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  },

  async clearCollection(model: mongoose.Model<any>): Promise<void> {
    await model.deleteMany({});
  },

  map: (data: any) => {
    const { _id, ...rest } = data;

    delete rest.__v;

    return { ...rest, id: _id.toHexString() };
  },
};
