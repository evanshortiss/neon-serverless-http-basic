
function httpVersion () {
  const { neon } = require('@neondatabase/serverless')
  const sql = neon(process.env.DATABASE_URL)
  const time = Date.now()
  
  sql('SELECT version()')
    .then(result => console.log(result))
    .catch(err => console.log(err))
    .finally(() => console.log(`Total Time (HTTP): ${Date.now() - time}ms`))
}

function poolVersion () {
  const { Pool, neonConfig } = require('@neondatabase/serverless')
  const ws = require('ws').WebSocket

  neonConfig.webSocketConstructor = ws;
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const time = Date.now()

  pool.connect()
    .then(async (client) => {
      const result = await client.query('SELECT version()')
      console.log(result.rows)
      client.end()
      return result
    })
    .catch(err => console.log(err))
    .finally(() => {
      console.log(`Total Time (Pool): ${Date.now() - time}ms`)
      pool.end()
    })
}

poolVersion()
httpVersion()
