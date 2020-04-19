const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
