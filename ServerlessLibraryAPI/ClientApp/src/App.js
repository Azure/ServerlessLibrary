import React, { Component } from 'react';
import { Switch, Route, withRouter  } from 'react-router-dom'
import { connect } from 'react-redux';
import Main from './components/Main/Main';
import './App.css';
import { Header } from './components/Header';
import DetailView from './components/DetailView/DetailView';
import { samplesReceived } from './actions/FilterChangeActions'
import Test from './components/Test/Test';
import { Login } from './components/Login';


class App extends Component {

componentWillMount() {
 
  fetch('https://www.serverlesslibrary.net/api/Library')
      .then(response => response.json())
      .then(data => {
          var samples = data.sort(function (a, b) {
              return b.totaldownloads - a.totaldownloads;
          }
          );
        this.props.samplesReceived(samples);
      });
}
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
              <Route exact path='/' component={withRouter(Main)}  />
              <Route  path='/test' component={Test}  />
              <Route  path='/sample/:id' component={withRouter(DetailView)}  />
              <Route exact path='/login' component={Login} />
              {/* <Route path='/detail/:id' 
                render= {(props)=>
                  {
                    let id = props.match.params.id;
                    return <DetailView {...props} sample={this.getCurrentSample(id)}/>;
                  }
                }   */}
              /> 
          </Switch>
      </div>
    );
  }
}


const mapStateToProps = state => ({
});


const mapDispatchToProps = {
  samplesReceived
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
