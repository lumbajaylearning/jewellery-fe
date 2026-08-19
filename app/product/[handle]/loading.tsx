export default function ProductLoading() {
    return <main className="mx-auto w-full max-w-7xl animate-pulse px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="aspect-[4/5] rounded bg-surface lg:col-span-7" />
            <div className="space-y-5 lg:col-span-5"><div className="h-3 w-24 rounded bg-border" /><div className="h-12 w-4/5 rounded bg-border" /><div className="h-4 w-full rounded bg-border" /><div className="h-4 w-3/4 rounded bg-border" /><div className="mt-8 h-14 w-full rounded bg-border" /><div className="h-14 w-full rounded bg-border" /></div>
        </div>
    </main>;
}
