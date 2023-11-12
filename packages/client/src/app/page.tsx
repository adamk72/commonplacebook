import { GrabAWord } from "@/components/GrabAWord"
import { SignUpInPanel } from "@/components/signUpIn/SignUpInPanel"
import Words from "@/components/Words"
import WorkhorseWordsList from '@/components/workhorseWordsList/WorkhorseWordsList'

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 justify-between p-24">
      <Words />
      <GrabAWord />
      <SignUpInPanel />
      <WorkhorseWordsList />
    </main>
  )
}
