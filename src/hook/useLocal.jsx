import { useEffect, useState } from "react";

export default function useLocal(key, initialData) {
  const [data, setData] = useState(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    return existingData !== null ? existingData : initialData;
  });

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData === null) {
      localStorage.setItem(key, JSON.stringify(initialData));
    } else if (existingData !== data) {
      setData(existingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLocalStorage = (newData) => {
    const valueToStore =
      typeof newData === "function" ? newData(data) : newData;
    localStorage.setItem(key, JSON.stringify(valueToStore));
    setData(valueToStore);
  };

  return [data, updateLocalStorage];
}
