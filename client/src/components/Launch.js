import React, {Fragment} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import Skeleton from '@pedox/react-skeleton';
import "@pedox/react-skeleton/dist/index.css";

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!){
        launch(flight_number: $flight_number){
            flight_number,
            mission_name,
            launch_success,
            launch_year,
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
                        if(loading){
                            return <div>
                                <h4 className="display-4 my-3"><span className="text-dark">Mission:</span></h4>
                                <p className="mb-3">
                                    <ul className="list-group">
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                    </ul>
                                    <h3 className="my-3">Rocket Details</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                        <li className="list-group-item"><Skeleton width="100%" height={20} dark /></li>
                                    </ul>
                                    <hr/>
                                    <Link to="/" className="btn btn-secondary">Back</Link>
                                </p>
                            </div>
                            }
                        if(error){console.log(error)}
                        else{
                            const {mission_name, flight_number, launch_success, rocket, launch_year} = data.launch;
                            return <div>
                                <h4 className="display-4 my-3"><span className="text-dark">Mission:</span> {mission_name}</h4>
                                <p className="mb-3">
                                    <ul className="list-group">
                                        <li className="list-group-item">Flight Number: {flight_number}</li>
                                        <li className="list-group-item">Launch Year {launch_year}</li>
                                        <li className="list-group-item">Launch Successful: 
                                            <span className={classNames({
                                                'text-success':launch_success,
                                                'text-danger':!launch_success
                                            })}> {launch_success?'Yes':'No'}</span>
                                            </li>
                                    </ul>
                                    <h3 className="my-3">Rocket Details</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">Rocket ID: {rocket.rocket_id}</li>
                                        <li className="list-group-item">Rocket Name: {rocket.rocket_name}</li>
                                        <li className="list-group-item">Rocket Type: {rocket.rocket_type}</li>
                                    </ul>
                                    <hr/>
                                    <Link to="/" className="btn btn-secondary">Back</Link>
                                </p>
                            </div>
                        }
                    }
                }
            </Query>
        </Fragment>
    )
}

export default Launch
