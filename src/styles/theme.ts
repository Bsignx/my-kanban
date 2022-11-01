import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  primary: '#635FC7',
  secondary: '#A8A4FF',
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
    100: '#A8A4FF',
    200: '#A8A4FF',
    300: '#A8A4FF',
    400: '#A8A4FF',
    500: '#A8A4FF',
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
