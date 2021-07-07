type Stylable = { className?: string; style?: React.CSSProperties };
type FlexProps = Pick<
  React.CSSProperties,
  'justifyContent' | 'flexDirection' | 'gap' | 'alignItems' | 'flexWrap'
>;

export function Flex({
  children,
  className = '',
  style = {},
  justifyContent = 'flex-start',
  flexDirection = 'row',
  flexWrap = 'wrap',
  gap = 0,
  alignItems = 'flex-start',
}: Props<Stylable & Partial<FlexProps>>) {
  return (
    <div
      className={className}
      style={{
        ...style,
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
        gap,
        display: 'flex',
      }}
    >
      {children}
    </div>
  );
}
