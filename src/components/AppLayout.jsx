import Navbar from './Navbar'

function AppLayout({ children, stats, onAddBook }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Navbar stats={stats} onAddBook={onAddBook} />
      <main className="mt-8 space-y-6">{children}</main>
    </div>
  )
}

export default AppLayout
