import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const colors = {
  primary: '#5FC7C1',
  secondary: '#A4D3FF',
  dark: {
    10: '#828FA3',
    50: '#3E3F4E',
    100: '#2B2C37',
    200: '#000112',
    300: '#20212C',
  },
  border: {
    1: 'rgba(130, 143, 163, 0.25)',
  },
  light: { 100: '#FFFFFF', 200: '#F4F7FD', 300: '#E4EBFA' },
  alert: { 100: '#FF9898', 200: '#EA5555' },
  switchScheme: {
    100: '#5FC7C1',
    200: '#5FC7C1',
    300: '#5FC7C1',
    400: '#5FC7C1',
    500: '#5FC7C1',
  },
  checkboxScheme: {
    100: '#5FC7C1',
    200: '#5FC7C1',
    300: '#5FC7C1',
    400: '#5FC7C1',
    500: '#5FC7C1',
  },
};

const fonts = {
  heading: 'Plus Jakarta Sans',
  body: 'Plus Jakarta Sans',
};

const global = {
  body: {
    bg: 'light.200',
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  global,
});
