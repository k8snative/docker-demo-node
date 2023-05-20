import ProductPlanFilters from '../ProductPlanFilters/ProductPlanFilters'
import styles from './ProductPlanMobileFilters.module.scss'

const filterData = {
  heading: 'Takaful Providers',
  insurances: [
    { name: 'jubilee General' },
    { name: 'Askari Insurance' },
    { name: 'Premier Insurance' },
    { name: 'State Life Insurance' },
    { name: 'jubilee General' },
    { name: 'Askari Insurance' },
    { name: 'Premier Insurance' },
    { name: 'State Life Insurance' },
    { name: 'State Life Insurance' },
  ],
}
const insuranceTypeData = {
  heading: 'Policy Type',
  types: [{ name: 'Comprehensive' }, { name: '3T (Total Loss, Theft & Third Party)' }],
}
const addOnsData = {
  types: [
    {
      name: 'Road Side Assistance',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Tracker',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Zero Dept',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Road Side',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Tracker',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
    {
      name: 'Zero Dept',
      iTxt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.  accumsan et iusto ',
    },
  ],
}

const ProductPlanMobileFilters = ({
  showMobileFilter,
  setShowMobileFilter,
}: {
  showMobileFilter: boolean
  setShowMobileFilter: Function
}) =>
  showMobileFilter ? (
    <div className={` ${styles['wrapper']}`} onClick={() => setShowMobileFilter(!showMobileFilter)}>
      <div className={` ${styles['container']}`}>
        <ProductPlanFilters filterData={filterData} insuranceTypeData={insuranceTypeData} addOnsData={addOnsData} />
      </div>
    </div>
  ) : (
    <></>
  )

export default ProductPlanMobileFilters
