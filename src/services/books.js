import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/books'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = await axios.delete(`${baseUrl}/${id}`, config)
  return req.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export { getAll, create, remove, update, setToken };

