import { GET_VEHICLES } from '../queries'
import React from 'react'
import { Vehicles as VehicleType } from '../__generated__/types'
import { useQuery } from '@apollo/react-hooks'

export const Vehicles: React.FC = () => {
  const { loading, error, data } = useQuery<VehicleType>(GET_VEHICLES)
  if (loading) return <div data-testid="loading">Loading</div>
  if (error) return <div data-testid="error">{error.message}</div>
  if (!data) return <div data-testid="no-data">No data</div>
  const vehicles = data.vehicles
  return (
    <React.Fragment>
      {vehicles &&
        vehicles.map((v, i) => <p key={i}>{v && v.registrationNumber}</p>)}
    </React.Fragment>
  )
}

export default Vehicles
