import { useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';

const colors = [
  'dark',
  'grey',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
] as const;

const lines = [
  '1px', // xxs
  '2px', // xs
  '3px', // sm
  '4px', // md
  '5px', // lg
  '6px', // xl
  '7px', // xxl
];

const whitespaces = [
  '2px', // xxs
  '4px', // xs
  '8px', // sm
  '16px', // md
  '20px', // lg
  '24px', // xl
  '32px', // xxl
];

type MantineTheme = ReturnType<typeof useMantineTheme>;

function updateDocumentVariables(
  theme: MantineTheme,
  setter: (property: string, value: string) => void
): void {
  for (const color of colors) {
    const palette = theme.colors[color];

    if (palette) {
      for (const shade of palette) {
        const index = palette.indexOf(shade);
        const weight = (index + 1) * 100;

        setter(`--colors-${color}-${weight}`, shade);
      }
    }
  }

  for (const whitespace of whitespaces) {
    const weight = (whitespaces.indexOf(whitespace) + 1) * 100;

    setter(`--whitespace-${weight}`, whitespace);
  }

  for (const line of lines) {
    const weight = (lines.indexOf(line) + 1) * 100;

    setter(`--line-${weight}`, line);
  }

  if (theme.fontFamily) {
    setter(`--font-family-app`, `'${theme.fontFamily}'`);
  }
}

export function ThemeVariables(props: Props<unknown>) {
  const theme = useMantineTheme();

  useEffect(() => {
    updateDocumentVariables(theme, (property, value) => {
      document.body.style.setProperty(property, value);
    });
    // eslint-disable-next-line
  }, []);

  return null;
}
