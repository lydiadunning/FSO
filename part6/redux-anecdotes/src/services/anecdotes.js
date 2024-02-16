import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = {content: anecdote, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const incrementVotes = async (id) => {
  const getResponse = await axios.get(baseUrl + '/' + id)

  const existingRecord = getResponse.data
  const changedRecord = { ...existingRecord, votes: existingRecord.votes + 1}
  const response = await axios.put(baseUrl + '/' + id, changedRecord)
  return response.data
}

export default { getAll, createNew, incrementVotes }