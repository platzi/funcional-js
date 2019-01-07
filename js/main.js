const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const attrsToString = (obj = {}) =>
  Object.keys(obj)
    .map(attr => `${attr}="${obj[attr]}"`)
    .join(' ')

const tagAttrs = obj => (content = '') =>
  `<${obj.tag}${obj.attrs ? ' ' :	 ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => typeof t === 'string' ? tagAttrs({ tag: t }) : tagAttrs(t)

const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')

let description = $('#description')
let calories = $('#calories')
let carbs = $('#carbs')
let protein = $('#protein')

let list = []

description.keypress(() => {
  description.removeClass('is-invalid')
})

calories.keypress(() => {
  calories.removeClass('is-invalid')
})

carbs.keypress(() => {
  carbs.removeClass('is-invalid')
})

protein.keypress(() => {
  protein.removeClass('is-invalid')
})

const validateInputs = () => {

  description.val() ? '' : description.addClass('is-invalid')
  calories.val() ? '' : calories.addClass('is-invalid')
  carbs.val() ? '' : carbs.addClass('is-invalid')
  protein.val() ? '' : protein.addClass('is-invalid')

  if(
    description.val() &&
    calories.val() &&
    carbs.val() &&
    protein.val()
  ) add()
}

const add = () => {
  const newItem = {
    description: description.val(),
    calories: parseInt(calories.val()),
    carbs: parseInt(carbs.val()),
    protein: parseInt(protein.val())
  }

  list.push(newItem)
  updateTotals()
  cleanInputs()
  renderItems()
}

const removeItem = (index) => {
  list.splice(index, 1)

  updateTotals()
  renderItems()
}

const updateTotals = () => {
  let calories = 0, carbs = 0, protein = 0

  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })

  $('#totalCalories').text(calories)
  $('#totalCarbs').text(carbs)
  $('#totalProtein').text(protein)
}

const cleanInputs = () => {
  description.val('')
  calories.val('')
  carbs.val('')
  protein.val('')
}

const renderItems = () => {
  $('tbody').empty()

  list.map((item, index) => {

    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)

    $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.protein, removeButton]))
  })
}
