import { SignUpInPanel } from "@/components/Auth/SignUpInPanel"
import { GrabAWord } from "@/components/GrabAWord"
import Words from "@/components/Words"

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 justify-between p-24">
      <Words />
      <GrabAWord />
      <SignUpInPanel />
    </main>
  )
}
