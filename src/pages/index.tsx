import type { NextPage } from 'next';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

import { Header } from '../components/header';
import { SideMenu } from '../components/side-menu';
import { Board } from '../components/board';
import { KanbanContextProvider } from '../contexts/kanban-context';

const Home: NextPage = () => {
  const [isHidden, setIsHidden] = useState(false);

  const sideMenuBgColor = useColorModeValue('light.200', 'dark.300');
  const mainBgColor = useColorModeValue('light.200', 'dark.300');

  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  return (
    <KanbanContextProvider>
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
        overflow="hidden"
      >
        <GridItem gridArea="header">
          <Header />
        </GridItem>
        <GridItem gridArea="sidemenu" bgColor={sideMenuBgColor}>
          <SideMenu onClick={handleHide} isHidden={isHidden} />
        </GridItem>
        <GridItem
          gridArea="main"
          bgColor={mainBgColor}
          maxW={isHidden ? '100vw' : 'calc(100vw - 300px)'}
          maxH="calc(100vh - 100px)"
        >
          <Board />
        </GridItem>
      </Grid>
    </KanbanContextProvider>
  );
};

export default Home;
