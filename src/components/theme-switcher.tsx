import { Flex, Switch, useColorMode } from '@chakra-ui/react';
import { Dark as DarkIcon, Light as LightIcon } from './shared/svgs/theme';

export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <Flex alignItems="center" justifyContent="space-between" w="120px">
      <LightIcon />
      <Switch
        isChecked={isDark}
        onChange={toggleColorMode}
        size="md"
        colorScheme="switchScheme"
        css={{
          '.chakra-switch__track': {
            backgroundColor: '#A8A4FF',
          },
        }}
        aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      />
      <DarkIcon />
    </Flex>
  );
};
