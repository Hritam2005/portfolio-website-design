"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { SocialIcons } from "@/components/social-icons"
import { BackToTop } from "@/components/back-to-top"
import { SectionHeader } from "@/components/section-header"
import { Mail, MapPin } from "lucide-react"

export default function PortfolioPage() {
  // Contact form state
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | "ok" | "error">(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    try {
      setSubmitting(true)
      setSent(null)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      setSent(json?.ok ? "ok" : "error")
      if (json?.ok) form.reset()
    } catch {
      setSent("error")
    } finally {
      setSubmitting(false)
    }
  }

  // Portfolio content from the prompt
  const name = "Hritam Das"
  const status = "3rd-year B.Tech student in Computer Science & Engineering (AI & ML specialization)"
  const institution = "MCKV INSTITUTE OF ENGINEERING"
  const passions = ["software development", "AI/ML", "open-source contribution"]
  const projects = [
    {
      name: "To-do List",
      desc: "A simple yet effective to-do list with CRUD operations and local storage.",
      href: "https://github.com/Hritam2005/SCT_WD_004",
      tags: ["html", "css", "js"],
    },
    {
      name: "Stopwatch",
      desc: "Accurate stopwatch with lap support and keyboard shortcuts.",
      href: "https://github.com/Hritam2005/SCT_WD_002",
      tags: ["js"],
    },
    {
      name: "Tic-Tac-Toe",
      desc: "Classic game with win detection and responsive UI.",
      href: "https://github.com/Hritam2005/SCT_WD_003",
      tags: ["html", "css", "js"],
    },
  ]
  const experience: Array<{ role: string; org: string; time: string; bullets?: string[] }> = [
    {
      role: "Aspiring Developer",
      org: "Open-source & Personal Projects",
      time: "2024 — Present",
      bullets: ["Building foundational projects", "Learning modern web tooling"],
    },
  ]
  const achievements: string[] = ["Completed multiple foundational projects in web development"]
  const skills = ["html", "css", "js", "react", "typescript", "nodejs", "nextjs"]
  const email = "hritamdas19@gmail.com"
  const github = "https://github.com/Hritam2005"
  const linkedin = "https://www.linkedin.com/in/hritam-das-7234b0356/"
  const hobbies = ["content creation", "photography"]

  return (
    <main className="min-h-screen">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link href="#home" className="font-semibold">
            {name}
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#about" label="About" />
            <NavLink href="#skills" label="Skills" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#achievements" label="Achievements" />
            <NavLink href="#contact" label="Contact" />
          </nav>
          <div className="flex items-center gap-2">
            <SocialIcons github={github} linkedin={linkedin} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero / Intro */}
      <section id="home" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 grid md:grid-cols-2 items-center gap-8">
          <div className="space-y-4">
            <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
              Available for opportunities
            </Badge>
            <h1 className="text-3xl md:text-5xl font-semibold text-balance">Hi, I’m {name}.</h1>
            <p className="text-muted-foreground leading-relaxed">
              {status} at {institution}. I’m passionate about {passions.slice(0, -1).join(", ")} and{" "}
              {passions.slice(-1)}.
            </p>
            <div className="flex items-center gap-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`mailto:${email}`}>Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="Hritam.jpg"
              alt="Portrait illustration"
              width={320}
              height={320}
              className="rounded-xl border"
              priority
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader
            title="About Me"
            subtitle="Curious, disciplined, and focused on building practical, user-friendly products."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-6 leading-relaxed">
                I’m a developer focused on modern web technologies. I enjoy turning ideas into clean, functional
                interfaces while learning best practices around performance and accessibility. Outside of coding, I
                enjoy {hobbies.join(" and ")}.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={email} href={`mailto:${email}`} />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Institution" value={institution} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader title="Skills" subtitle="A solid foundation across the modern web stack." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((s) => (
              <Card key={s} className="transition-transform hover:-translate-y-1">
                <CardContent className="p-4 flex items-center justify-center">
                  <span className="font-medium capitalize">{s}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader title="Projects" subtitle="Highlights of what I’ve built and shipped." />
          <p className="text-sm text-muted-foreground">
            For viewing the project{" "}
            <Link
              href="https://github.com/Hritam2005?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
            >
              click here
            </Link>
            .
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.name} className="group transition-transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span>{p.name}</span>
                    <div className="flex gap-1">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs capitalize">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src="/project-screenshot-ui.png"
                    width={320}
                    height={160}
                    alt={`${p.name} screenshot`}
                    className="w-full rounded-md border"
                  />
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="flex justify-between">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href={p.href}>Open</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="#contact">Discuss</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader
            title="Experience"
            subtitle="Hands-on learning through projects, open-source, and collaboration."
          />
          <div className="grid gap-4">
            {experience.map((e) => (
              <Card key={e.role + e.time}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{e.role}</h3>
                      <p className="text-sm text-muted-foreground">{e.org}</p>
                    </div>
                    <span className="text-sm text-blue-600 dark:text-blue-400">{e.time}</span>
                  </div>
                  {e.bullets?.length ? (
                    <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader title="Achievements" subtitle="Recognitions and milestones." />
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <Card key={i} className="transition-transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <p>{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
          <SectionHeader title="Contact" subtitle="Have an opportunity or feedback? Let’s talk." />
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="How can I help?" required rows={5} />
                  </div>
                  <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                  {sent === "ok" && (
                    <p className="text-sm text-teal-600 dark:text-teal-400">Thanks! I’ll get back to you soon.</p>
                  )}
                  {sent === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium">Other ways to reach me</h3>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <Link href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </Link>
                </div>
                <SocialIcons github={github} linkedin={linkedin} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground flex items-center justify-between">
          <p>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#home" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      <BackToTop />
      <style jsx global>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground">
      {label}
    </a>
  )
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        {href ? (
          <Link className="hover:underline" href={href}>
            {value}
          </Link>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  )
}
