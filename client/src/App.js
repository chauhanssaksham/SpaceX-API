import React from 'react';
import logo from './logo.png'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="container">
      <img src={logo} alt="SpaceX" style={{width:450, display:'block', margin: '20px auto'}}/>
    </div>
    </ApolloProvider>
  );
}

export default App;
