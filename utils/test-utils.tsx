import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router
  };
}

export const stateWithUser = {
  auth: { token: '', userId: '', userName: 'Gonzalo Gallastegui' },
  playlists: [],
  credentials: { clientId: '', clientSecret: '' }
};

export const stateWithPlaylist = {
  auth: { token: '', userId: '', userName: 'Gonzalo Gallastegui' },
  playlists: [
    {
      name: 'Nueva',
      songs: [
        {
          name: 'Lost Multiverse (Markus Schulz In Search Of Sunrise Rework) - Mixed',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '7LdHeaiBpk97JFVxVJnDW6'
        },
        {
          name: 'The Fourth Star - Mixed',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '5GtF1a3Tumlt3MDubiYVIL'
        }
      ]
    }
  ],
  credentials: { clientId: '', clientSecret: '' }
};

export const emptyState = {
  auth: { token: '', userId: '', userName: '' },
  playlists: [],
  credentials: { clientId: '', clientSecret: '' }
};

export const filledState = {
  auth: {
    token:
      'BQASgcNGOZPKniNnI7tUPUlrRFX5d0tTcFZrtSryFPgQbUPD3F9xioo_-erej4sr8fJK4MEd8X5Y7pqsDQr-bx8D0fWGbSAE8E7ZoPAvsF4AsiPrEkunsvKsXEDm8gIh-n6myEFOZyLtdO6yCQKMU7UiL4WZiyCTucaZFUiTc6g',
    userId: '21nbqrnb2n54mtrduii7d3fkq',
    userName: 'Gonzalo Gallastegui'
  },
  playlists: [
    {
      name: 'Nueva',
      songs: [
        {
          name: 'Lost Multiverse (Markus Schulz In Search Of Sunrise Rework) - Mixed',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '7LdHeaiBpk97JFVxVJnDW6'
        },
        {
          name: 'The Fourth Star - Mixed',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '5GtF1a3Tumlt3MDubiYVIL'
        },
        {
          name: 'Never Rain Down Again - Myon & Shane54 Dash Up',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/1xT5p0VBpnZDrvVSjX9sri'
              },
              href: 'https://api.spotify.com/v1/artists/1xT5p0VBpnZDrvVSjX9sri',
              id: '1xT5p0VBpnZDrvVSjX9sri',
              name: 'Dash Berlin',
              type: 'artist',
              uri: 'spotify:artist:1xT5p0VBpnZDrvVSjX9sri'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/320fB6pkVQ7vp95y2N9qkC'
              },
              href: 'https://api.spotify.com/v1/artists/320fB6pkVQ7vp95y2N9qkC',
              id: '320fB6pkVQ7vp95y2N9qkC',
              name: 'SERi',
              type: 'artist',
              uri: 'spotify:artist:320fB6pkVQ7vp95y2N9qkC'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/0uXRsluXdi5LtEs8DoFknc'
              },
              href: 'https://api.spotify.com/v1/artists/0uXRsluXdi5LtEs8DoFknc',
              id: '0uXRsluXdi5LtEs8DoFknc',
              name: 'Myon & Shane 54',
              type: 'artist',
              uri: 'spotify:artist:0uXRsluXdi5LtEs8DoFknc'
            }
          ],
          id: '2mL9byXilMbkXZGOo85oje'
        },
        {
          name: 'Far - Fisherman Festival Mix',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/07D2qGlJUOVf83OM5ujJZD'
              },
              href: 'https://api.spotify.com/v1/artists/07D2qGlJUOVf83OM5ujJZD',
              id: '07D2qGlJUOVf83OM5ujJZD',
              name: 'Lachi',
              type: 'artist',
              uri: 'spotify:artist:07D2qGlJUOVf83OM5ujJZD'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/0vykncECxuxH5RqOMt6IIg'
              },
              href: 'https://api.spotify.com/v1/artists/0vykncECxuxH5RqOMt6IIg',
              id: '0vykncECxuxH5RqOMt6IIg',
              name: 'Fisherman',
              type: 'artist',
              uri: 'spotify:artist:0vykncECxuxH5RqOMt6IIg'
            }
          ],
          id: '7tgZ8pexjhabaRusjWEZ3M'
        },
        {
          name: 'Endless Story (Destinations 19)',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/0GeZRE8dyvgduV3KTvLFC3'
              },
              href: 'https://api.spotify.com/v1/artists/0GeZRE8dyvgduV3KTvLFC3',
              id: '0GeZRE8dyvgduV3KTvLFC3',
              name: 'Paula Seling',
              type: 'artist',
              uri: 'spotify:artist:0GeZRE8dyvgduV3KTvLFC3'
            }
          ],
          id: '09zF8refHatlZbbT7uwmAr'
        },
        {
          name: 'Hypnotized - Markus Schulz Remix',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/1yoZuH2j43vVSWsOwYuQyn'
              },
              href: 'https://api.spotify.com/v1/artists/1yoZuH2j43vVSWsOwYuQyn',
              id: '1yoZuH2j43vVSWsOwYuQyn',
              name: 'Ilan Bluestone',
              type: 'artist',
              uri: 'spotify:artist:1yoZuH2j43vVSWsOwYuQyn'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/1t65YxEAtU3iii6bCzSGF8'
              },
              href: 'https://api.spotify.com/v1/artists/1t65YxEAtU3iii6bCzSGF8',
              id: '1t65YxEAtU3iii6bCzSGF8',
              name: 'Emma Hewitt',
              type: 'artist',
              uri: 'spotify:artist:1t65YxEAtU3iii6bCzSGF8'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '7wMRWeyvKI0u83vWbjbhH1'
        },
        {
          name: 'Not Afraid to Fall - The WLT Remix',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/1dbzT291PCwwYJK0l3Tr1n'
              },
              href: 'https://api.spotify.com/v1/artists/1dbzT291PCwwYJK0l3Tr1n',
              id: '1dbzT291PCwwYJK0l3Tr1n',
              name: 'Christina Novelli',
              type: 'artist',
              uri: 'spotify:artist:1dbzT291PCwwYJK0l3Tr1n'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/1L3tLMyqlRhirjgvankj2T'
              },
              href: 'https://api.spotify.com/v1/artists/1L3tLMyqlRhirjgvankj2T',
              id: '1L3tLMyqlRhirjgvankj2T',
              name: 'The WLT',
              type: 'artist',
              uri: 'spotify:artist:1L3tLMyqlRhirjgvankj2T'
            }
          ],
          id: '2nBhcgWwLPx4lf45mRy1fU'
        }
      ]
    },
    {
      name: 'Nueva2',
      songs: [
        {
          name: 'Lost Multiverse (Markus Schulz In Search Of Sunrise Rework) - Mixed',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '7LdHeaiBpk97JFVxVJnDW6'
        }
      ]
    },
    {
      name: 'sinespacios',
      songs: [
        {
          name: 'Love Rain Down',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/320fB6pkVQ7vp95y2N9qkC'
              },
              href: 'https://api.spotify.com/v1/artists/320fB6pkVQ7vp95y2N9qkC',
              id: '320fB6pkVQ7vp95y2N9qkC',
              name: 'SERi',
              type: 'artist',
              uri: 'spotify:artist:320fB6pkVQ7vp95y2N9qkC'
            }
          ],
          id: '5Pn3BnbqT017888UMdB5E2'
        },
        {
          name: 'Empty Streets - Markus Schulz In Search of Sunrise Remix',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6JtFllJR7nhh8fa6oGefSj'
              },
              href: 'https://api.spotify.com/v1/artists/6JtFllJR7nhh8fa6oGefSj',
              id: '6JtFllJR7nhh8fa6oGefSj',
              name: 'Late Night Alumni',
              type: 'artist',
              uri: 'spotify:artist:6JtFllJR7nhh8fa6oGefSj'
            },
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '4Prh707arVCfeg6p6t2pN3'
        }
      ]
    },
    {
      name: 'una lista larga te',
      songs: [
        {
          name: 'Return from the Sand Sea',
          artists: [
            {
              external_urls: {
                spotify: 'https://open.spotify.com/artist/6OO0PboZcIWUWL7j2IyeoL'
              },
              href: 'https://api.spotify.com/v1/artists/6OO0PboZcIWUWL7j2IyeoL',
              id: '6OO0PboZcIWUWL7j2IyeoL',
              name: 'Markus Schulz',
              type: 'artist',
              uri: 'spotify:artist:6OO0PboZcIWUWL7j2IyeoL'
            }
          ],
          id: '5zVvXq9yXpRFPv1yPvUItO'
        }
      ]
    }
  ]
};
