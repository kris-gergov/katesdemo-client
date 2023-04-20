import Header from 'app/components/Header';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  const title = 'Test header';

  it('should display the correct title', () => {
    render(<Header showImportExport={false} title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  it('should display the correct button', () => {
    const buttonLink = '/test-button';
    const buttonText = 'Test button';

    render(
      <BrowserRouter>
        <Header
          showImportExport={false}
          title={title}
          createButtonLink={buttonLink}
          createButtonText={buttonText}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(buttonText)).toBeDefined();
  });
});
