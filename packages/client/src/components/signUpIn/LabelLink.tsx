const LabelLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <a
      href={href}
      className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
    >
      {text}
    </a>
  )
}
export default LabelLink
