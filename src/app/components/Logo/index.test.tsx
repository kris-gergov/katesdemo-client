import { render } from '@testing-library/react';
import logo from 'assets/images/logo.svg';
import Logo from './';

describe('Logo', () => {
  it('should contain the correct alt value', () => {
    render(<Logo />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.alt).toContain('Kate');
  });

  it('should contain the correct src value', () => {
    render(<Logo />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.src).toContain(logo);
  });
});
