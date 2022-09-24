import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

type Props = {
  color: string;
  value: number;
  thickness: number;
  trackColor: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
};

const Circle: React.FC<Props> = ({ color, value, thickness, trackColor, iconColor, Icon }) => {
  return (
    <CircularProgress
      color={color}
      value={value}
      thickness={thickness}
      trackColor={trackColor}
      style={{
        marginRight: '0.5%',
      }}
    >
      <CircularProgressLabel
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon fontSize="20px" color={iconColor} />
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Circle;
