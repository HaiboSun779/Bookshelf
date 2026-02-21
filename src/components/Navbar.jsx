function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs font-medium tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function Navbar({ stats, onAddBook }) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Personal Smart Bookshelf</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            个人智能书架
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            用干净现代的方式管理阅读清单，快速查看你的在读、已读和想读内容。
          </p>
        </div>

        <button
          type="button"
          onClick={onAddBook}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-300/50 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          添加书籍
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="总书籍数" value={stats.total} />
        <StatCard label="在读" value={stats.reading} />
        <StatCard label="已读" value={stats.finished} />
        <StatCard label="想读" value={stats.wishlist} />
      </div>
    </header>
  )
}

export default Navbar
