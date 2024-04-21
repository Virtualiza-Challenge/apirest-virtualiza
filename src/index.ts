import express from 'express'
import { sequelize } from './database'
import './models/Driver'
import './models/Vehicle'
import './models/Trip'

const app = express()

app.use(express.json())

const PORT = 3000

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
  try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    app.listen(PORT, () => {
      console.log('Server on port: ', PORT)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

void main()
