const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const PORT = process.env.PORT || 5000;
const app = express()

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
