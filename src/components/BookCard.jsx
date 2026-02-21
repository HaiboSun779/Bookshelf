import { BOOK_STATUS_MAP } from '../constants/bookStatus'

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=800&q=80'

function BookCard({ book, onDelete, onEdit, onToggleStatus }) {
  const statusMeta = BOOK_STATUS_MAP[book.status]
  const coverImage = book.coverImage || FALLBACK_COVER

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/40">
      <div className="h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={coverImage}
          alt={`${book.title} 封面`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_COVER
          }}
        />
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{book.title}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusMeta.color}`}>
              {statusMeta.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{book.author}</p>
        </div>

        {book.note ? <p className="line-clamp-2 text-sm text-slate-500">{book.note}</p> : null}

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onToggleStatus}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
          >
            切换状态
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            编辑
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
          >
            删除
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookCard
