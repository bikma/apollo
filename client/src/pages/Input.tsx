import React, { useCallback, useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import Notification from './Notification'
import PlayIcon from '@material-ui/icons/PlayArrow'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      position: 'absolute'
      // backgroundColor: 'transparent'
    },
    input: {
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center'
    }
  })
)

interface InputProps {
  selected: string
}

export const PREDICT = gql`
  mutation predict($file: String!, $endpoint: String!) {
    predict(file: $file, endpoint: $endpoint) {
      id
    }
  }
`

const InputImg: React.FC<InputProps> = props => {
  const classes = useStyles()
  const [endpoint, setEndpoint] = useState()
  const [mutate, { loading, error }] = useMutation<any>(PREDICT, {
    onError(error) {
      console.error(error)
    },
    update(cache, { data: { predict } }) {
      console.error(predict)
    }
  })
  const onSubmit = useCallback(() => {
    mutate({ variables: { file: props.selected, endpoint } })
  }, [endpoint, mutate, props.selected])
  return (
    <div className={classes.input}>
      {props.selected && (
        <React.Fragment>
          <TextField
            id="filled-ep-input"
            label="Endpoint"
            name="endpoint"
            variant="filled"
            margin="dense"
            fullWidth
            required
            InputProps={{
              disableUnderline: true
            }}
            style={{
              width: '60%',
              position: 'absolute',
              top: 2
            }}
            onChange={e => setEndpoint(e.target.value)}
          />
          <img
            style={{ height: '40%', width: '40%' }}
            src={'http://0.0.0.0:8080/' + props.selected}
            alt={props.selected}
          />
          <Tooltip
            title={
              endpoint
                ? 'Start prediction'
                : 'Enter endpoint to start predection'
            }
            aria-label="predict"
          >
            <span className={classes.fab}>
              <Fab
                aria-label="play"
                disabled={endpoint ? false : true}
                onClick={onSubmit}
              >
                <PlayIcon />
              </Fab>
            </span>
          </Tooltip>
          {loading && <CircularProgress size={68} className={classes.fab} />}
          {error && <Notification variant={'error'} message={error.message} />}
        </React.Fragment>
      )}
    </div>
  )
}

export default InputImg
