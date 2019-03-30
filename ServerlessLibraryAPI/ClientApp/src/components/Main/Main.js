import React, { Component } from 'react';
import SideBarContainer from '../../components/sidebar/SideBar'
import SearchBarContainer from '../../components/SearchBar/SearchBar'
import ItemList from '../../components/ItemList/ItemList'
import './Main.css';
import { samplesReceived } from '../../actions/FilterChangeActions'
import { connect } from 'react-redux';

class Main extends Component {
    getLocalFilteredSamples(){
        return this.filterSamples(this.props.samples, 
            this.props.functionapp,
            this.props.logicapp,
            this.props.csharp,
            this.props.javascript,
            this.props.filterText,
            this.props.sortby
            )
    }

    filterSamples(samples, functionapp, logicapp, csharp, javascript, filterText, sortby)
    {
      var filter = new RegExp(filterText, 'i');
      samples = samples.filter(el =>
          el.title.match(filter)
          || el.description.match(filter)
          || el.authortype.match(filter)
          || el.language.match(filter)
          || el.type.match(filter)
          || el.repository.replace('https://github.com/', '').match(filter)
          || (el.runtimeversion && el.runtimeversion.match(filter))
          || (el.tags && el.tags.some(x => x.match(filter)))
      )
  
      if (!functionapp) {
          samples = samples.filter(s => s.type.indexOf("functionapp") < 0);
      }
      
      if (!logicapp) {
          samples = samples.filter(s => s.type.indexOf("logicapp") < 0);
      }
  
      if (!csharp) {
          samples = samples.filter(s => s.language.indexOf("csharp") < 0);
      }
      
      if (!javascript) {
          samples = samples.filter(s => s.language.indexOf("javascript") < 0);
      }
  
      return this.Sort(samples, sortby);
  
    }
  
     Sort(list, sortby){
      list = list.map(a=>a);
      if (sortby === "totaldownloads") {
          list = list.sort(function (a, b) {
              return b.totaldownloads - a.totaldownloads;
          }
          );
      }
      else
      {
          list = list.sort(function (a, b) {
              var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
              if (titleA < titleB) //sort string ascending
                  return -1 
              if (titleA > titleB)
                  return 1
              return 0 //default return value (no sorting)
          }
          );
      }
  
      return list;
    }
  
    render() {
        return (
            <div className="mainContainer">
                <div className="sidebar" >
                    <SideBarContainer/>
                </div>
                <div className="main">
                    <SearchBarContainer />
                    <ItemList filteredSamples={this.getLocalFilteredSamples()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    samples:state.samples,
    filteredSamples: state.filteredSamples,
    functionapp:state.functionapp,
    logicapp:state.logicapp,
    csharp:state.csharp,
    javascript:state.javascript,
    filterText:state.filterText,
    sortby:state.sortby
  });
  
  const mapDispatchToProps = {
    samplesReceived
  };
  
  const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main);
  
  export default MainContainer;
  

