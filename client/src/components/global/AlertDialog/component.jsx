import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const AlertDialog = ({
  isModalOpened,
  title,
  children,
  closeModal,
  storeFieldName,
  deleteItems,
}) => {
  const handleConfirmButton = () => {
    deleteItems(storeFieldName)
  }

  return (
    <Dialog
      open={isModalOpened}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {children && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmButton} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closeModal: PropTypes.func.isRequired,
  storeFieldName: PropTypes.string,
  deleteItems: PropTypes.func.isRequired,
}

export default AlertDialog
