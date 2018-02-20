import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            data: [],
            text: 'Initial data...'
        }

        this.setStateHandler = this.setStateHandler.bind( this );
        this.forceUpdateHandler = this.forceUpdateHandler.bind( this );
        this.findDomNodeHandler = this.findDomNodeHandler.bind( this );
        this.updateState = this.updateState.bind( this );
        this.clearInput = this.clearInput.bind(this);

    };
    updateState( e ) {
        this.setState( { text: e.target.value } );
    }
    
    clearInput() {
        this.setState({text: ''});
        ReactDOM.findDOMNode(this.refs.myInput).focus();
     }

    setStateHandler() {
        var item = "setState..."
        var myArray = this.state.data.slice();
        myArray.push( item );
        this.setState( { data: myArray } )
    };

    forceUpdateHandler() {
        this.forceUpdate();
    };

    findDomNodeHandler() {
        var myDiv = document.getElementById( 'myDiv' );
        ReactDOM.findDOMNode( myDiv ).style.background = 'green';
    }

    render() {
        return (
            <div>
                <button onClick={this.setStateHandler}>SET STATE</button>
                <h4>State Array: {this.state.data}</h4>
                <button onClick={this.forceUpdateHandler}>FORCE UPDATE</button>
                <h4>Random number: {Math.random()}</h4>
                <button onClick={this.findDomNodeHandler}>FIND DOME NODE</button>
                <div id="myDiv">NODE</div>

                <input type="text" value={this.state.text} onChange={this.updateState} ref = "myInput"/>
                <h4>{this.state.text}</h4>
                
                <Content myDataProp = {this.state.text} 
                    updateStateProp = {this.updateState}></Content>
                
                <button onClick = {this.clearInput}>CLEAR</button>
                
                
                <ContentFromState/>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.myDataProp}
                    onChange={this.props.updateStateProp} />
                <h3>{this.props.myDataProp}</h3>
            </div>
        );
    }
}

class ContentFromState extends React.Component {
    constructor() {
       super();
         
       this.state = {
          data:[
             {
                component: 'First...',
                id: 1
             },
             {
                component: 'Second...',
                id: 2
             },
             {
                component: 'Third...',
                id: 3
             }
          ]
       }
    }
    render() {
       return (
          <div>
             <div>
                {this.state.data.map((dynamicComponent, i) => <DynamicContent 
                   key = {i} componentData = {dynamicComponent}/>)}
             </div>
          </div>
       );
    }
 }
 class DynamicContent extends React.Component {
    render() {
       return (
          <div>
             <div>{this.props.componentData.component}</div>
             <div>{this.props.componentData.id}</div>
          </div>
       );
    }
 }
export default App;