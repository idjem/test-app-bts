const express = require('express')
const app = express()

const data = {
}

app.post('/salesforce', (req, res) => {
  res.json(data)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})