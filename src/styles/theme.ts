import { extendTheme } from '@chakra-ui/react';

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
  light: { 100: '#FFFFFF', 200: '#F4F7FD', 300: '#E4EBFA' },
  alert: { 100: '#FF9898', 200: '#EA5555' },
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
  colors,
  fonts,
  global,
});
