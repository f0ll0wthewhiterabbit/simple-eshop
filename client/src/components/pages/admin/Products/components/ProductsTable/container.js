import { connect } from 'react-redux'

import ProductsTable from './component'
import { setSelectedProducts } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  productsList: state.getIn(['products', 'data']),
  selectedProducts: state.getIn(['products', 'selected']),
})

const mapDispatchToProps = dispatch => ({
  setSelectedProducts: selectedProductsList => dispatch(setSelectedProducts(selectedProductsList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)
