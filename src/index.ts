import { Router } from 'itty-router'
import { todo as Todo } from './db'

const router = Router()

router.get('/todo/:id', async request => {
  // testID => 288908599761043969
  const { id } = request.params
  try {
    const todo = await Todo.read(id)
    return new Response(JSON.stringify(todo.data), {
      headers: {
        'content-type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(error, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
})

router.post('/todo', async request => {
  try {
    const { name } = await request.json()
    if (name == undefined || name == '') {
      throw Error('No name supplied')
    }
    const todo = await Todo.create({ name })
    return new Response(JSON.stringify(todo.data), {
      headers: {
        'content-type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(error, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
})

router.put('/todo/:id', async request => {
  try {
    const { id } = request.params
    const { name } = await request.json()
    if (name == undefined || name == '') {
      throw Error('No name supplied')
    }
    const todo = await Todo.update({ name }, id)
    return new Response(JSON.stringify(todo.data), {
      headers: {
        'content-type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(error, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
})

router.get('*', (request) => {
  return new Response('404', {
    status: 404,
    headers: {
      'content-type': 'application/json'
    }
  })
})

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
