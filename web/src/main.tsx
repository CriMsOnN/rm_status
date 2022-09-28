import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { theme } from './theme';
import { isEnvBrowser } from './utils/misc';

if (isEnvBrowser()) {
  const root = document.getElementById('root');
  root!.style.backgroundImage = 'url("https://i.imgur.com/yamX4aP.png")';
  root!.style.backgroundSize = '100% 100%';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <VisibilityProvider>
        <DarkMode>
          <App />
        </DarkMode>
      </VisibilityProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
