import React, { Component } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem ,PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import './DetailView.css';
class DetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sample:{},
            title:''
        }
    }

    componentWillMount()
    {
        
       
        var id = this.props.match.params.id;
        console.log(id);
        fetch('https://www.serverlesslibrary.net/api/Library')
        .then(response => response.json())
        .then(data => {
            var a = data.filter(s=>s.title===id);
            this.setState({ sample: a[0] });
        });

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

export default DetailView;