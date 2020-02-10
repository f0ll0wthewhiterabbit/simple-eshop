import styled from 'styled-components'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import SchoolIcon from '@material-ui/icons/School'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'

export const Wrapper = styled.div`
  background: #b0bcc2;
  overflow: hidden;
  padding: 10px 45px;
`

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const InfoItem = styled.li`
  width: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    justify-content: flex-start;
  }

  &:last-child {
    justify-content: flex-end;
  }
`

export const InfoText = styled.p`
  line-height: 1;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  margin: 0;
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`

export const ShippingIcon = styled(LocalShippingIcon)`
  color: #fff;
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 13px;
  }
`

export const StudentIcon = styled(SchoolIcon)`
  color: #fff;
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 13px;
  }
`

export const MoneyIcon = styled(MoneyOffIcon)`
  color: #fff;
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 8px;
  }
`
