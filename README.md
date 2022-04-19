## Getting Started

1. Go to https://developer.spotify.com/dashboard/login, log in and Create an app ([tutorial](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/))

2. Edit your app settings:

   - Webiste: http://localhost:3000
   - Redirect url: add http://localhost:3000/token

3. Create .env.local file on the and set your credentials:
   E.g:

   NEXT_PUBLIC_SPOTIFY_CLIENT_ID = 6a689e50888a404fb9f555166f97434b
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET = cb2681e6aecc46b09cf7711634b3c0bf

4. Run npm install

5. Run npm run build

6. Run npm run dev

7. Go to [http://localhost:3000](http://localhost:3000)

## Functionality:

1. Layout: fixed Navbar with nav items + Log out button. Listens for token from global context, searchs for it in the local storage if it doesn't exist and fires getUser request. If getUser response exists, fetch playlist from local storage, if it exists, set it in the global context.
   If user response is undefined, redirect to login.

2. /home: app information + Get Started button to redirect to login

3. /login: Sign in button initiates Spotify authentication, generates auth Url and pushes.

4. /token: spotify auth redirects to /token (config in step 2). Server side request using the code query params received from Spotify to get auth_token, store it in localStorage and app global state (Context + Reducer) and redirects to /playing if there is an existing token and userId in global context.

5. /playing: Shows the current playing song, if playing any (fetchs from spotify API). Refetchs new song when actual song finishes (if you change on spotify you must refresh browser).
   Create new playlist input + Add song to new playlist button.
   If user already has at least one playlist created, show playlist select + Add song to playlist button.
   Reducer actions for both buttons. If user tries to add a song to a new playlist but playlist exists, it will be added to the existing playlist.
   No playlist/song duplicates.

6. /playlists: gets playlists for logged user from global context and renders a list. List item is a link to playlist detail. Button to remove playlist individually, or to remove all playlists.

7. /playlists/{playlistName}: gets playlists from global store and finds the one that matchs the query params. Renders a list with button to remove individually and a button to remove all.

## Todo

1. Refactor Layout component to class component so it can be an error boundary
2. Improve coverage at least to 90%
3. Add more styling (lot more)
4. Improve readability: E.g: create useLocalStorage hook, extract reducer actions and refactor logic to be more clean.
5. Explore NextJS Middlewares so it's possible to change app persistance to depend on cookies instead of localStorage. This way I could implement a few server side rendered pages (couldn't with actual implementation because it's not easy to handle cookies in getServerSideProps without a external library)
