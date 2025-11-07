interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-black mb-3 gradient-text">
        {title}
      </h1>
      <p className="text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  )
}
