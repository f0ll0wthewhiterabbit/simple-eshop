import { Record, Seq } from 'immutable'

const convertToRecord = data => {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  if (Array.isArray(data)) {
    return Seq(data)
      .map(convertToRecord)
      .toList()
  }

  const ObjectToRecord = Record(data)

  return new ObjectToRecord(Seq(data).map(convertToRecord))
}

export default convertToRecord
