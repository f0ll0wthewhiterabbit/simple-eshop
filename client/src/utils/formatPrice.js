const formatPrice = price => {
  const USDFormatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 1000 ? 2 : 0,
  })

  return USDFormatter.format(price)
}

export default formatPrice
