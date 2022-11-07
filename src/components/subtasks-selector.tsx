import { Box, useColorModeValue } from '@chakra-ui/react';

import { Subtask } from '../types/domain';
import { Checkbox } from './shared/checkbox';
import { Text } from './shared/text';

type props = {
  subtasks?: Subtask[];
  title: string;
  checkedItems: boolean[];
  handleSubtaskChange: ({
    isDone,
    subtaskId,
  }: {
    subtaskId: number;
    isDone: boolean;
  }) => void;
};

export const SubtasksSelector = ({
  subtasks,
  title,
  checkedItems,
  handleSubtaskChange,
}: props) => {
  const titleColor = useColorModeValue('dark.10', 'light.100');
  const checkboxBgColor = useColorModeValue('light.200', 'dark.300');

  return (
    <>
      <Text
        variant="p"
        fontSize="small"
        mt="5"
        mb="4"
        color={titleColor}
        fontWeight="700"
      >
        {title}
      </Text>
      {subtasks?.map((subtask, index) => (
        <Box
          bgColor={checkboxBgColor}
          mb="2"
          p="2"
          borderRadius="sm"
          key={subtask.id}
        >
          <Checkbox
            key={subtask.id}
            _checked={{
              color: 'dark.10',
              textDecoration: 'line-through',
            }}
            isChecked={
              checkedItems[index] !== undefined ? checkedItems[index] : false
            }
            onChange={(e) =>
              handleSubtaskChange({
                isDone: e.target.checked,
                subtaskId: subtask.id,
              })
            }
          >
            {subtask.title}
          </Checkbox>
        </Box>
      ))}
    </>
  );
};
