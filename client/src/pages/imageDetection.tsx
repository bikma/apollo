import Paper from '@material-ui/core/Paper'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    // width: '60%',
    overflowX: 'auto',
    marginTop: '5vh',
    // maxHeight: '30vh',
    display: 'flex'
  },
  table: {
    // minWidth: 650,
    marginLeft: '5vh'
  }
})

export default function SimpleTable(data: any) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src="http://0.0.0.0:8080/images/cat_clasification.png" />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Prediction (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.predict.map((row: any) => (
            <TableRow key={row.match}>
              <TableCell
                component="th"
                scope="row"
                style={{ fontWeight: 'bold', color: row.color }}
              >
                {row.match}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 'bold' }}>
                {row.percentage}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
