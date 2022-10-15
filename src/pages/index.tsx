import type { NextPage } from 'next';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';
import { Kanban } from '../components/kanban';
// import Head from 'next/head';
// import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const { data } = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <Grid
      gridTemplate={`
        "sidebar header" 100px 
        "sidebar main"  1fr
        / 300px 1fr
      `}
      h="100vh"
    >
      <GridItem w="100%" h="100%" bg="blue.500" gridArea="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem gridArea="header">
        <Header />
      </GridItem>
      <GridItem w="100%" h="100%" bg="blue.500" gridArea="main">
        <Kanban />
      </GridItem>
    </Grid>
  );
};

export default Home;
