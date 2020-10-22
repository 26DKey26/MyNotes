export function routePropResolver (routeOptions) {
  let { query } = routeOptions
  let resultQuery = {}

  Object.keys(query).forEach(key => {

    if (query[key].length && !['0', 'null', 'undefined', 'NaN'].includes(query[key])) {
      resultQuery[key] = query[key]
    }

    if (parseInt(query[key])) {
      resultQuery[key] = +query[key]
    }
  })
  return resultQuery
}

export function isValidLimitQuery (limit) {
  return [20, 30, 40, 50, 100].includes(+limit)
}

export function isValidPageQuery (page) {
  return +page >= 1
}
