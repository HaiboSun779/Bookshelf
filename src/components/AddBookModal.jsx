import { useEffect, useMemo, useState } from 'react'
import { FILTER_OPTIONS } from '../constants/bookStatus'

const EMPTY_FORM = {
  title: '',
  author: '',
  coverImage: '',
  status: 'reading',
  note: '',
}

function AddBookModal({ isOpen, book, onClose, onSave }) {
  const [formData, setFormData] = useState(EMPTY_FORM)

  const statusOptions = useMemo(() => FILTER_OPTIONS.filter((item) => item.value !== 'all'), [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (!book) {
      setFormData(EMPTY_FORM)
      return
    }

    setFormData({
      title: book.title,
      author: book.author,
      coverImage: book.coverImage || '',
      status: book.status,
      note: book.note || '',
    })
  }, [book, isOpen])

  if (!isOpen) {
    return null
  }

  const handleFieldChange = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  const handleUploadCover = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleFieldChange('coverImage', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      title: formData.title.trim(),
      author: formData.author.trim(),
      coverImage: formData.coverImage.trim(),
      status: formData.status,
      note: formData.note.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{book ? '编辑书籍' : '添加书籍'}</h2>
            <p className="mt-1 text-sm text-slate-600">维护你的阅读列表信息，支持 URL 或本地上传封面。</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-slate-200"
          >
            关闭
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm text-slate-700">
              <span className="font-medium">书名 *</span>
              <input
                required
                value={formData.title}
                onChange={(event) => handleFieldChange('title', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                placeholder="例如：《思考，快与慢》"
              />
            </label>
            <label className="space-y-1.5 text-sm text-slate-700">
              <span className="font-medium">作者 *</span>
              <input
                required
                value={formData.author}
                onChange={(event) => handleFieldChange('author', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                placeholder="例如：Daniel Kahneman"
              />
            </label>
          </div>

          <label className="space-y-1.5 text-sm text-slate-700">
            <span className="font-medium">封面图片 URL</span>
            <input
              value={formData.coverImage}
              onChange={(event) => handleFieldChange('coverImage', event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              placeholder="https://..."
            />
          </label>

          <label className="space-y-1.5 text-sm text-slate-700">
            <span className="font-medium">或上传封面</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadCover}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-100 file:px-3 file:py-1.5 file:text-indigo-700"
            />
          </label>

          <label className="space-y-1.5 text-sm text-slate-700">
            <span className="font-medium">阅读状态</span>
            <select
              value={formData.status}
              onChange={(event) => handleFieldChange('status', event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5 text-sm text-slate-700">
            <span className="font-medium">备注（可选）</span>
            <textarea
              value={formData.note}
              onChange={(event) => handleFieldChange('note', event.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              placeholder="记录你对这本书的看法..."
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
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
              {book ? '保存修改' : '确认添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookModal
