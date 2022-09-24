import { Box, CircularProgress, CircularProgressLabel, Spacer } from '@chakra-ui/react';
import { debugData } from '../utils/debugData';
import { FaHamburger } from 'react-icons/fa';
import { GiWaterDrop, GiHealthPotion, GiRun } from 'react-icons/gi';
import Circle from './Circle';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { useState } from 'react';

debugData([
  {
    action: 'setStatus',
    data: {
      health: {
        value: 100,
        visible: true,
      },
      stamina: {
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
  health: Status;
  stamina: Status;
  hunger: Status;
  thirst: Status;
};

type UpdateStatusProps = {
  [key: string]: Status;
};

const App = () => {
  const [status, setStatus] = useState<StatusData>({
    health: { value: 0, visible: true },
    stamina: { value: 0, visible: true },
    hunger: { value: 0, visible: true },
    thirst: { value: 0, visible: true },
  });

  useNuiEvent('setStatus', (data: StatusData) => {
    setStatus(data);
  });

  useNuiEvent('updateStatus', (data: UpdateStatusProps) => {
    setStatus((prev) => ({ ...prev, ...data }));
  });

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: '5%',
      }}
    >
      {status.health && status.health.visible && (
        <Circle
          color={'gray.100'}
          value={status.health.value}
          thickness={11}
          trackColor={'gray.900'}
          iconColor={'red'}
          Icon={GiHealthPotion}
        />
      )}

      {status.stamina && status.stamina.visible && (
        <Circle
          color={'gray.100'}
          value={status.stamina.value}
          thickness={11}
          trackColor={'gray.900'}
          iconColor={'lightgreen'}
          Icon={GiRun}
        />
      )}

      {status.hunger && status.hunger.visible && (
        <Circle
          color={'gray.100'}
          value={status.hunger.value}
          thickness={11}
          trackColor={'gray.900'}
          iconColor={'orange'}
          Icon={FaHamburger}
        />
      )}

      {status.thirst && status.thirst.visible && (
        <Circle
          color={'gray.100'}
          value={status.thirst.value}
          thickness={11}
          trackColor={'gray.900'}
          iconColor={'cyan'}
          Icon={GiWaterDrop}
        />
      )}
    </Box>
  );
};

export default App;
