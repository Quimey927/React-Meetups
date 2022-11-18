import { MongoClient } from 'mongodb';

export default async function () {
  // eslint-disable-next-line no-undef
  const client = await MongoClient.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
  });

  return [client.db().collection('meetups'), () => client.close()];
}