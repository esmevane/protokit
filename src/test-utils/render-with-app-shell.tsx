import { render } from '@testing-library/react';
import { Shell } from 'shell';

export async function renderWithAppShell(ui: React.ReactNode) {
  return render(<Shell>{ui}</Shell>);
}
