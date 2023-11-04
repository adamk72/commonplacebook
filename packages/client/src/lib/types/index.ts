import { Dispatch, ReactNode } from 'react';

import { FreeDictionaryWord } from '@/lib/types/freeDictionaryWord';

type WordExternal = {
  source: 'custom' | 'freeDictionary' | 'other';
  word: FreeDictionaryWord;
};

type WordUsage = {
  example: string[];
  popularity: number;
  status: WordStatus;
};

type WordStatus = 'approved' | 'proposed' | 'declined';
type WordRelevance =
  | 'archaic'
  | 'simple' // most would fall here...
  | 'articulate' // to be replace with this as desired
  | 'fictional'
  | 'cliche'
  | 'dated'
  | 'unfashionable'
  | 'jargon';

type WordReplacement = {
  word: string;
  popularity: number;
  status: WordStatus;
  relevance: WordRelevance;
};

export type Word = {
  word: string;
  usage: WordUsage[];
  relevance: WordRelevance;
  replaces: WordReplacement[];
  external: WordExternal | undefined;
};

export type StrapiRegisteredUser = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string;
  id: number;
  provider: string;
  updatedAt: Date;
  username: string;
};

export type DispatchProps<A, S> = {
  dispatch: Dispatch<A>;
  state: S;
};

export type ReactChildren = { children: ReactNode };
