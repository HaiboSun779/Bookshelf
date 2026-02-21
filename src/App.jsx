import { useMemo, useState } from 'react'
import AddBookModal from './components/AddBookModal'
import AppLayout from './components/AppLayout'
import BookshelfGrid from './components/BookshelfGrid'
import FilterBar from './components/FilterBar'
import { FILTER_OPTIONS, SORT_OPTIONS, STATUS_SEQUENCE } from './constants/bookStatus'
import { useLocalStorage } from './hooks/useLocalStorage'

const STORAGE_KEY = 'smart-bookshelf-data'

function App() {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, [])
  const booksList = Array.isArray(books) ? books : []
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('newest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

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

  const handleSaveBook = (bookInput) => {
    if (editingBook) {
      setBooks((currentBooks) => {
        const safeBooks = Array.isArray(currentBooks) ? currentBooks : []
        return safeBooks.map((book) => {
          if (book.id !== editingBook.id) {
            return book
          }

          return {
            ...book,
            ...bookInput,
            updatedAt: new Date().toISOString(),
          }
        })
      })
      closeModal()
      return
    }

    const now = new Date().toISOString()
    const newBook = {
      ...bookInput,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    setBooks((currentBooks) => {
      const safeBooks = Array.isArray(currentBooks) ? currentBooks : []
      return [newBook, ...safeBooks]
    })
    closeModal()
  }

  const handleDeleteBook = (bookId) => {
    setBooks((currentBooks) => {
      const safeBooks = Array.isArray(currentBooks) ? currentBooks : []
      return safeBooks.filter((book) => book.id !== bookId)
    })
  }

  const handleQuickToggleStatus = (bookId) => {
    setBooks((currentBooks) => {
      const safeBooks = Array.isArray(currentBooks) ? currentBooks : []
      return safeBooks.map((book) => {
        if (book.id !== bookId) {
          return book
        }

        const currentIndex = STATUS_SEQUENCE.indexOf(book.status)
        const nextStatus = STATUS_SEQUENCE[(currentIndex + 1) % STATUS_SEQUENCE.length]

        return {
          ...book,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        }
      })
    })
  }

  return (
    <AppLayout stats={stats} onAddBook={openCreateModal}>
      <FilterBar
        activeFilter={activeFilter}
        activeSort={activeSort}
        filterOptions={FILTER_OPTIONS}
        sortOptions={SORT_OPTIONS}
        onChangeFilter={setActiveFilter}
        onChangeSort={setActiveSort}
      />
      <BookshelfGrid
        books={filteredAndSortedBooks}
        onDeleteBook={handleDeleteBook}
        onEditBook={openEditModal}
        onToggleStatus={handleQuickToggleStatus}
      />
      <AddBookModal
        isOpen={isModalOpen}
        book={editingBook}
        onClose={closeModal}
        onSave={handleSaveBook}
      />
    </AppLayout>
  )
}

export default App
