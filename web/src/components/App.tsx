import { Box, CircularProgress, CircularProgressLabel, Spacer } from '@chakra-ui/react';
import { debugData } from '../utils/debugData';
import { FaHamburger } from 'react-icons/fa';
import { GiWaterDrop, GiHealthPotion, GiRun } from 'react-icons/gi';
import Circle from './Circle';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useState } from 'react';
import { MdKeyboardVoice } from 'react-icons/md';

debugData([
  {
    action: 'setStatus',
    data: {
      voice: {
        value: 100,
        visible: true,
      },
      hunger: {
        value: 100,
        visible: true,
      },
      thirst: {
        value: 50,
        visible: true,
      },
    },
  },
]);

// create types for the data
type Status = {
  value: number;
  visible: boolean;
};

type StatusData = {
  hunger: Status;
  thirst: Status;
  voice: Status;
};

type UpdateStatusProps = {
  [key: string]: Status;
};

const App = () => {
  const [status, setStatus] = useState<StatusData>({
    hunger: { value: 0, visible: true },
    thirst: { value: 0, visible: true },
    voice: { value: 0, visible: true },
  });

  const [onMount, setOnMount] = useState<boolean>(false);

  const [isTalking, setIsTalking] = useState<boolean>(false);

  useNuiEvent('setStatus', (data: StatusData) => {
    setStatus(data);
  });

  useNuiEvent('updateStatus', (data: UpdateStatusProps) => {
    setStatus((prev) => ({ ...prev, ...data }));
  });

  useNuiEvent('playerTalk', (data: { isTalking: boolean }) => {
    // setStatus((prev) => ({ ...prev, voice: { ...prev.voice, value: data.isTalking ? 100 : 0 } }));
    setIsTalking(data.isTalking);
  });

  useNuiEvent('onMount', (data: boolean) => {
    setOnMount(data);
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '38px',
        left: '140px',
        ' > *': {
          marginRight: '10px',
        },
        // 'div:nth-child(2)': {
        //   marginLeft: onMount ? '60px' : '0px',
        // },
      }}
    >
      {status.hunger && status.hunger.visible && (
        <Circle
          color={'gray.100'}
          value={status.hunger.value}
          thickness={9}
          trackColor={'black'}
          iconColor={'white'}
          Icon={FaHamburger}
        />
      )}

      {status.thirst && status.thirst.visible && (
        <Circle
          color={'gray.100'}
          value={status.thirst.value}
          thickness={9}
          trackColor={'black'}
          iconColor={'white'}
          Icon={GiWaterDrop}
          onMount={onMount}
        />
      )}

      {status.voice && status.voice.visible && (
        <Circle
          color={isTalking ? 'green' : 'gray.100'}
          value={status.voice.value}
          thickness={9}
          trackColor={'black'}
          iconColor={isTalking ? 'green' : 'white'}
          Icon={MdKeyboardVoice}
        />
      )}
    </Box>
  );
};

export default App;
