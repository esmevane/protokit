import * as TestUtils from 'test-utils';

const propertyAssertions = [
  ['--colors-dark-1000', '#01010a'],
  ['--whitespace-100', '2px'],
  ['--line-700', '7px'],
  ['--font-family-app', expect.stringMatching('')],
];

const cases = it.each(propertyAssertions);

cases('sets property %s to %s', async (property, expectation) => {
  await TestUtils.renderWithAppShell(null);

  expect(document.body.style.getPropertyValue(property)).toEqual(expectation);
});
