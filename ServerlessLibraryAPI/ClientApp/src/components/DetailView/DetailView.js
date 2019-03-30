import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem ,PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { samplesReceived } from '../../actions/FilterChangeActions'
import './DetailView.css';
class DetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sample:{},
        }
    }

    componentWillMount()
    {
        var id = this.props.match.params.id;
        var currentItem;
        if (this.props.samples.length > 0)
        {
          currentItem = this.props.samples.filter(s=>s.title===id)[0];
          this.setState({ sample: currentItem });
        }else{
  
        fetch('https://www.serverlesslibrary.net/api/Library')
        .then(response => response.json())
        .then(data => {
          this.props.samplesReceived(data);
          currentItem = data.filter(s=>s.title===id)[0];
          this.setState({ sample: currentItem });
        });
      }
    }
    
     render() {
        return (
            <div>
             <h3>{this.state.sample.title}</h3>
             <p>{this.state.sample.description}</p>   
            <Pivot linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs}>
              <PivotItem
                headerText="Overview"
                headerButtonProps={{
                  'data-order': 1,
                  'data-title': 'My Files Title'
                }}
              >
                <Label >Sample details</Label>
                <p>{this.state.sample.description}</p> 

              </PivotItem>
              <PivotItem headerText="Licence">
                <Label>Licence details</Label>
              </PivotItem>
            </Pivot>
          </div>
        )
    }
}

const mapStateToProps = state => ({
  samples: state.samples,
});

const mapDispatchToProps = {
  samplesReceived
};

const DetailViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailViewContainer;
