import { connect } from 'react-redux'

import ProductRatingTable from './component'
import { setProductsPerPage, fetchProductRating } from '../../../../../store/actions'
import { FIELD_THEME_DARK } from '../../../../../constants'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  isDarkTheme: state.getIn(['app', 'theme']) === FIELD_THEME_DARK,
})

const mapDispatchToProps = {
  setProductsPerPage: selectedProductsList => setProductsPerPage(selectedProductsList),
  fetchProductRating: (productId, page, itemsPerPage) =>
    fetchProductRating(productId, page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingTable)
