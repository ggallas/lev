import { GetServerSideProps, NextPage } from 'next';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from '../src/Context';
import Service from '../src/Service';

type TokenPageProps = {
  accessToken?: string;
};

const Token: NextPage<TokenPageProps> = ({ accessToken }) => {
  const { dispatch } = useContext();
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      const getUser = async () => {
        const userResponse = await Service.getProfile(accessToken);
        if (userResponse) {
          console.log(userResponse);
          const authObject = { token: accessToken, userId: userResponse.id, userName: userResponse.display_name };
          dispatch({ type: 'auth', payload: authObject });
        }
      };
      getUser();
      router.push('/playing');
    }
  }, [accessToken, router, dispatch]);

  return null;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    let code: string;
    if (ctx.query && 'code' in ctx.query && typeof ctx.query?.code === 'string') {
      code = ctx.query.code;
      const tokenResponse = await Service.getToken(code);
      const { access_token } = tokenResponse;
      if (access_token) {
        return {
          props: {
            accessToken: access_token
          }
        };
      }
    }
  } catch {
    return { notFound: true };
  }
  return { notFound: true };
};

export default Token;
