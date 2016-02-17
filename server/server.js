import React from 'react'
import { renderToString } from 'react/dist/react.min'
import pretty from 'pretty'

import serialize from 'serialize-javascript'
import { createMemoryHistory } from 'history'
import qs from 'query-string'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { ReduxRouter } from 'redux-router';
import { reduxReactRouter, match } from 'redux-router/server'

const Koa = require('koa')
const convert = require('koa-convert')
const app = new Koa()

app.use(convert(require('koa-static')('client')))

import { MOUNT_ID } from './constants'
import reducer from './reducer'
import routes from './routes'

import App from '../src/App'

const getMarkup = (store) => {
  const initialState = serialize(store.getState())

  const markup = renderToString(
    <Provider store={store} key="provider">
      <ReduxRouter/>
    </Provider>
  )

  return `<!doctype html>
    <html>
      <head>
        <title>Document</title>
      </head>
      <body>
        <div id="${MOUNT_ID}">${markup}</div>
        <script>window.__initialState = ${initialState}</script>
        <script src="/main.js"></script>
      </body>
    </html>
  `
}

app.use(ctx => {
  const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(reducer)
  const query = qs.stringify(ctx.query)
  const url = ctx.path + (query.length ? '?' + query : '')

  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      console.error('Router error:', error)
      // ctx.status(500).send(error.message)

      ctx.status = 500
      ctx.body = error.message

    } else if (redirectLocation) {
      // ctx.redirect(302, redirectLocation.pathname + redirectLocation.search)

      // ctx.redirect = 302

    } else if (!routerState) {
      // ctx.status(400).send('Not Found')

      ctx.status = 400
      ctx.body = 'Not Found'

    } else {
      // ctx.status(200).send(getMarkup(store))
      ctx.status = 200
      ctx.body = getMarkup(store)


    }
  }))
})

app.listen(3000, () => {
  console.log('Listen At 3000')
})
