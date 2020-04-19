const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList} = require('graphql')
const axios = require('axios')

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    description:"This represents a Launch",
    fields: ()=>({
        flight_number: {type:GraphQLInt},
        mission_name: {type:GraphQLString},
        launch_year: {type:GraphQLString},
        launch_local_date: {type:GraphQLString},
        launch_success: {type:GraphQLBoolean},
        rocket: {type:RocketType}
    })
})
const RocketType = new GraphQLObjectType({
    name: "Rocket",
    description:"This represents a Rocket",
    fields: ()=>({
        rocket_id: {type:GraphQLString},
        rocket_name: {type:GraphQLString},
        rocket_type: {type:GraphQLString}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: "Root Query",
    fields: () => ({
        launches: {
            type: new GraphQLList(LaunchType),
            description: 'List of Launches',
            resolve: (parent, args) => axios.get('http://api.spacexdata.com/v3/launches').then(res=>res.data)
        },
        rockets: {
            type: new GraphQLList(RocketType),
            description: 'List of Rockets',
            resolve: (parent, args) => axios.get('http://api.spacexdata.com/v3/rockets').then(res=>res.data)
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type:GraphQLInt}
            },
            resolve: (parents, args) => {
                return axios.get(`http://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res => res.data)
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: {type:GraphQLString}
            },
            resolve: (parents, args) => {
                return axios.get(`http://api.spacexdata.com/v3/rockets/${args.rocket_id}`).then(res => res.data)
            }
        }
    })
})
module.exports = new GraphQLSchema({
    query: RootQueryType
});