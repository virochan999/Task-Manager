import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : initialValue

  const [value, setValue] = useState<T>(initial)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
  }

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
