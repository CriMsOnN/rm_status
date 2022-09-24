import { extendTheme, ThemeConfig } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'none',
      },
    },
    Select: {
      baseStyle: {
        field: {
          color: 'red.500',
        },
      },
    },
  },
});
