import { ObjectId } from 'mongodb';
import Head from 'next/head';

import connectDB from '../../lib/connect-db';
import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
      </Head>
      <MeetupDetail {...props} />
    </>
  );
};

export const getStaticPaths = async () => {
  const [meetupCollection, closeClient] = await connectDB();
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  closeClient();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.meetupId;
  const [meetupCollection, closeClient] = await connectDB();
  const { _id, title, image, address, description } =
    await meetupCollection.findOne({ _id: ObjectId(id) });

  closeClient();

  return {
    props: { id: _id.toString(), title, image, address, description },
  };
};