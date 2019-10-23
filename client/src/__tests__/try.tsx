import * as React from 'react'

import { GET_USERS, SUBSCRIBE } from '../queries'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait
} from '@testing-library/react'

import Users from '../pages/users'

const mocks = [
  {
    request: {
      query: GET_USERS
    },
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
    request: {
      query: GET_USERS
    },
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
    request: {
      query: SUBSCRIBE,
      variables: { phone: '1234567890' }
    },
    result: {
      data: {
        subscribe: [
          {
            dob: new Date(),
            id: 1,
            name: 'mk1',
            phone: '1234567890'
          }
        ]
      }
    }
  },
  {
    request: {
      query: SUBSCRIBE,
      variables: { phone: '1234567890' }
    },
    result: {
      data: {
        subscribe: {
          dob: new Date(),
          id: 1,
          name: 'mk1',
          phone: '1234567890'
        }
      }
    }
  }
]

it('should render loading state initially', async () => {
  await act(async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    )
    await wait(() => component.getByText('Subscribe'))
    let button = component.getByText('Subscribe')
    fireEvent.click(button)

    const buttonNode = component.getByTestId('subscribe')
    expect(buttonNode).toHaveProperty('disabled', true)

    const inputNode = component.getByPlaceholderText(
      'Phone Number'
    ) as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: '1234567890' } })
    expect(inputNode.value).toBe('1234567890')

    expect(buttonNode).toHaveProperty('disabled', false)
    fireEvent.click(buttonNode)
    // await wait(() => component.getByText('subscribed!'))
    await wait()
    component.getByText('subscribed!')
  })
})
