const currencyFormat = (value: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return formatter.format(value).replace('PKR', '')
}

// const currencyFormat = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default currencyFormat
