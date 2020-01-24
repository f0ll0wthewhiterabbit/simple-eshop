import { connect } from 'react-redux'

import ProductRatingPage from './component'
import { fetchProductRating } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentProduct: state.getIn(['products', 'currentProduct']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  fetchProductRating: (productId, page, itemsPerPage) =>
    fetchProductRating(productId, page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingPage)
