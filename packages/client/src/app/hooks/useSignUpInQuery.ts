import { useMutation, useQueryClient } from '@tanstack/react-query';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import ky, { HTTPError } from 'ky';
import { Dispatch } from 'react';
import { useCookies } from 'react-cookie';

import { SignUpInAction } from '@/components/signUpIn/signUpInReducer';
import { appConfig } from '@/lib/config';
import { JWT_AUTH_NAME, MILLISECONDS_IN_SECOND, QUERY_KEY } from '@/lib/constants';
import { StrapiRegisteredUser } from '@/lib/types';

export type UserFromAuth = { jwt: string; user: StrapiRegisteredUser };

type SignUpInQuery = {
  path: string;
  json:
    | {
        identifier: string;
        password: string;
      }
    | {
        username: string;
        email: string;
        password: string;
      };
  dispatch: Dispatch<SignUpInAction>;
};
const signUpInFetch = async ({ path, json, dispatch }: SignUpInQuery) => {
  try {
    const { jwt, user } = (await ky.post(appConfig.apiURL + path, { json }).json()) as UserFromAuth;
    if (dispatch) dispatch({ type: 'success' });
    return { jwt, user };
  } catch (error) {
    if (error instanceof HTTPError && error.name === 'HTTPError') {
      const res = await error.response.json();
      throw new Error(res.error.message);
    }
  }
};

export const useSignUpInQuery = () => {
  const [, setCookie] = useCookies([JWT_AUTH_NAME]);
  const queryClient = useQueryClient();

  const {
    data: signUpInResponse,
    isSuccess: signUpInSuccessful,
    failureReason: signUpInFailure,
    mutate: signUpInUserMutate,
    error: signUpInUserError,
  } = useMutation({
    mutationFn: (query: SignUpInQuery) => signUpInFetch(query),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      const jwt = data!.jwt;
      const decoded: JwtPayload = jwtDecode(jwt);

      if (decoded.exp)
        setCookie(JWT_AUTH_NAME, jwt, {
          expires: new Date(decoded.exp * MILLISECONDS_IN_SECOND),
        });
      else setCookie(JWT_AUTH_NAME, jwt);
    },
  });

  return {
    signUpInResponse,
    signUpInUserMutate,
    signUpInSuccessful,
    signUpInUserError,
    signUpInFailure,
  };
};
