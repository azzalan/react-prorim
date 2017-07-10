import axios from 'axios'
import { store } from '../index'

export const del = (
  url,
  thenFunction = () => {},
  catchFunction = (error) => alert(error)
) => {
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.delete(url, config).then(thenFunction).catch(catchFunction)
}

export const putFiles = (
  url,
  formData,
  thenFunction = () => {},
  catchFunction = (error) => alert(error)
) => {
  let token = store.getState().authToken
  token = token ? { 'Authorization': 'Token ' + token } : undefined
  const headers = {
    'content-type': 'multipart/form-data',
    'Authorization': token
  }
  const config = { headers }
  axios.put(url, formData, config).then(thenFunction).catch(catchFunction)
}

export const post = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = (error) => alert(error)
) => {
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.post(url, data, config).then(thenFunction).catch(catchFunction)
}

export const patch = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = (error) => alert(error)
) => {
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.patch(url, data, config).then(thenFunction).catch(catchFunction)
}

export const get = (
  url,
  thenFunction = (response) => console.log(response),
  params = undefined,
  catchFunction = (error) => alert(error)
) => {
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { params, headers }
  console.log(config)
  axios.get(url, config).then(thenFunction).catch(catchFunction)
}
