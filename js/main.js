const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

let description = $('#description')
let calories = $('#calories')
let carbs = $('#carbs')
let protein = $('#protein')
