import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Button } from './shared/button';
import { TextField } from './shared/text-field';

import { Close as CloseIcon } from './shared/icons/close';

type Props = {
  columns: string[];
  onAddColumn: () => void;
  onRemoveColumn: (index: number) => void;
  onColumnChange: ({
    columnIndex,
    value,
  }: {
    columnIndex: number;
    value: string;
  }) => void;
};

export const BoardColumnsEditor = ({
  columns,
  onAddColumn,
  onColumnChange,
  onRemoveColumn,
}: Props) => {
  const labelColor = useColorModeValue('dark.10', 'light.100');

  return (
    <>
      <Text fontSize="small" fontWeight="700" mt="6" mb="2" color={labelColor}>
        Board Columns
      </Text>
      {columns?.map((column, index) => (
        <Flex mb="4" key={index}>
          <TextField
            value={column}
            onChange={(value: string) =>
              onColumnChange({ value, columnIndex: index })
            }
          />

          <Box
            as="button"
            ml="4"
            aria-label="Remove column"
            onClick={() => onRemoveColumn(index)}
          >
            <CloseIcon
              fill="dark.10"
              _hover={{
                fill: 'secondary',
              }}
            />
          </Box>
        </Flex>
      ))}

      <Button
        type="button"
        w="100%"
        mb="4"
        variant="secondary"
        onClick={onAddColumn}
      >
        + Add New Column
      </Button>
    </>
  );
};
