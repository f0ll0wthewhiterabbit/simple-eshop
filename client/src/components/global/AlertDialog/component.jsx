import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ErrorIcon from '@material-ui/icons/Error'

import { DialogContainer } from './styles'

const AlertDialog = ({ isModalOpened, title, children, closeModal, confirmMethod }) => {
  const handleConfirmButton = () => {
    confirmMethod()
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
  confirmMethod: () => {},
}

AlertDialog.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
  confirmMethod: PropTypes.func,
}

export default AlertDialog
