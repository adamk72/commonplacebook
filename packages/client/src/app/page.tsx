"use client"
import GetUserDict from '@/components/GetUserDict'
import { GrabAWord } from "@/components/GrabAWord"
import { SignUpInPanel } from "@/components/signUpIn/SignUpInPanel"
import Words from "@/components/Words"
import WorkhorseWordsList from '@/components/workhorseWordsList/WorkhorseWordsList'
import { appConfig } from '@/lib/config'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: appConfig.apiURL,
  cache: new InMemoryCache(),
});



export default function Home() {
  return (
        <ApolloProvider client={client}>
    <main className="flex flex-col items-center gap-8 justify-between p-24">
      {/* <Words />
      <GrabAWord />
      <SignUpInPanel />
      <WorkhorseWordsList /> */}
      <GetUserDict/>
    </main>
        </ApolloProvider>
  )
}
