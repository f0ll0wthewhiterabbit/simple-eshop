import { connect } from 'react-redux'

import FilterSelect from './component'
import { fetchProductsRequest, setProductsFilter } from '../../../../store/actions'
import { FIELDS } from '../../../../constants'

const mapStateToProps = state => ({
  filter: state.getIn(['products', 'filter']),
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, queryParams) => fetchProductsRequest(page, queryParams),
  setProductsFilter: filter => setProductsFilter(filter),
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelect)
