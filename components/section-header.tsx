type Props = { title: string; subtitle?: string; id?: string }
export function SectionHeader({ title, subtitle, id }: Props) {
  return (
    <div id={id} className="space-y-2">
      <h2 className="text-2xl md:text-3xl font-semibold text-pretty">{title}</h2>
      {subtitle ? <p className="text-muted-foreground max-w-prose">{subtitle}</p> : null}
    </div>
  )
}
