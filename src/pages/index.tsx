import type { NextPage } from 'next';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Header } from '../components/header';
import { SideMenu } from '../components/side-menu';
import { Kanban } from '../components/kanban';
import { Logo } from '../components/shared/svgs/logo';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  // const { data } = trpc.example.hello.useQuery({ text: 'from test' });
  // const { data } = trpc.kanban.getBoards.useQuery();
  // console.log(data);
  // const { data: taskData } = trpc.kanban.getTasks.useQuery();
  // console.log(taskData);
  // const { mutate } = trpc.kanban.createBoard.useMutation();

  const [isHidden, setIsHidden] = useState(false);

  const kanbanBgColor = useColorModeValue('light.200', 'dark.300');
  const sideMenuBgColor = useColorModeValue('light.200', 'dark.300');

  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  // useEffect(() => {
  //   mutate({ title: 'bruno' });
  // }, []);

  return (
    <Grid
      gridTemplate={
        isHidden
          ? `
        "sidemenu header" 100px
        "main main" 1fr
        / 300px 1fr
      `
          : `
        "sidemenu header" 100px 
        "sidemenu main"  1fr
        / 300px 1fr
      `
      }
      h="100vh"
    >
      <GridItem gridArea="header">
        <Header />
      </GridItem>
      <GridItem gridArea="sidemenu" bgColor={sideMenuBgColor}>
        <SideMenu onClick={handleHide} isHidden={isHidden} />
      </GridItem>
      <GridItem w="100%" h="100%" bg={kanbanBgColor} gridArea="main">
        <Kanban />
      </GridItem>
    </Grid>
  );
};

export default Home;
