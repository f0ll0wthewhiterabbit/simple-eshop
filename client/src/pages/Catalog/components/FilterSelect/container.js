import { connect } from 'react-redux'

import FilterSelect from './component'
import { fetchProducts, setProductsFilter } from '../../../../store/actions'
import { FIELD_THEME_DARK } from '../../../../constants'

const mapStateToProps = state => ({
  filter: state.getIn(['products', 'filter']),
  isDarkTheme: state.getIn(['app', 'theme']) === FIELD_THEME_DARK,
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage, searchText, filter) =>
    fetchProducts(page, itemsPerPage, searchText, filter),
  setProductsFilter: filter => setProductsFilter(filter),
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelect)
