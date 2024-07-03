import { expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestComponent } from '../src/components/TestComponent';

test('check h1', () => {
  const { unmount } = render(<TestComponent />);
  const h1 = screen.getByText('Hello');
  expect(h1).toBeInTheDocument();
  expect(h1).toHaveStyle({ color: 'red' });
  unmount();
});

test('check input click', () => {
  const { unmount } = render(<TestComponent />);
  const input = screen.getByLabelText('input');
  const text = 'ValueText';
  fireEvent.change(input, { target: { value: text } });
  screen.debug();
  expect(screen.getByDisplayValue(text));
  unmount();
});

test('check async', async () => {
  const { unmount } = render(<TestComponent />);
  const titlePost = await screen.findByText('Woolf');
  // screen.debug();
  expect(titlePost).toBeInTheDocument();
  unmount();
});
