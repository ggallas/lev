import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages';
import { ContextProvider } from '../../src/Context';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter, emptyState, stateWithUser } from '../../utils/test-utils';

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  it('Renders user name and redirects to /playing if authenticated', async () => {
    const mockedRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockedRouter}>
        <ContextProvider values={stateWithUser}>
          <Home />
        </ContextProvider>
      </RouterContext.Provider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Welcome Gonzalo Gallastegui!'
    });

    const getStartedButton = screen.getByRole('button', { name: 'Get started!' });

    expect(heading).toBeInTheDocument();

    expect(getStartedButton).toBeInTheDocument();
    userEvent.click(getStartedButton);
    await waitFor(() => expect(mockedRouter.push).toHaveBeenNthCalledWith(1, '/playing'));
  });

  it('Get Started button redirects to /login if not authenticated', async () => {
    const mockedRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockedRouter}>
        <ContextProvider values={emptyState}>
          <Home />
        </ContextProvider>
      </RouterContext.Provider>
    );

    const getStartedButton = screen.getByRole('button', { name: 'Get started!' });

    expect(getStartedButton).toBeInTheDocument();
    userEvent.click(getStartedButton);
    await waitFor(() => expect(mockedRouter.push).toHaveBeenNthCalledWith(1, '/login'));
  });
});
