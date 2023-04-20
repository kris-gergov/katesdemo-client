import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { SidebarContext, SidebarProvider } from './SidebarContext';

describe('<SidebarProvider />', () => {
  const TestComponent = ({ opened }: { opened: boolean }) => {
    const { toggleSidebar, sidebarToggle, closeSidebar } =
      useContext(SidebarContext);

    if (opened && !sidebarToggle && toggleSidebar) toggleSidebar();

    return (
      <div>
        {sidebarToggle ? <div>Opened</div> : <div>Closed</div>}
        <button onClick={toggleSidebar}>Toggle</button>
        <button onClick={closeSidebar}>Close</button>
      </div>
    );
  };

  it('receives the appropriate value and toggles correctly', async () => {
    render(
      <SidebarProvider>
        <TestComponent opened={false} />
      </SidebarProvider>,
    );

    expect(screen.getByText('Closed')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

    await waitFor(() => {
      expect(screen.getByText('Opened')).toBeInTheDocument();
    });
  });
});
