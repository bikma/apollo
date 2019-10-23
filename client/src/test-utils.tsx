import * as React from 'react'

import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import {
  RenderResult,
  act,
  cleanup,
  render,
  wait
} from '@testing-library/react'

// import wait from "waait"

interface It {
  component: JSX.Element
  mocks: MockedResponse[]
  name: string
  loading?: boolean
  callback?: (response: RenderResult) => void
  snapshot?: boolean
  wait_for_testid?: string
}

interface Suite {
  name: string
  its: Array<It>
}

export const runSuites = (suites: Array<Suite>) => {
  if (!suites) return
  suites.forEach((suite: Suite) => {
    describe(suite.name, () => {
      afterEach(cleanup)
      suite.its.forEach((_it: It) => {
        it(_it.name, async () => {
          await act(async () => {
            const response: RenderResult = render(
              <MockedProvider mocks={_it.mocks} addTypename={false}>
                {_it.component}
              </MockedProvider>
            )
            if (_it.wait_for_testid) {
              await wait(
                () =>
                  _it.wait_for_testid &&
                  response.queryByTestId(_it.wait_for_testid)
              )
            }
            if (_it.snapshot !== false) {
              expect(response.container).toMatchSnapshot()
            }
            if (_it.callback) _it.callback(response)
          })
        })
      })
    })
  })
}
