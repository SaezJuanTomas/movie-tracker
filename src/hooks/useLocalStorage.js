import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue]
}

export function addToList(list, item) {
  if (list.some(existing => existing.id === item.id)) return list
  return [...list, item]
}

export function removeFromList(list, itemId) {
  return list.filter(item => item.id !== itemId)
}

export function isInList(list, itemId) {
  return list.some(item => item.id === itemId)
}
