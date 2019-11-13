import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { ADMIN_PRODUCT_ADD_PAGE_PATH } from '../../../../../../constants'
import Wrapper from './styles'

const ProductsToolbar = () => {
  return (
    <Wrapper>
      <Button component={Link} to={ADMIN_PRODUCT_ADD_PAGE_PATH} color="primary" variant="contained">
        Add product
      </Button>
    </Wrapper>
  )
}

export default ProductsToolbar
