import { useAppSelector } from 'shell';

export function RenderScreen(props: Props<{ for: ScreenNames }>) {
  const matches = useAppSelector((state) =>
    state.matches(`screen.${props.for}`)
  );

  return matches ? <>{props.children}</> : null;
}
