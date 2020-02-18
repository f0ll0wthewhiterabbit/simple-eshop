import styled from 'styled-components'
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined'
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined'
import MoneyOffOutlinedIcon from '@material-ui/icons/MoneyOffOutlined'

export const Wrapper = styled.div`
  overflow: hidden;
  padding: 10px 45px;
  background-color: ${props => props.theme.colors.accent};
  transition: background-color 0.3s ease-out;
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
  color: ${props => props.theme.colors.font.contrast};
  font-weight: 500;
  margin: 0;
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`

export const ShippingIcon = styled(LocalShippingOutlinedIcon)`
  color: ${props => props.theme.colors.font.contrast};
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 13px;
  }
`

export const StudentIcon = styled(SchoolOutlinedIcon)`
  color: ${props => props.theme.colors.font.contrast};
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 13px;
  }
`

export const MoneyIcon = styled(MoneyOffOutlinedIcon)`
  color: ${props => props.theme.colors.font.contrast};
  margin-right: 0;
  font-size: 2rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-right: 8px;
  }
`
