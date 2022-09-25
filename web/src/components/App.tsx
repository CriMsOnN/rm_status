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

  useNuiEvent('setStatus', (data: StatusData) => {
    setStatus(data);
  });

  useNuiEvent('updateStatus', (data: UpdateStatusProps) => {
    setStatus((prev) => ({ ...prev, ...data }));
  });

  useNuiEvent('playerTalk', (data: { isTalking: boolean }) => {
    setStatus((prev) => ({ ...prev, voice: { ...prev.voice, value: data.isTalking ? 100 : 0 } }));
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
        />
      )}

      {status.voice && status.voice.visible && (
        <Circle
          color={status.voice.value > 0 ? 'green' : 'gray.100'}
          value={100}
          thickness={9}
          trackColor={'black'}
          iconColor={status.voice.value > 0 ? 'green' : 'white'}
          Icon={MdKeyboardVoice}
        />
      )}
    </Box>
  );
};

export default App;
