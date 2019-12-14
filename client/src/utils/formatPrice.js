const formatPrice = price => {
  const USDFormatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'USD',
  })

  return USDFormatter.format(price)
}

export default formatPrice
