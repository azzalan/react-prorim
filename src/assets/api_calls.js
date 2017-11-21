import axios from 'axios'
import { store } from '../index'
import shortid from 'shortid'

import { selectAlertOpen, selectAlertMessages, selectLastPost } from '../actions/index'
import selectSnackbarMessage from '../actions/snackbarMessage'

import { loading, sending, sendingFile, deleting, editing } from './strings'

export const defaultCatch = (error) => {
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

export const openSnackbar = (message) => {
  const id = shortid.generate()
  const snackbar = {...store.getState().snackbarMessage}
  const created = new Date()
  snackbar[id] = { message, created }
  store.dispatch(selectSnackbarMessage(snackbar))
  return id
}

export const closeSnackbar = (id) => {
  const snackbar = {...store.getState().snackbarMessage}
  delete snackbar[id]
  store.dispatch(selectSnackbarMessage(snackbar))
}

export const del = (
  url,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  const snackbar = openSnackbar(deleting)
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.delete(url, config).then((response) => {
    closeSnackbar(snackbar)
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar(snackbar)
    catchFunction(error)
  })
}

export const putFiles = (
  url,
  formData,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  const snackbar = openSnackbar(sendingFile)
  let token = store.getState().authToken
  token = token !== null ? 'Token ' + token : undefined
  const headers = {
    'content-type': 'multipart/form-data',
    'Authorization': token
  }
  const config = { headers }
  axios.put(url, formData, config).then((response) => {
    closeSnackbar(snackbar)
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar(snackbar)
    catchFunction(error)
  })
}

export const post = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  const thisPost = JSON.stringify({url, data})
  if (thisPost === store.getState().lastPost) {
    console.log('Entrada duplicada ignorada.')
    return null
  }
  store.dispatch(selectLastPost(thisPost))
  const snackbar = openSnackbar(sending)
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.post(url, data, config).then((response) => {
    closeSnackbar(snackbar)
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar(snackbar)
    catchFunction(error)
  })
}

export const patch = (
  url,
  data,
  thenFunction = () => {},
  catchFunction = defaultCatch
) => {
  const snackbar = openSnackbar(editing)
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { headers }
  axios.patch(url, data, config).then((response) => {
    closeSnackbar(snackbar)
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar(snackbar)
    catchFunction(error)
  })
}

export const get = (
  url,
  thenFunction = () => {},
  params = undefined,
  catchFunction = defaultCatch
) => {
  const snackbar = openSnackbar(loading)
  const token = store.getState().authToken
  const headers = token ? { 'Authorization': 'Token ' + token } : undefined
  const config = { params, headers }
  axios.get(url, config).then((response) => {
    closeSnackbar(snackbar)
    thenFunction(response)
  }).catch((error) => {
    closeSnackbar(snackbar)
    catchFunction(error)
  })
}
