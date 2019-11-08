import React from 'react'
import { Button } from '@material-ui/core'

import Wrapper from './styles'

const ProductsToolbar = () => {
  return (
    <Wrapper>
      <Button color="primary" variant="contained">
        Add product
      </Button>
    </Wrapper>
  )
}

export default ProductsToolbar
