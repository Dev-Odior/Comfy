export const formatPrice = (num) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(num / 100)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => {
    return item[type]
  })

  if (type === 'colors') {
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]
}
