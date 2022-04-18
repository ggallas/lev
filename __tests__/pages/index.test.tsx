import { render, screen } from '@testing-library/react';
import Home from '../../pages';
import { ContextProvider } from '../../src/Context';

const mockedProviderValues = {
  auth: { token: '', userId: '', userName: 'Gonzalo Gallastegui' },
  playlists: [],
  credentials: { clientId: '', clientSecret: '' }
};

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <ContextProvider values={mockedProviderValues}>
        <Home />
      </ContextProvider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Welcome Gonzalo Gallastegui!'
    });

    expect(heading).toBeInTheDocument();
  });
});
