import {GET_VEHICLES} from '../queries'
import React from 'react'
import { Vehicles as VehicleType } from '../__generated__/types'
import { useQuery } from '@apollo/react-hooks'

export const Vehicles: React.FC = () => {
  const { loading, error, data } = useQuery<VehicleType>(GET_VEHICLES, { pollInterval: 5 })
  console.log(loading, error, data)
  if (loading) return <div>Loading</div>
  if (error) return <h1>ERROR</h1>
  if (!data) return <div>No data</div>
  const vehicles = data.vehicles
  return <React.Fragment>
    {vehicles && vehicles.map((v, i) => <p key={i}>{v && v.registrationNumber}</p>)}
  </React.Fragment>
}

export default Vehicles