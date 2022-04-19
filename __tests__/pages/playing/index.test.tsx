import { render, screen, waitFor } from '@testing-library/react';
import { ContextProvider } from '../../../src/Context';
import userEvent from '@testing-library/user-event';
import { stateWithPlaylist } from '../../../utils/test-utils';
import Playing from '../../../pages/playing';

describe('Playing page', () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });
  it('Renders content and interact with input and select', async () => {
    render(
      <ContextProvider values={stateWithPlaylist}>
        <Playing />
      </ContextProvider>
    );

    expect(screen.getByRole('heading', { name: 'Currently playing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Artist' })).toBeInTheDocument();

    const newPlaylistInput = screen.getByLabelText('new-playlist');
    const addSongSelect = screen.getByLabelText('add-song');
    const newPlaylistSubmitButton = screen.getByRole('button', { name: 'Add song to new playlist' });

    expect(newPlaylistInput).toBeInTheDocument();
    expect(newPlaylistSubmitButton).toBeInTheDocument();
    expect(addSongSelect).toBeInTheDocument();

    userEvent.type(newPlaylistInput, 'Valid playlist name');
    userEvent.click(newPlaylistSubmitButton);
    userEvent.type(newPlaylistInput, 'invalid !!$');
    waitFor(() => expect(newPlaylistSubmitButton).toHaveAttribute('disabled', true));
  });
});
