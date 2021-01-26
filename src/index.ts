import { handleRequest } from './handler'
import { Router } from 'itty-router'

// create a router
const router = Router() // this is a Proxy, not a class

// GET index
router.get('/*', handleRequest)

// attach the router handle to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
