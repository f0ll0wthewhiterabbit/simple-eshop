import { connect } from 'react-redux'

import ProductsTable from './component'
import { setSelectedProducts } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  productsList: state.products.data,
  selectedProducts: state.products.selected,
})

const mapDispatchToProps = dispatch => ({
  setSelectedProducts: selectedProductsList => dispatch(setSelectedProducts(selectedProductsList)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable)
