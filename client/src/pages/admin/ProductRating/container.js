import { connect } from 'react-redux'

import ProductRatingPage from './component'
import { fetchProductRatingRequest } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentProduct: state.getIn(['products', 'currentProduct']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  fetchProductRatingRequest: (productId, page, itemsPerPage) =>
    fetchProductRatingRequest(productId, page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRatingPage)
