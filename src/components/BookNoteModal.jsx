import { useEffect, useState } from 'react'

function BookNoteModal({ book, isOpen, onClose, onSave }) {
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setNote(book?.note || '')
  }, [book, isOpen])

  if (!isOpen || !book) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(note.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">阅读笔记</h2>
          <p className="mt-1 text-sm text-slate-600">
            为《{book.title}》记录你的观点、摘录或阅读心得。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={10}
            className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
            placeholder="写下你对这本书的感想..."
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">当前 {note.trim().length} 字</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-300/50 transition hover:bg-indigo-500"
              >
                保存笔记
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookNoteModal
