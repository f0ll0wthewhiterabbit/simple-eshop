import { connect } from 'react-redux'

import ProductCard from './component'
import { changeProductRating } from '../../../../../store/actions/products'

const mapStateToProps = state => ({
  currentUserId: state.users.current.id,
})

const mapDispatchToProps = dispatch => ({
  changeProductRating: productData => dispatch(changeProductRating(productData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard)
