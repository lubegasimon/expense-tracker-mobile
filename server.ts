
const port: number = 3000
const app_instance = require('./app')

app_instance.get('/', (req, res) => {
  res.send('Hello World!')
})

app_instance.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})