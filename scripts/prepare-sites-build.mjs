import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const serverDirectory = resolve('dist/server')
mkdirSync(serverDirectory, { recursive: true })

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') return response

    const url = new URL(request.url)
    if (/\\.[a-zA-Z0-9]+$/.test(url.pathname)) return response

    const fallbackUrl = new URL('/index.html', url)
    return env.ASSETS.fetch(new Request(fallbackUrl, request))
  },
}
`

writeFileSync(resolve(serverDirectory, 'index.js'), worker, 'utf8')
console.log('Prepared the Sites worker entrypoint.')
