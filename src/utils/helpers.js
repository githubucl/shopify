export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
    }).format(price / 100)
}


export const getUniqueValues = () => { }
