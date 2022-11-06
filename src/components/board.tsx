import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { useKanban } from '../contexts/kanban-context';
import { colors } from '../styles/theme';
import { FilledBoard } from './filled-board';
import { VoidBoard } from './void-board';

export const Board = () => {
  const { tasksByStatus, isLoadingStatusesByBoardIdData } = useKanban();

  const isFilled = Object.keys(tasksByStatus).length > 0;

  return (
    <>
      {isLoadingStatusesByBoardIdData ? (
        <LoadingBar color={colors.primary} progress={100} height={5} />
      ) : (
        <Box p="6">
          {isFilled ? (
            <FilledBoard tasksByStatus={tasksByStatus} />
          ) : (
            <VoidBoard />
          )}
        </Box>
      )}
    </>
  );
};
