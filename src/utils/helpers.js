export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
    }).format(price / 100)
}


export const getUniqueValues = (products, type) => {
    let unique = products.map((product) => {
        return product[type]
    })
    if (type === 'colors') {
        unique = unique.flat()
    }
    return ['All', ...new Set(unique)]
}
