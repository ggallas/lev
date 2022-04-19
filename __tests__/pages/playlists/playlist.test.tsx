import { render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from '../../../src/Context/';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter, stateWithPlaylist } from '../../../utils/test-utils';
import PlaylistDetail from '../../../pages/playlists/[name]';

describe('Playing page', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  it('Renders content and removes songs individually and all', async () => {
    const mockedRouter = createMockRouter({ query: { name: 'Nueva' } });
    render(
      <RouterContext.Provider value={mockedRouter}>
        <ContextProvider values={stateWithPlaylist}>
          <PlaylistDetail />
        </ContextProvider>
      </RouterContext.Provider>
    );

    expect(screen.getByRole('heading', { name: 'Edit your playlist' })).toBeInTheDocument();

    const song = screen.getByText('Song name: The Fourth Star - Mixed');
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    const removeSong = removeButtons[1];
    const removeAll = screen.getByRole('button', { name: 'Remove all songs' });

    expect(song).toBeInTheDocument();
    expect(removeSong).toBeInTheDocument();
    expect(removeAll).toBeInTheDocument();

    userEvent.click(removeSong);
    await waitFor(() => expect(song).not.toBeInTheDocument());

    userEvent.click(removeAll);
    await waitFor(() => screen.getByText('You have no songs in this playlist'));
  });
});
