import { connect } from 'react-redux'

import ProductCard from './component'
import { changeProductRating, deleteProductRating } from '../../../../../store/actions'

const mapStateToProps = state => ({
  ratingsLoadingList: state.getIn(['products', 'ratingsLoadingList']),
  ratingsErrorList: state.getIn(['products', 'ratingsErrorList']),
})

const mapDispatchToProps = dispatch => ({
  changeProductRating: productData => dispatch(changeProductRating(productData)),
  deleteProductRating: productId => dispatch(deleteProductRating(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
