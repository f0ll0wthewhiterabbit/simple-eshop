import { connect } from 'react-redux'

import ProductCard from './component'
import { changeProductRatingRequest, deleteProductRatingRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  ratingsLoadingList: state.getIn(['products', 'ratingsLoadingList']),
  ratingsErrorList: state.getIn(['products', 'ratingsErrorList']),
})

const mapDispatchToProps = {
  changeProductRatingRequest: productData => changeProductRatingRequest(productData),
  deleteProductRatingRequest: productId => deleteProductRatingRequest(productId),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
