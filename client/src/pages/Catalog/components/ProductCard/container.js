import { connect } from 'react-redux'

import ProductCard from './component'
import { changeProductRating, deleteProductRating } from '../../../../store/actions'

const mapStateToProps = state => ({
  ratingsLoadingList: state.getIn(['products', 'ratingsLoadingList']),
  ratingsErrorList: state.getIn(['products', 'ratingsErrorList']),
})

const mapDispatchToProps = {
  changeProductRating: productData => changeProductRating(productData),
  deleteProductRating: productId => deleteProductRating(productId),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
