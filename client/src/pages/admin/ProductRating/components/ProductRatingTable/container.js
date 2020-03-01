import { connect } from 'react-redux'

import ProductRatingTable from './component'
import { setProductsPerPage, fetchProductRatingRequest } from '../../../../../store/actions'
import { FIELDS } from '../../../../../constants'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

const mapDispatchToProps = {
  setProductsPerPage: selectedProductsList => setProductsPerPage(selectedProductsList),
  fetchProductRatingRequest: (productId, page, itemsPerPage) =>
    fetchProductRatingRequest(productId, page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingTable)
