import React, {Fragment} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'
import classNames from 'classnames'

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number){
            flight_number,
            mission_name,
            launch_success,
            launch_date_local,
            rocket{
                rocket_name,
                rocket_id,
                rocket_type
            }
        }
    }
`;

const Launch = (props) => {
    let {flight_number} = props.match.params;
    flight_number = parseInt(flight_number);

    return (
        <Fragment>
            <Query query={LAUNCH_QUERY} variables={{flight_number}}>
                {
                    ({loading, error, data}) => {
                        if(loading){return <h4>Loading...</h4>}
                        if(error){console.log(error)}
                        else{
                            console.log(data);
                            return <h1>test</h1>
                        }
                    }
                }
            </Query>
        </Fragment>
    )
}

export default Launch
