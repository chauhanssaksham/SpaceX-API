import React, {Fragment} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import Skeleton from '@bit/pedox.react-skeleton.skeleton';

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
            <MissionKey/>  
            <Query query={LAUNCHES_QUERY}>
                {
                    (res)=>{
                        const {loading, error, data} = res;
                        if(loading) {
                            return <Fragment>
                            <div className="card mb-3" style={{background:"transparent"}}><Skeleton width="100%" height={120} dark /></div>
                            <div className="card mb-3" style={{background:"transparent"}}><Skeleton width="100%" height={120} dark /></div>
                            <div className="card mb-3" style={{background:"transparent"}}><Skeleton width="100%" height={120} dark /></div>
                            <div className="card mb-3" style={{background:"transparent"}}><Skeleton width="100%" height={120} dark /></div>
                        </Fragment>
                        }
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
