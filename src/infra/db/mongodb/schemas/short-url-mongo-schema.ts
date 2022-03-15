import mongoose from 'mongoose';

interface ShortUrl {
  url: string;
  alias: string;
}

const shortUrlSchema = new mongoose.Schema<ShortUrl>({
  url: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
});

export const ShortUrlMongoModel = mongoose.model<ShortUrl>('ShortUrl', shortUrlSchema, 'short-url');
