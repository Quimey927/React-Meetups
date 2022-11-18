import Head from 'next/head';

import connectDB from '../lib/connect-db';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
       <title>React Meetups</title>
       <meta
        name="description"
        content="Browse a huge list of highly active React meetups!"
       />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

export const getStaticProps = async () => {
  const [meetupCollection, closeClient] = await connectDB();
  const meetups = await meetupCollection.find().toArray();

  closeClient();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  };
};

export default HomePage;