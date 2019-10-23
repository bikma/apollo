import { GET_USERS, SUBSCRIBE } from '../../queries'
import Paper, { PaperProps } from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Users as UsersType } from '../../__generated__/types'
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
  const [phone, setPhone] = React.useState('')
  const [mutate, { error }] = useMutation<any>(SUBSCRIBE, {
    onCompleted({ subscribe }) {
      setOpen(false)
    },
    onError(error) {
      setOpen(false)
    },
    update(cache, { data: { subscribe } }) {
      let users = cache.readQuery<UsersType>({ query: GET_USERS })
      cache.writeQuery({
        data: {
          users:
            users && users.users ? users.users.concat([subscribe]) : [subscribe]
        },
        query: GET_USERS
      })
    }
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <div style={{ float: 'right' }}>
      <Button
        variant="outlined"
        data-testid="subscribe-here"
        color="primary"
        onClick={handleClickOpen}
      >
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
            To subscribe to this website, please enter your phone number here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Phone Number"
            fullWidth
            data-testid="phone"
            onChange={event => {
              setPhone(event.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate({ variables: { phone } })
            }}
            color="primary"
            disabled={!phone || phone.length === 0}
            data-testid="subscribe"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
