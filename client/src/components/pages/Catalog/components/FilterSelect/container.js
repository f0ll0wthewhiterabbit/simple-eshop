import { connect } from 'react-redux'

import FilterSelect from './component'
import { fetchProducts, setProductsFilter } from '../../../../../store/actions'

const mapStateToProps = state => ({
  filter: state.getIn(['products', 'filter']),
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage, filter) => fetchProducts(page, itemsPerPage, filter),
  setProductsFilter: filter => setProductsFilter(filter),
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelect)
