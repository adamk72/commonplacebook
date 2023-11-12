'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import { useCookies } from 'react-cookie';

import { appConfig } from '@/lib/config';
import { JWT_AUTH_NAME, QUERY_KEY } from '@/lib/constants';
import { StrapiRegisteredUser } from '@/lib/types';

const fetchMe = async (jwt: string) => {
  try {
    const user = (await ky
      .get(appConfig.apiURL + '/api/users/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .json()) as StrapiRegisteredUser;
    return { jwt, user };
  } catch (error) {
    if (error instanceof HTTPError && error.name === 'HTTPError') {
      const res = await error.response.json();
      throw new Error(res.error.message);
    }
  }
};


export const useUserAuth = () => {
  const [cookies, , removeCookie] = useCookies([JWT_AUTH_NAME]);
  const queryClient = useQueryClient();

  const signOutUser = () => {
    removeCookie(JWT_AUTH_NAME);
    queryClient.invalidateQueries();
    queryClient.removeQueries();
  };

  const { isSuccess, data } = useQuery({
    enabled: cookies.jwt_authentication != null,
    queryKey: [QUERY_KEY.user],
    queryFn: () => fetchMe(cookies[JWT_AUTH_NAME]),
  });

  return { isSuccess, data, signOutUser };
};
