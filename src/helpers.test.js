// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
import { getFromURL } from 'helpers'
// the component to test

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/greeting', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json({ greeting: 'hello there' }))
    })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

it('should answer with mocked data', async () => {
    const response = await getFromURL('/greeting')
    expect(response.type).toEqual('SUCCESS')
    expect(response.greeting).toEqual('hello there')
})

it('should get an error if request fails', async () => {
    server.use(
        // override the initial "GET /greeting" request handler
        // to return a 500 Server Error
        rest.get('/greeting', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    const response = await getFromURL('/greeting')
    expect(response.type).toEqual('ERROR')
    expect(response.greeting).toEqual(undefined)
    expect(response.error).not.toEqual(undefined)
})