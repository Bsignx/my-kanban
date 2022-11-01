import { Box, useColorModeValue } from '@chakra-ui/react';

import { Text } from './shared/text';

export const BoardColumnTask = ({
  description,
  title,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  const taskBgColor = useColorModeValue('light.100', 'dark.100');
  const taskTitleColor = useColorModeValue('dark.200', 'light.100');

  return (
    <Box
      onClick={onClick}
      px="4"
      py="6"
      cursor="pointer"
      bgColor={taskBgColor}
      borderRadius="8px"
      w="100%"
    >
      <Text variant="h3" color={taskTitleColor} fontSize="md">
        {title}
      </Text>
      <Text variant="p" fontSize="sm" mt="2" color="dark.10" fontWeight="700">
        {description}
      </Text>
    </Box>
  );
};
