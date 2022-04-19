import { render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from '../../../src/Context';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter, emptyState } from '../../../utils/test-utils';
import LogIn from '../../../pages/login';
import Service from '../../../src/Service';

const authUrl = Service.getAuthUrl();

describe('Log in page', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  it('Renders content and redirects to authUrl generated with .env.local variables', async () => {
    const mockedRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockedRouter}>
        <ContextProvider values={emptyState}>
          <LogIn />
        </ContextProvider>
      </RouterContext.Provider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Log in'
    });
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    expect(heading).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    userEvent.click(signInButton);
    await waitFor(() => expect(mockedRouter.push).toHaveBeenNthCalledWith(1, authUrl));
  });
});
