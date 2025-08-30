import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

type Props = {
  github: string
  linkedin: string
  className?: string
}

export function SocialIcons({ github, linkedin, className }: Props) {
  return (
    <div className={className ?? "flex items-center gap-3"}>
      <Link
        href={github}
        aria-label="Visit GitHub profile"
        className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="h-5 w-5" />
      </Link>
      <Link
        href={linkedin}
        aria-label="Visit LinkedIn profile"
        className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="h-5 w-5" />
      </Link>
    </div>
  )
}
