const getDataFromStorage = fieldName => {
  const data = localStorage.getItem(fieldName)

  return JSON.parse(data)
}

export default getDataFromStorage
