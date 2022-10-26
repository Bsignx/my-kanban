import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';

import { useKanban } from '../contexts/kanban-context';
import { Button } from './shared/button';
import { Text } from './shared/text';

const mockedTasks = [
  {
    id: 1,
    title: 'Build UI for onboarding flow',
    subtasksDescription: '0 of 3 substasks',
  },
  {
    id: 2,
    title: 'Build UI for search',
    subtasksDescription: '0 of 1 substasks',
  },
  {
    id: 3,
    title: 'Build settings UI',
    subtasksDescription: '0 of 2 substasks',
  },
  {
    id: 4,
    title: 'QA and test all major user journeys',
    subtasksDescription: '0 of 2 substasks',
  },
];

export const Kanban = () => {
  const { tasksByStatus } = useKanban();

  const isFilled = Object.keys(tasksByStatus).length > 0;

  return <>{isFilled ? <FilledKanban /> : <VoidKanban />}</>;
};

const FilledKanban = () => {
  return (
    <Flex>
      <Box>
        <Text>TODO (4)</Text>
        <VStack>
          {mockedTasks.map(({ id, subtasksDescription, title }) => (
            <Box key={id}>
              <Text>{title}</Text>
              <Text>{subtasksDescription}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

const VoidKanban = () => {
  const kanbanBgColor = useColorModeValue('light.200', 'dark.300');

  return (
    <Flex
      h="100%"
      bg={kanbanBgColor}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="h3" color="dark.10" mb="7">
        This board is empty. Create a new column to get started.
      </Text>

      <Button onClick={() => alert('clicked')} maxW="160px">
        + Add New Column
      </Button>
    </Flex>
  );
};
