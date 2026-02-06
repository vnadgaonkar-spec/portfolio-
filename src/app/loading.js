export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-6">
      <div className="mx-auto max-w-6xl py-10">
        {/* top bar / nav */}
        <div className="h-10 w-full rounded-xl bg-black/5 animate-pulse" />

        {/* hero */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="h-14 w-3/4 rounded-xl bg-black/5 animate-pulse" />
            <div className="mt-4 h-14 w-2/3 rounded-xl bg-black/5 animate-pulse" />
            <div className="mt-6 h-4 w-5/6 rounded bg-black/5 animate-pulse" />
            <div className="mt-3 h-4 w-4/6 rounded bg-black/5 animate-pulse" />
            <div className="mt-8 flex gap-3">
              <div className="h-11 w-36 rounded-full bg-black/5 animate-pulse" />
              <div className="h-11 w-36 rounded-full bg-black/5 animate-pulse" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-[360px] rounded-2xl bg-black/5 animate-pulse sm:row-span-2" />
            <div className="h-[170px] rounded-2xl bg-black/5 animate-pulse" />
            <div className="h-[170px] rounded-2xl bg-black/5 animate-pulse" />
          </div>
        </div>

        {/* sections */}
        <div className="mt-14 h-8 w-52 rounded bg-black/5 animate-pulse" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-black/5 animate-pulse" />
          <div className="h-64 rounded-2xl bg-black/5 animate-pulse" />
          <div className="h-64 rounded-2xl bg-black/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
