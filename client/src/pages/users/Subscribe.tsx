import Paper, { PaperProps } from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import React from 'react'
import { SUBSCRIBE } from '../../queries'
import TextField from '@material-ui/core/TextField'
import { useMutation } from '@apollo/react-hooks'

function PaperComponent(props: PaperProps) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export default function Add() {
  const [open, setOpen] = React.useState(false)
  const [mutate, { loading, error }] = useMutation<any>(SUBSCRIBE, {
    onCompleted({ subscribe }) {
      setOpen(false)
    },
    onError(error) {
      setOpen(false)
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  // if (data) return <p>subscribed!</p>
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Subscribe
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: 'move' }} id="form-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            data-testid="email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => mutate({ variables: { phone: '1234567890' } })}
            color="primary"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
