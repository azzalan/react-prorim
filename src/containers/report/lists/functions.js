import React from 'react'

export const perc = (x, y) => {
  const perc = parseFloat(x * 100 / y).toFixed(2) + '%'
  if (y) return perc
  else return '0%'
}

export const printArray = (array, total, prefix = null) => {
  const returnArray = []
  array.forEach((element, index) => {
    const spanCount = (
      <span key={'c' + index}> {element.count} ({perc(element.count, total)})</span>
    )
    returnArray.push(spanCount)
    if (prefix) {
      const spanPrefix = (<span key={'p' + index}> {prefix}</span>)
      returnArray.push(spanPrefix)
    }
    const spanNome = (
      <span key={'n' + index}> "{element.nome}"</span>
    )
    returnArray.push(spanNome)
    if (index === array.length - 1) {
      const ponto = (<span key={'.' + index}>.</span>)
      returnArray.push(ponto)
    } else {
      const virgula = (<span key={'.' + index}>,</span>)
      returnArray.push(virgula)
    }
  })
  return returnArray
}
