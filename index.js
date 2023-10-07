process.env.UV_THREADPOOL_SIZE = 1
const cluster = require('cluster')
const crypto = require('crypto')

if (cluster.isMaster) {
  cluster.fork()
  cluster.fork()
} else {
  const express = require('express')
  const app = express()



  app.get('/', (req, res) => {
    crypto.pbkdf2('x', 'y', 100000, 512, 'sha512', () => {
      res.send('hello')
    })

  })

  app.get('/fast', (req, res) => {
    res.send('This is fast')
  })


  app.listen(5001)
}

