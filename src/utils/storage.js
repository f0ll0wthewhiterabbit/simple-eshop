export const getDataFromStorage = fieldName => {
  const data = localStorage.getItem(fieldName)

  return JSON.parse(data)
}

export const updateStorageData = (fieldName, data) => {
  localStorage.removeItem(fieldName)
  localStorage.setItem(fieldName, JSON.stringify(data))
}
