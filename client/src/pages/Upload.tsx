import React, { useCallback } from 'react'

import Button from '@material-ui/core/Button'
import { GET_UPLOADS } from './Uploads'
import { gql } from 'apollo-boost'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/react-hooks'

export const UPLOAD_FILE = gql`
  mutation upload($files: [Upload!]!) {
    upload(files: $files) {
      id
      name
      url
    }
  }
`

const Upload = () => {
  const [mutate] = useMutation<any>(UPLOAD_FILE, {
    onError(error) {
      console.error(error)
    },
    update(cache, { data: { upload } }) {
      cache.writeQuery({
        data: { uploads: upload },
        query: GET_UPLOADS
      })
    }
  })
  const onDrop = useCallback(
    files => {
      mutate({ variables: { files: files } })
    },
    [mutate]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        variant="outlined"
        component="span"
        style={{ borderRadius: 0, width: '100%' }}
      >
        {isDragActive ? 'Drop' : 'Upload'}
      </Button>
    </div>
  )
}

export default Upload
