import Link from "next/link"

type EmptyStateProps = {
    title: string
    description: string
    actionLabel?: string
    actionHref?: string
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
}: EmptyStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-400/10 text-xl">
                ✦
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                {description}
            </p>

            {actionLabel && actionHref ? (
                <Link href={actionHref} className="btn-primary mt-6">
                {actionLabel}
                </Link>
            ) : null}
        </div>
    )
}