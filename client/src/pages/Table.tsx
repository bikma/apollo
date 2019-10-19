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
    width: '40%',
    overflowX: 'auto',
    marginTop: '5vh',
    maxHeight: '30vh'
  },
  table: {
    // minWidth: 650
  }
})

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export default function SimpleTable(data: any) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
                style={{ fontWeight: 'bold' }}
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
