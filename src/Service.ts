const authorizationUrl = 'https://accounts.spotify.com/authorize';
const tokenUrl = 'https://accounts.spotify.com/api/token';
const baseUrl = 'https://api.spotify.com/v1';
const authRedirect = 'http://localhost:3000/token';
const scope = 'user-read-currently-playing';
const response_type = 'code';
const grant_type = 'authorization_code';

const getAuthUrl = () => {
  const queryParams = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
    redirect_uri: authRedirect,
    scope,
    response_type
  }).toString();
  return `${authorizationUrl}?${queryParams}`;
};

// TODO: refresh token - store refresh token in browser and use it to get new accessToken or try closure
const getToken = async (code: string) => {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: grant_type,
      code: code,
      redirect_uri: authRedirect
    })
  });
  const json = await response.json();
  return json;
};

const getCurrent = async (token: string | null) => {
  const response = await fetch(`${baseUrl}/me/player/currently-playing`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  return;
};

const getProfile = async (token: string | null) => {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  return;
};

const Service = {
  getAuthUrl,
  getToken,
  getCurrent,
  getProfile
};

export default Service;
