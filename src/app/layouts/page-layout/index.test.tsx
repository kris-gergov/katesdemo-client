import React from 'react';
import { render } from '@testing-library/react';
import Page from './';

jest.mock('react-helmet-async', () => ({
  Helmet: () => <>Page layout title</>,
  HelmetProvider: () => jest.fn(),
}));

describe('Page layout component', () => {
  it('should render without error', () => {
    render(<Page />);
  });

  it('should render its children', () => {
    const { getByText } = render(<Page>test children</Page>);
    expect(getByText(/test children/)).toBeInTheDocument();
  });

  it('should accept additional props', () => {
    const { getByTestId } = render(
      <Page data-testid="test-page" className="test-class" />,
    );
    expect(getByTestId('test-page')).toHaveClass('test-class');
  });

  it('should forward ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Page ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
