import connectDB from '../../lib/connect-db';

const handler = async (req, res) => {
  if ('POST' === req.method) {
    try {
      const [meetupCollection, closeClient] = await connectDB();

      await meetupCollection.insertOne(req.body);

      closeClient();

      res.status(201).json({ message: 'Meetup iserted.' });
    } catch (error) {
      console.error(error);
    }
  }
}

export default handler;
