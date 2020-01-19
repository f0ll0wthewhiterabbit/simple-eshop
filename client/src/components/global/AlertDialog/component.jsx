import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ErrorIcon from '@material-ui/icons/Error'

import {
  STORE_FIELD_PRODUCTS,
  STORE_FIELD_USERS,
  STORE_FIELD_CURRENT_USER,
} from '../../../constants'
import { DialogContainer } from './styles'

const AlertDialog = ({
  isModalOpened,
  title,
  children,
  closeModal,
  storeFieldName,
  deleteUsers,
  deleteProducts,
  requestUserDeletion,
}) => {
  const handleConfirmButton = () => {
    switch (storeFieldName) {
      case STORE_FIELD_PRODUCTS:
        deleteProducts()
        break

      case STORE_FIELD_USERS:
        deleteUsers()
        break

      case STORE_FIELD_CURRENT_USER:
        requestUserDeletion()
        break

      default:
        break
    }
  }

  return (
    <DialogContainer
      open={isModalOpened}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-test="dialogContainer"
    >
      <DialogTitle id="alert-dialog-title" data-test="dialogTitle">
        {title}
      </DialogTitle>
      {children && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description" data-test="dialogContentText">
            {children}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={closeModal} color="primary" variant="outlined" data-test="cancelButton">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmButton}
          color="secondary"
          variant="contained"
          startIcon={<ErrorIcon />}
          autoFocus
          data-test="confirmButton"
        >
          Confirm
        </Button>
      </DialogActions>
    </DialogContainer>
  )
}

AlertDialog.defaultProps = {
  children: '',
}

AlertDialog.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closeModal: PropTypes.func.isRequired,
  storeFieldName: PropTypes.string.isRequired,
  deleteUsers: PropTypes.func.isRequired,
  deleteProducts: PropTypes.func.isRequired,
  requestUserDeletion: PropTypes.func.isRequired,
}

export default AlertDialog
