import React, {Fragment} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import LaunchItem from './LaunchItem'

const Launches = () => {
    const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches{
        flight_number,
        mission_name,
        launch_date_local,
        launch_success
      }
    }
    `;
    return (
        <Fragment>
            <h3 className="my-3">Launches</h3>
            <Query query={LAUNCHES_QUERY}>
                {
                    (res)=>{
                        const {loading, error, data} = res;

                        if(loading) {return <h4>Loading...</h4>}
                        if(error) {console.log(error); return null;}

                        return <Fragment>
                            {
                                data.launches.map(launch => (
                                    <LaunchItem launch={launch} key={launch.flight_number} />
                                ))
                            }
                        </Fragment>
                        }
                }
            </Query>
        </Fragment>
    )
}

export default Launches
