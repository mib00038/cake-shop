import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ListOfCakes from './ui/ListOfCakes.js';
import AddCakeDialogButton from './ui/AddCakeDialogButton.js';
import SearchCakePanel from './ui/SearchCakePanel.js';
import AnimatedLogo from './ui/AnimatedLogo.js';
import Paper from 'material-ui/Paper';
import Axios from 'axios';

injectTapEventPlugin();


class App extends Component {

    constructor(){
        super();
        this.state = {
            cakeURL : "https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json",
            cakes : [],
            searchTitle: '',
        }
    }

    componentDidMount() {

            let _this = this;
            this.serverRequest =
                Axios
                    .get( this.state.cakeURL )
                    .then( ( result ) => {
                        let newCakeArray = [];

                        const data = result.data;
                        for ( let i = 0; i < data.length; i++ ) {
                            const cakeData = data[ i ];
                            const cakeObj = {
                                id : i,
                                title: cakeData.title,
                                desc: cakeData.desc,
                                image: cakeData.image,
                                expanded: false,
                            };
                            newCakeArray.push( cakeObj );
                        }

                        _this.setState({
                            cakes: newCakeArray
                        });
                    });

    };

    componentWillUnmount() {
        this.serverRequest.abort();
    };


    handleAddCake( cakeObj ){
        let newCakeArray = this.state.cakes;
        newCakeArray.unshift( cakeObj );

        for ( let i = 0; i < newCakeArray.length; i++ ){
            newCakeArray[ i ].id = i;
        }

        this.setState({
            cakes: newCakeArray,
        });
    };

    handleEditCake( cakeObj ){
        console.log("handleEditCake handled by Parent");
        console.log( cakeObj );
        let newCakeArray = this.state.cakes;
        newCakeArray[ cakeObj.id] = cakeObj;
        this.setState({
            cakes : newCakeArray,
        });
    }

    handleDeleteCake( index ){
        let newCakeArray = [];
        for( let i = 0, j = 0; i < this.state.cakes.length; i++ ) {
            if ( i !== index ) {
                let cakeObj = this.state.cakes[ i ];
                cakeObj.id = j;
                newCakeArray.push( cakeObj );
                j++;
            }

        }

        this.setState({
            cakes: newCakeArray
        });
    }

    handleSearchTitleChange( title ){
        this.setState({
            searchTitle: title,
        });
        console.log(title);
    }

    handleOnExpandChange( cake, expanded ){
        let newCakeArray = this.state.cakes;
        newCakeArray[ cake.id ].expanded = expanded;
        this.setState({
            cakes: newCakeArray,
        })
    }

    render() {
        return (
            <Paper className="App container">
                <div className="App-header">
                    <div className="flex-container" style={{ flexDirection: "column" }}>
                        < AnimatedLogo />
                        < SearchCakePanel
                            title={ this.state.searchTitle }
                            onSearchTitleChange={ this.handleSearchTitleChange.bind( this ) }
                        />
                        < AddCakeDialogButton
                            addCake={ this.handleAddCake.bind( this ) }
                        />
                    </div>
                </div>
                < ListOfCakes
                    cakes={ this.state.cakes }
                    onExpandChange={ this.handleOnExpandChange.bind( this ) }
                    searchTitle={ this.state.searchTitle }
                    deleteCake={ this.handleDeleteCake.bind( this ) }
                    editCake={ this.handleEditCake.bind( this ) }
                />
            </Paper>
        );
    }
}

App.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;
