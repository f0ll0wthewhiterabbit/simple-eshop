import { connect } from 'react-redux'

import ProductRatingTable from './component'
import { setProductsPerPage, fetchProductRating } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
})

const mapDispatchToProps = dispatch => ({
  setProductsPerPage: selectedProductsList => dispatch(setProductsPerPage(selectedProductsList)),
  fetchProductRating: (productId, page, itemsPerPage) =>
    dispatch(fetchProductRating(productId, page, itemsPerPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingTable)
