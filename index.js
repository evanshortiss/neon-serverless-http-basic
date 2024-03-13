const { neon } = require('@neondatabase/serverless')
const sql = neon(process.env.DATABASE_URL)

sql('SELECT version()')
  .then(result => console.log(result))
  .catch(err => console.log(err))
