import { hasSupabaseEnv, supabase } from '../lib/supabaseClient'

const TABLE_NAME = 'books'

const getSupabase = () => {
  if (!hasSupabaseEnv || !supabase) {
    throw new Error(
      'Missing Supabase env vars. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel/Local env settings.',
    )
  }

  return supabase
}

const toClientBook = (record) => ({
  id: record.id,
  title: record.title,
  author: record.author,
  coverImage: record.cover_image || '',
  status: record.status,
  note: record.note || '',
  createdAt: record.created_at,
  updatedAt: record.updated_at,
})

const toDbPayload = (bookInput) => ({
  title: bookInput.title,
  author: bookInput.author,
  cover_image: bookInput.coverImage || null,
  status: bookInput.status,
  note: bookInput.note || null,
})

export async function fetchBooks() {
  const db = getSupabase()
  const { data, error } = await db
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data.map(toClientBook)
}

export async function createBook(bookInput) {
  const db = getSupabase()
  const { data, error } = await db
    .from(TABLE_NAME)
    .insert(toDbPayload(bookInput))
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return toClientBook(data)
}

export async function updateBook(bookId, bookInput) {
  const db = getSupabase()
  const { data, error } = await db
    .from(TABLE_NAME)
    .update({
      ...toDbPayload(bookInput),
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookId)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return toClientBook(data)
}

export async function updateBookStatus(bookId, status) {
  const db = getSupabase()
  const { data, error } = await db
    .from(TABLE_NAME)
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookId)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return toClientBook(data)
}

export async function updateBookNote(bookId, note) {
  const db = getSupabase()
  const { data, error } = await db
    .from(TABLE_NAME)
    .update({
      note: note || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookId)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return toClientBook(data)
}

export async function deleteBook(bookId) {
  const db = getSupabase()
  const { error } = await db.from(TABLE_NAME).delete().eq('id', bookId)

  if (error) {
    throw error
  }
}
