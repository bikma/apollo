import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import InputImg from './pages/Input'
import Upload from './pages/Upload'
import Uploads from './pages/Uploads'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      position: 'absolute'
      // backgroundColor: 'transparent'
    },
    images: {
      maxHeight: '94vh',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    result: {
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center'
    }
  })
)

const App: React.FC = () => {
  const classes = useStyles()
  const [selected, setSelected] = useState<string>('')

  return (
    <div style={{ height: '100vh' }}>
      <Grid container>
        <Grid item xs={12} sm={10}>
          <InputImg selected={selected} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Upload />
          <div className={classes.images}>
            <Uploads onClick={(url: any) => setSelected(url)} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
