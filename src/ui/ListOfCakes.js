import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CakeCard from './CakeCard.js';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class ListOfCakes extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            cakes : [],
            searchTitle: this.props.searchTitle,
        };
    };

    componentWillReceiveProps( nextProps ){
        this.setState({
            cakes: nextProps.cakes,
        });
        this.setState({
            searchTitle: nextProps.searchTitle,
        })
    }

    renderCakeList( filteredCakes ){
        const style = {
            height: "6px",
            border: 0,
            boxShadow: "0 6px 6px -6px black inset"
        };
        return filteredCakes.map( ( cake, index )=>(
            <Paper className="card" key={ index } >
                < CakeCard
                    cake={ cake }
                    onExpandChange={ this.props.onExpandChange }
                    deleteCake={ this.props.deleteCake }
                    editCake={ this.props.editCake }
                />
                <Divider style={ style } />
            </Paper>
        ));
    };

    render(){
        let filteredCakes = this.state.cakes.filter(
            ( cake ) => {
                return cake.title.toLowerCase().indexOf( this.state.searchTitle ) !== -1;
            }
        );
        return (
            <Paper>
                { this.renderCakeList( filteredCakes ) }
            </Paper>
        )
    };
}

ListOfCakes.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

ListOfCakes.propTypes = {
    cakes: PropTypes.array.isRequired,
    onExpandChange: PropTypes.func.isRequired,
    searchTitle: PropTypes.string.isRequired,
    deleteCake: PropTypes.func.isRequired,
    editCake: PropTypes.func.isRequired,
};