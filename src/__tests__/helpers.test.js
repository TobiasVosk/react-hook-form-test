import { rest } from 'msw'
import { setupServer } from 'msw/node'

import '@testing-library/jest-dom/extend-expect'
import { getFromURL } from 'helpers'



const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ greeting: 'hello there' }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('should answer with mocked data', async () => {
    const response = await getFromURL('/greeting')
    expect(response.type).toEqual('SUCCESS')
    expect(response.greeting).toEqual('hello there')
})

it('should get an error if request fails', async () => {
    server.use(
        rest.get('/greeting', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    const response = await getFromURL('/greeting')
    expect(response.type).toEqual('ERROR')
    expect(response.greeting).toEqual(undefined)
    expect(response.error).not.toEqual(undefined)
})