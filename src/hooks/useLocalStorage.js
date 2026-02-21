import { useEffect, useState } from 'react'

const isValidJson = (value) => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

const matchesInitialShape = (parsedValue, initialValue) => {
  if (Array.isArray(initialValue)) {
    return Array.isArray(parsedValue)
  }

  if (initialValue && typeof initialValue === 'object') {
    return parsedValue && typeof parsedValue === 'object' && !Array.isArray(parsedValue)
  }

  return true
}

export function useLocalStorage(key, initialValue) {
  const readStorage = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item || !isValidJson(item)) {
        return initialValue
      }
      const parsedValue = JSON.parse(item)
      if (!matchesInitialShape(parsedValue, initialValue)) {
        return initialValue
      }
      return parsedValue
    } catch {
      // Safari file:// may block localStorage.
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(() => {
    return readStorage()
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Ignore write failures in restricted environments.
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
