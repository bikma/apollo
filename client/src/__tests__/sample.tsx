import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'

import { GET_VEHICLES } from '../queries'
import { RenderResult } from '@testing-library/react'
import Vehicles from '../pages/Vehicles'
import { runSuites } from '../test-utils'

const request = {
  query: GET_VEHICLES
}

const mocksWithSuccess = [
  {
    request,
    result: {
      data: {
        vehicles: [
          {
            backImg: 'example',
            comments: 'example',
            driverCondition: 12345,
            driverLicense: '1234',
            driverName: 'example',
            driverPhone: 12345,
            entryCondition: 12345,
            frontImg: 'example',
            id: 1,
            inTime: 1568737336,
            leftImg: 'example',
            loadedCondition: 12345,
            loadedWeight: 12345,
            numberPlateImg: 'example',
            outTime: 1568737336,
            registrationNumber: 'example',
            reportingTime: 1568737336,
            rightImg: 'example',
            safetyHelmet: 12345,
            safetyInstructions: 12345,
            safetyJacket: 12345,
            unloadedCondition: 12345,
            unloadedWeight: 12345,
            vehicleType: 'example',
            wheelsSecured: 12345
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
        vehicles: [null]
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
        component: <Vehicles />,
        mocks: [],
        name: 'renders loading',
        wait: 0
      },
      {
        component: <Vehicles />,
        mocks: mocksWithSuccess,
        name: 'renders data'
      },
      {
        component: <Vehicles />,
        mocks: mocksWithError,
        name: 'renders error'
      },
      {
        component: <Vehicles />,
        mocks: mocksWithEmpty,
        name: 'renders empty'
      }
    ],
    name: 'App'
  }
]

runSuites(suites)
