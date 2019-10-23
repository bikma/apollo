import Add from './Subscribe'
import { GET_USERS } from '../../queries'
import React from 'react'
import Table from '../../components/Table'
import { Users as UsersType } from '../../__generated__/types'
import { useQuery } from '@apollo/react-hooks'

export const Users: React.FC = () => {
  const { loading, error, data } = useQuery<UsersType>(GET_USERS, {
    pollInterval: 3600
  })
  if (loading) return <div data-testid="loading">Loading</div>
  if (error) return <div data-testid="error">{error.message}</div>
  if (!data || !data.users || data.users.length === 0)
    return <div data-testid="no-data">No data</div>
  return (
    <React.Fragment>
      <Add />
      <Table data={data.users} />
    </React.Fragment>
  )
}

export default Users
