import { connect } from 'react-redux'

import ProductAddPage from './component'

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
})

export default connect(mapStateToProps)(ProductAddPage)
