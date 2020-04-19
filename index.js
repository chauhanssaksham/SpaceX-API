const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.use(express.static('public'));
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
