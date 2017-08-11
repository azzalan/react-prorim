import axios from 'axios'
import { store } from '../index'

import { selectAlertOpen, selectAlertMessages } from '../actions/index'
import selectSnackbarOpen from '../actions/snackbarOpen'
import selectSnackbarMessage from '../actions/snackbarMessage'

import { loading, sending, sendingFile, deleting, editing } from './strings'

const closeSnackbar = () => {
  store.dispatch(selectSnackbarOpen(false))
  store.dispatch(selectSnackbarMessage(null))
}

const defaultCatch = (error) => {
  let alertMessages = store.getState().alertMessages || []
  if (error.response) {
    if (error.response.data) {
      if (typeof error.response.data === 'object') {
        const messages = error.response.data
        for (let index in messages) {
          alertMessages.push(messages[index])
        }
        store.dispatch(selectAlertMessages([...alertMessages]))
        store.dispatch(selectAlertOpen(true))
      }
    }
  }
}

export const del = (
  url,
  thenFunction = () => {},
  catchFunction = (error) => alert(error)
) => {
  store.dispatch(selectSnackbarMessage(deleting))
  store.dispatch(selectSnackbarOpen(true))
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.delete(url, config).then((response) => {
    closeSnackbar()
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar()
    catchFunction(error)
  })
}

export const putFiles = (
  url,
  formData,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  store.dispatch(selectSnackbarMessage(sendingFile))
  store.dispatch(selectSnackbarOpen(true))
  let token = store.getState().authToken
  token = token ? { 'Authorization': 'Token ' + token } : undefined
  const headers = {
    'content-type': 'multipart/form-data',
    'Authorization': token
  }
  console.log(formData)
  const config = { headers }
  axios.put(url, formData, config).then((response) => {
    closeSnackbar()
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar()
    catchFunction(error)
  })
}

export const post = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  store.dispatch(selectSnackbarMessage(sending))
  store.dispatch(selectSnackbarOpen(true))
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.post(url, data, config).then((response) => {
    closeSnackbar()
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar()
    catchFunction(error)
  })
}

export const patch = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  store.dispatch(selectSnackbarMessage(editing))
  store.dispatch(selectSnackbarOpen(true))
  // store.dispatch(selectAlertOpen(true))
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.patch(url, data, config).then((response) => {
    closeSnackbar()
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar()
    catchFunction(error)
  })
}

export const get = (
  url,
  thenFunction = (response) => console.log(response),
  params = undefined,
  catchFunction = defaultCatch
) => {
  store.dispatch(selectSnackbarMessage(loading))
  store.dispatch(selectSnackbarOpen(true))
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { params, headers }
  axios.get(url, config).then((response) => {
    closeSnackbar()
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar()
    catchFunction(error)
  })
}
