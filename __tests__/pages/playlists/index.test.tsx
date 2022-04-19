import { render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from '../../../src/Context';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter, stateWithPlaylist } from '../../../utils/test-utils';
import Playlists from '../../../pages/playlists';

describe('Playing page', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  it('Renders content and removes lists individually and all', async () => {
    const mockedRouter = createMockRouter({});
    render(
      <RouterContext.Provider value={mockedRouter}>
        <ContextProvider values={stateWithPlaylist}>
          <Playlists />
        </ContextProvider>
      </RouterContext.Provider>
    );

    expect(screen.getByRole('heading', { name: 'Manage your playlists' })).toBeInTheDocument();

    const playlist = screen.getByRole('link', { name: 'Nueva' });
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    const removePlaylist = removeButtons[0];
    const removeAll = screen.getByRole('button', { name: 'Delete all playlists' });

    expect(playlist).toBeInTheDocument();
    expect(playlist).toHaveAttribute('href', '/playlists/Nueva');
    expect(removePlaylist).toBeInTheDocument();
    expect(removeAll).toBeInTheDocument();

    userEvent.click(removePlaylist);
    await waitFor(() => expect(playlist).not.toBeInTheDocument());

    userEvent.click(removeAll);
    await waitFor(() => screen.getByText('You have no playlists'));
  });
});
