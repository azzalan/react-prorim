import axios from 'axios'
import { apiUrl } from './urls'
import { get } from './api_calls'

export const getValueDotPath = (dotPath, data) => {
  try {
    if (dotPath) return dotPath.split('.').reduce((o, i) => o[i], data)
  } catch (err) {
    return null
  }
}

const setValueDotArray = (dotArray, position, data, value) => {
  if (dotArray.length - 1 === position) data[dotArray[position]] = value
  else {
    if (!data[dotArray[position]]) data[dotArray[position]] = {}
    setValueDotArray(dotArray, position + 1, data[dotArray[position]], value)
  }
}

export const setValueDotPath = (dotPath, data, value) => {
  const dotArray = dotPath.split('.')
  if (!data) data = {}
  try {
    setValueDotArray(dotArray, 0, data, value)
  } catch (error) {}
}

const deleteDotArray = (dotArray, position, data) => {
  if (dotArray.length - 1 === position) {
    data[dotArray[position]] = undefined
  } else {
    if (!data[dotArray[position]]) return null
    setValueDotArray(dotArray, position + 1, data[dotArray[position]])
  }
}

export const deleteDotPath = (dotPath, data) => {
  const dotArray = dotPath.split('.')
  if (!data) return null
  deleteDotArray(dotArray, 0, data)
}

const cleanDotArray = (dotArray, position, data) => {
  if (dotArray.length - 1 === position) {
    delete data[dotArray[position]]
  } else {
    if (!data[dotArray[position]]) return null
    cleanDotArray(dotArray, position + 1, data[dotArray[position]])
  }
}

export const cleanDotPath = (dotPath, data) => {
  const dotArray = dotPath.split('.')
  if (!data) return null
  cleanDotArray(dotArray, 0, data)
}

export const addFiles = (formData, fields) => {
  let hasFormData = false
  fields.forEach((field) => {
    if (field.type === 'file') {
      let file = document.getElementById(field.accessor).files[0]
      if (file) {
        hasFormData = true
        formData.append(field.accessor, file)
      }
    }
  })
  return hasFormData
}

const defaultCatch = (error) => alert(error)

export const postData = (
  url,
  data,
  handleResponse = null,
  catchFunction = defaultCatch
) => {
  data['csrfmiddlewaretoken'] = '{{ csrf_token }}'
  axios.post(url, data).then(
    handleResponse
  ).catch(catchFunction)
}

export const fetchChoicesData = (fields, filterData, saveData) => {
  fields.forEach((field, index) => {
    if (field.fields) fetchChoicesData(field.fields, filterData, saveData)
    else if (field.choicesUrl) {
      const handleResponse = (response) => saveData(field, response.data)
      get(apiUrl + field.choicesUrl, handleResponse, filterData)
    }
  })
}

// Cópia sem referência
export const copyObject = (obj) => (JSON.parse(JSON.stringify(obj)))

export const moveArrayElement = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0])
}

// Pega objetos de data e seta seu id como valor, guandando o resto das
// infomações em 'key' + '_data'
export const fixObjectsForSave = (originalData) => {
  let data = copyObject(originalData)
  for (let field in data) {
    if (data[field]) {
      if (data[field].id) {
        data[field + '_data'] = data[field]
        data[field] = data[field].id
      }
    }
  }
  return data
}
