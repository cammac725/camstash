import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/books'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newObject) => {

  const res = await axios.post(baseUrl, newObject)
  return res.data
}

const remove = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`)
  return req.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export { getAll, create, remove, update };

