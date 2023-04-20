import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import SidebarMenuItem from './item';
import { SidebarContext } from 'app/contexts/SidebarContext';

describe('SidebarMenuItem', () => {
  const user = userEvent.setup();
  const closeSidebar = jest.fn();

  interface TestProps {
    name: string;
    link: string;
    icon: () => JSX.Element;
    active: boolean;
    badge: string;
    badgeTooltip: string;
    mobile: boolean;
    opened: boolean;
  }

  const testProps: TestProps = {
    name: 'Test',
    link: '/',
    icon: () => <div>Icon</div>,
    active: true,
    badge: 'test',
    badgeTooltip: 'test',
    mobile: false,
    opened: true,
  };

  const testComponent = (overrideProps?: TestProps) => {
    if (overrideProps)
      return (
        <BrowserRouter>
          <SidebarContext.Provider
            value={{ closeSidebar, sidebarToggle: true }}
          >
            <SidebarMenuItem {...testProps} {...overrideProps} />
          </SidebarContext.Provider>
        </BrowserRouter>
      );

    return (
      <BrowserRouter>
        <SidebarContext.Provider value={{ closeSidebar, sidebarToggle: true }}>
          <SidebarMenuItem {...testProps} />
        </SidebarContext.Provider>
      </BrowserRouter>
    );
  };

  it('should render the name', () => {
    render(testComponent());
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render the icon', () => {
    render(testComponent());
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('should render the link', () => {
    render(testComponent());
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render the active class', () => {
    render(testComponent());
    expect(screen.getByRole('link')).toHaveClass('Mui-active');
  });

  it('should call the close sidebar function on click', async () => {
    render(testComponent());

    user.click(screen.getByRole('link'));

    await waitFor(() => expect(closeSidebar).toHaveBeenCalledTimes(1));
  });
});
