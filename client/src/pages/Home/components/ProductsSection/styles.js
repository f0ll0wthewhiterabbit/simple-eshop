import styled from 'styled-components'
import { Typography, Container, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Wrapper = styled(Container)`
  text-align: center;
  padding-bottom: 90px;
`

export const Heading = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 50px;
  margin-top: 80px;

  span {
    color: #aebcc1;
  }

  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 42px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    font-size: 52px;
    margin-top: 0;
  }
`

export const ImageWrapper = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;
  text-align: center;

  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
`

export const ProductHeading = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #727272;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 500;
  margin-bottom: 15px;
`

export const ProductPrice = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
`

export const ProductsWrapper = styled(Grid)`
  position: relative;
  margin-bottom: 40px;
`

export const ProductsLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-weight: 700;
  display: inline-block;
  font-size: 14px;
  padding: 16px 40px;
  border: 2px solid #d0d7db;
  border-radius: 50px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1e1e1e;
  }
`

export const ErrorMessage = styled(Typography)`
  width: 100%;
`
