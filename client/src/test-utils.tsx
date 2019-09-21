import * as React from 'react'

import { act, cleanup, render, wait } from '@testing-library/react'

import { MockedProvider } from '@apollo/react-testing'
import { RenderResult } from '@testing-library/react'

interface It {
  component: JSX.Element
  mocks: Array<any>
  name: string
  wait?: number
  callback?: (response: RenderResult) => void
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
            if (_it.wait !== 0)
              await waitUntilLoadingIsFinished(response.queryByText)
            expect(response.container).toMatchSnapshot()
            if (_it.callback) _it.callback(response)
          })
        })
      })
    })
  })
}

const waitUntilLoadingIsFinished = (queryByText: any) =>
  wait(() => {
    const isLoading = queryByText('Loading') != null
    expect(isLoading).toBe(false)
  })
