import { connect } from 'react-redux'

import ProductAddPage from './component'

const mapStateToProps = state => ({
  isLoading: state.getIn(['products', 'isLoading']),
})

export default connect(mapStateToProps)(ProductAddPage)
