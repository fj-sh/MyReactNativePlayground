import { FitBox, Group, Paint, rect, RoundedRect, rrect, Shadow } from '@shopify/react-native-skia';

// https://www.youtube.com/watch?v=GFssmWUhwww

const src = rect(0, 0, 24, 24);
const border = rrect(src, 5, 5);
const container = rrect(rect(1, 1, 22, 22), 5, 5);

interface NeumorphismButtonProps {
  x: number;
  y: number;
  size: number;
}
export const NeumorphismButton = ({ x, y, size }: NeumorphismButtonProps) => {
  return (
    <FitBox src={src} dst={rect(x, y, size, size)}>
      <Group>
        <Paint>
          <Shadow dx={-1} dy={-1} blur={3} color={'white'} />
          <Shadow dx={1} dy={1} blur={3} color={'rgba(174,174,192,0.4)'} />
        </Paint>
        <RoundedRect rect={border} color={'red'} />
      </Group>
      <Group>
        <RoundedRect rect={container} color={'green'} />
      </Group>
    </FitBox>
  );
};
