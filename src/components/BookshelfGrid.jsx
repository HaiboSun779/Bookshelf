import BookCard from './BookCard'

function EmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
      <h2 className="text-lg font-semibold text-slate-900">书架还是空的</h2>
      <p className="mt-2 text-sm text-slate-600">
        点击上方“添加书籍”，开始创建你的第一本阅读记录。
      </p>
    </section>
  )
}

function LoadingState() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-10 text-center">
      <h2 className="text-lg font-semibold text-slate-900">正在加载书架...</h2>
      <p className="mt-2 text-sm text-slate-600">请稍候，正在从云端同步你的书籍数据。</p>
    </section>
  )
}

function BookshelfGrid({ books, isLoading, onDeleteBook, onEditBook, onOpenNote, onToggleStatus }) {
  if (isLoading) {
    return <LoadingState />
  }

  if (!books.length) {
    return <EmptyState />
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={() => onDeleteBook(book.id)}
          onEdit={() => onEditBook(book)}
          onOpenNote={() => onOpenNote(book)}
          onToggleStatus={() => onToggleStatus(book.id)}
        />
      ))}
    </section>
  )
}

export default BookshelfGrid
