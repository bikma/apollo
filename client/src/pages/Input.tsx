import React, { useCallback, useState } from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Notification from "./Notification"
import ObjectDetection from "./imageDetection"
import Table from "./Table"
import TextField from "@material-ui/core/TextField"
import Tooltip from "@material-ui/core/Tooltip"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      alignItems: "center",
      display: "flex",
      height: "80vh",
      marginTop: "15vh",
      flexDirection: "column"
    },
    button: {
      marginTop: "4vh",
      minWidth: "100%",
      borderRadius: 0
    },
    progress: {
      color: "white",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -12
    }
  })
)

interface InputProps {
  selected: string
}

export const PREDICT = gql`
  mutation predict($file: String!, $endpoint: String!) {
    predict(file: $file, endpoint: $endpoint) {
      type
      image
      data {
        percentage
        color
        match
      }
    }
  }
`

const InputImg: React.FC<InputProps> = props => {
  const classes = useStyles()
  const [endpoint, setEndpoint] = useState()
  const [mutate, { loading, error, data }] = useMutation<any>(PREDICT)
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
              width: "60%",
              position: "absolute",
              top: "2vh"
            }}
            onChange={e => setEndpoint(e.target.value)}
          />
          <img
            style={{ height: "40%", width: "40%" }}
            src={"http://0.0.0.0:8080/" + props.selected}
            alt={props.selected}
          />
          <Tooltip
            title={
              endpoint
                ? "Start prediction"
                : "Enter endpoint to start predection"
            }
            aria-label="predict"
          >
            <span style={{ width: "40%", position: "relative" }}>
              <Button
                disabled={endpoint && !loading ? false : true}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSubmit}
              >
                Predict
              </Button>
              {loading && (
                <CircularProgress size={24} className={classes.progress} />
              )}
            </span>
          </Tooltip>
          {data &&
            data.predict &&
            data.predict.data &&
            data.predict.type === "classification" && (
              <Table predict={data.predict.data} />
            )}
          {data &&
            data.predict &&
            data.predict.data &&
            data.predict.type === "object_detection" && (
              <ObjectDetection predict={data.predict.data} />
            )}
          {loading && <CircularProgress size={68} />}
          {error && <Notification variant={"error"} message={error.message} />}
        </React.Fragment>
      )}
    </div>
  )
}

export default InputImg
