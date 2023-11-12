"use client"
import { useEffect, useState } from 'react';
import FormSurfaceWithTitle from '../FormSurface'
import { getWorkhorseWords } from './fetchWorkhorseWords';
import { useCookies } from 'react-cookie';
import { JWT_AUTH_NAME } from '@/lib/constants';
import WorkhorseWordsListItem from './WorkhorseWordsListItem';

const WorkhorseWordsList = () => {
  const [cookies] = useCookies([JWT_AUTH_NAME]);
  const [words, setWords] = useState<string[]>();
  useEffect(() => {
    const fetchWords = async () => { 
      const data = await getWorkhorseWords(cookies.jwt_authentication)
      // @todo: more robust checking
      setWords(data as string[])
    }
    fetchWords()
  }, [cookies.jwt_authentication]);
  return (
    <FormSurfaceWithTitle title="Workhorse Words">
      <ul>
      {words && words.map((word) => <WorkhorseWordsListItem key={word} word={word} />)}
      </ul>
    </FormSurfaceWithTitle>
  )
}

export default WorkhorseWordsList
