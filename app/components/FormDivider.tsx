interface FormDividerProps {
  text: string
}

export function FormDivider({ text }: FormDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border)]"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-[var(--surface)] text-[var(--text-muted)]">
          {text}
        </span>
      </div>
    </div>
  )
}
