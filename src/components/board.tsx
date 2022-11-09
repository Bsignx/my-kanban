import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { useKanban } from '../contexts/kanban-context';
import { colors } from '../styles/theme';
import { FilledBoard } from './filled-board';
import { VoidBoard } from './void-board';

export const Board = () => {
  const { tasksByStatus, isLoadingStatusesByBoardIdData, activeBoard } =
    useKanban();

  const isFilled = Object.keys(tasksByStatus).length > 0;

  return (
    <>
      {isLoadingStatusesByBoardIdData ? (
        <LoadingBar color={colors.primary} progress={100} height={5} />
      ) : (
        <Box
          p="6"
          h="100%"
          w="100%"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(43, 44, 55, 0.6)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'darkgray',
            },
          }}
        >
          {isFilled ? (
            <FilledBoard
              tasksByStatus={tasksByStatus}
              activeBoardId={activeBoard?.id}
            />
          ) : (
            <VoidBoard />
          )}
        </Box>
      )}
    </>
  );
};
