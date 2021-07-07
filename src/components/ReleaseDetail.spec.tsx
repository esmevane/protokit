import userEvent from '@testing-library/user-event';
import { releases } from 'models';
import { useEffect } from 'react';
import { useAppEvents, useAppSelector } from 'shell';
import * as TestUtils from 'test-utils';
import { ReleaseDetail } from './ReleaseDetail';

function ReleaseDetailDiagnostics(props: Props<unknown>) {
  const events = useAppEvents();
  const [release] = useAppSelector((state) => state.context.cache.release.data);

  useEffect(() => {
    events.releases.fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {props.children}
      {release && (
        <button onClick={() => events.focus.release(release.id)}>
          Visit first release
        </button>
      )}
    </>
  );
}

it('presents the title, authors, summary, and buy button', async () => {
  const [release] = releases;
  const details = await TestUtils.renderWithAppShell(
    <ReleaseDetailDiagnostics>
      <ReleaseDetail />
    </ReleaseDetailDiagnostics>
  );

  userEvent.click(await details.findByText('Visit first release'));

  await details.findByText(release.attributes.title);
  await details.findByText(release.attributes.authors.join(', '));
  await details.findByText(release.attributes.summary);
  await details.findByText(release.attributes.cost);
});
