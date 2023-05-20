type ProductPlanDataProps = {
  isTakafulBazarPick: boolean
  insurancePolicyImage: string
  policyName: string
  policyType: string
  premiumRate: Number
  policyPrice: Number
  policyDiscountedPrice: Number
  policyPercentOff: Number
  coverage: CoverageProps
}

type CoverageProps = {
  MainCoverage: any
  ThirdPartyCoverage: any
  ValueAddedFeatures: any
}

const ProductPlanData: ProductPlanDataProps = {
  isTakafulBazarPick: false,
  insurancePolicyImage: '',
  policyName: '',
  policyType: '',
  premiumRate: 10,
  policyPrice: 10,
  policyDiscountedPrice: 8,
  policyPercentOff: 1.2,
  coverage: {
    MainCoverage: {},
    ThirdPartyCoverage: {},
    ValueAddedFeatures: {},
  },
}
const genrateRandomData = () => {
  const productData: ProductPlanDataProps[] = []
  const price = [1000, 2000, 30000]
  const discountedPrice = [800, 1800, 29000]
  for (let i = 0; i < 3; i += 1) {
    const temp = JSON.parse(JSON.stringify(ProductPlanData)) as ProductPlanDataProps
    temp.policyPrice = price[i] as Number
    temp.policyDiscountedPrice = discountedPrice[i] as Number
    productData.push(temp)
  }
  return ProductPlanData
}

export default { genrateRandomData }
