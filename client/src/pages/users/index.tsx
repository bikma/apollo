import Add from './Subscribe'
import { GET_USERS } from '../../queries'
import React from 'react'
import { Users as UsersType } from '../../__generated__/types'
import { useQuery } from '@apollo/react-hooks'

export const Users: React.FC = () => {
  const { loading, error, data } = useQuery<UsersType>(GET_USERS, {
    pollInterval: 20
  })
  if (loading) return <div data-testid="loading">Loading</div>
  if (error) return <div data-testid="error">{error.message}</div>
  if (!data || !data.users || data.users.length === 0)
    return <div data-testid="no-data">No data</div>
  const users = data.users
  return (
    <React.Fragment>
      {users.map((user: any, i: any) => (
        <p key={i} data-testid={user.name}>
          {user.name}
        </p>
      ))}
      <Add />
    </React.Fragment>
  )
}

export default Users
