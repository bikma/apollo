import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { GET_USERS } from '../queries'
import { RenderResult } from '@testing-library/react'
import Users from '../pages/users'
import { runSuites } from '../test-utils'

const request = {
  query: GET_USERS
}

const mocksWithSuccess = [
  {
    request,
    result: {
      data: {
        users: [
          {
            dob: new Date(),
            id: 1,
            name: 'mk1',
            phone: '9999999999'
          }
        ]
      }
    }
  },
  {
    request,
    result: {
      data: {
        users: [
          {
            dob: new Date(),
            id: 2,
            name: 'mk2',
            phone: '9999999999'
          }
        ]
      }
    }
  }
]
const mocksWithEmpty = [
  {
    request,
    result: {
      data: {
        users: []
      }
    }
  }
]
const mocksWithError = [
  {
    error: new Error('Something went wrong'),
    request
  }
]

const loading = (response: RenderResult) => {
  // additional tests apart from snapshot match
  expect(response.getByTestId('loading')).toHaveTextContent('Loading')
}

const suites = [
  {
    its: [
      {
        callback: loading,
        component: <Users />,
        loading: true,
        mocks: [],
        name: 'renders loading'
      },
      {
        component: <Users />,
        mocks: mocksWithError,
        name: 'renders error',
        wait_for_testid: 'errror'
      },
      {
        component: <Users />,
        mocks: mocksWithEmpty,
        name: 'renders empty',
        wait_for_testid: 'no-data'
      },
      {
        component: <Users />,
        mocks: mocksWithSuccess,
        name: 'renders data',
        wait_for_testid: 'mk1'
      }
    ],
    name: 'App'
  }
]

runSuites(suites)
