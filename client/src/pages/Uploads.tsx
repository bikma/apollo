import React, { useState } from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const GET_UPLOADS = gql`
  query uploads {
    uploads {
      id
      name
      url
    }
  }
`

const Uploads = (props: any) => {
  const [selected, setSelected] = useState()
  const { loading, error, data } = useQuery<any>(GET_UPLOADS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (!data || !data.uploads) return <p>No uploads found...</p>
  return (
    <div style={{ height: '100%' }}>
      {data.uploads.map((i: any) => (
        <img
          key={i.id}
          style={{
            border: selected === i.url ? '2px solid #3f51b5' : '1px solid #ddd',
            cursor: 'pointer',
            height: '30vh'
          }}
          src={'http://0.0.0.0:8080/' + i.url}
          alt={i.name}
          width="98%"
          onClick={() => {
            props.onClick(i.url)
            setSelected(i.url)
          }}
        />
      ))}
    </div>
  )
}

export default Uploads
