import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  color: string;
  value: number;
  thickness: number;
  trackColor: string;
  Icon: IconType;
  iconColor: string;
};

const Circle: React.FC<Props> = ({ color, value, thickness, trackColor, iconColor, Icon }) => {
  return (
    <CircularProgress
      color={color}
      value={value}
      thickness={thickness}
      trackColor={trackColor}
      size="40px"
      sx={{
        marginRight: '5px',
        filter: 'drop-shadow(0 0 2px #000)',
      }}
    >
      <CircularProgressLabel
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon fontSize="15px" color={iconColor} />
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Circle;
