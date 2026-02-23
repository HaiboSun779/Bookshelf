import { useEffect, useMemo, useState } from 'react'
import AddBookModal from './components/AddBookModal'
import AppLayout from './components/AppLayout'
import BookNoteModal from './components/BookNoteModal'
import BookshelfGrid from './components/BookshelfGrid'
import FilterBar from './components/FilterBar'
import { FILTER_OPTIONS, SORT_OPTIONS, STATUS_SEQUENCE } from './constants/bookStatus'
import {
  createBook,
  deleteBook,
  fetchBooks,
  updateBook,
  updateBookNote,
  updateBookStatus,
} from './services/booksService'

function App() {
  const [books, setBooks] = useState([])
  const booksList = Array.isArray(books) ? books : []
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('newest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [noteBook, setNoteBook] = useState(null)

  const stats = useMemo(() => {
    return {
      total: booksList.length,
      reading: booksList.filter((book) => book.status === 'reading').length,
      finished: booksList.filter((book) => book.status === 'finished').length,
      wishlist: booksList.filter((book) => book.status === 'wishlist').length,
    }
  }, [booksList])

  const filteredAndSortedBooks = useMemo(() => {
    const filteredBooks =
      activeFilter === 'all'
        ? booksList
        : booksList.filter((book) => {
            return book.status === activeFilter
          })

    const booksCopy = [...filteredBooks]
    if (activeSort === 'newest') {
      booksCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    if (activeSort === 'oldest') {
      booksCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    if (activeSort === 'title') {
      booksCopy.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'))
    }

    return booksCopy
  }, [activeFilter, activeSort, booksList])

  const loadBooks = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await fetchBooks()
      setBooks(data)
    } catch (error) {
      setErrorMessage(error.message || '加载书籍失败，请稍后重试。')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  const openCreateModal = () => {
    setEditingBook(null)
    setIsModalOpen(true)
  }

  const openEditModal = (book) => {
    setEditingBook(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setEditingBook(null)
    setIsModalOpen(false)
  }

  const handleSaveBook = async (bookInput) => {
    setErrorMessage('')

    if (editingBook) {
      try {
        const savedBook = await updateBook(editingBook.id, bookInput)
        setBooks((currentBooks) =>
          currentBooks.map((book) => (book.id === savedBook.id ? savedBook : book)),
        )
        closeModal()
      } catch (error) {
        setErrorMessage(error.message || '保存失败，请稍后重试。')
      }
      return
    }

    try {
      const newBook = await createBook(bookInput)
      setBooks((currentBooks) => [newBook, ...currentBooks])
      closeModal()
    } catch (error) {
      setErrorMessage(error.message || '新增失败，请稍后重试。')
    }
  }

  const handleDeleteBook = async (bookId) => {
    setErrorMessage('')

    try {
      await deleteBook(bookId)
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId))
    } catch (error) {
      setErrorMessage(error.message || '删除失败，请稍后重试。')
    }
  }

  const handleQuickToggleStatus = async (bookId) => {
    setErrorMessage('')

    const currentBook = booksList.find((book) => book.id === bookId)
    if (!currentBook) {
      return
    }

    const currentIndex = STATUS_SEQUENCE.indexOf(currentBook.status)
    const nextStatus = STATUS_SEQUENCE[(currentIndex + 1) % STATUS_SEQUENCE.length]

    try {
      const updatedBook = await updateBookStatus(bookId, nextStatus)
      setBooks((currentBooks) =>
        currentBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
      )
    } catch (error) {
      setErrorMessage(error.message || '切换状态失败，请稍后重试。')
    }
  }

  const openNoteModal = (book) => {
    setNoteBook(book)
  }

  const closeNoteModal = () => {
    setNoteBook(null)
  }

  const handleSaveNote = async (noteContent) => {
    setErrorMessage('')

    if (!noteBook) {
      return
    }

    try {
      const updatedBook = await updateBookNote(noteBook.id, noteContent)
      setBooks((currentBooks) =>
        currentBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
      )
      closeNoteModal()
    } catch (error) {
      setErrorMessage(error.message || '保存笔记失败，请稍后重试。')
    }
  }

  return (
    <AppLayout stats={stats} onAddBook={openCreateModal}>
      {errorMessage ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </section>
      ) : null}
      <FilterBar
        activeFilter={activeFilter}
        activeSort={activeSort}
        filterOptions={FILTER_OPTIONS}
        sortOptions={SORT_OPTIONS}
        onChangeFilter={setActiveFilter}
        onChangeSort={setActiveSort}
      />
      <BookshelfGrid
        isLoading={isLoading}
        books={filteredAndSortedBooks}
        onDeleteBook={handleDeleteBook}
        onEditBook={openEditModal}
        onOpenNote={openNoteModal}
        onToggleStatus={handleQuickToggleStatus}
      />
      <AddBookModal
        isOpen={isModalOpen}
        book={editingBook}
        onClose={closeModal}
        onSave={handleSaveBook}
      />
      <BookNoteModal
        book={noteBook}
        isOpen={Boolean(noteBook)}
        onClose={closeNoteModal}
        onSave={handleSaveNote}
      />
    </AppLayout>
  )
}

export default App
