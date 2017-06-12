import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {cyan500, orange500, grey500} from 'material-ui/styles/colors';

export default class CakeForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            openDialog: false,
        };
    }

    handleUpdateTitleState( event ){
        let title = event.target.value;
        this.props.onCakeFieldChange( 'title', title );
    }

    handleUpdateDescriptionState( event ){
        let desc = event.target.value;
        this.props.onCakeFieldChange( 'desc', desc );
    }

    handleUpdateImageURLState( event ){
        let image= event.target.value;
        this.props.onCakeFieldChange( 'image', image );
    }

    render (){
        const styles = {
            errorStyle: {
                color: orange500,
            },
            underlineStyle: {
                borderColor: cyan500,
            },
            floatingLabelStyle: {
                fontSize: "1.2em",
                color: grey500,
            },
            floatingLabelFocusStyle: {
                fontSize: "1.2em",
                color: cyan500,
            },
            textFieldStyle: {
                fontSize: "1.2em"
            }
        };
        return(

            <Paper className="flex-container" style={{ flexDirection: "column" }}>
                <TextField
                    className="flex-item"
                    floatingLabelText="Title"
                    value={ this.props.title }
                    inputStyle={ styles.textFieldStyle }
                    onChange={ this.handleUpdateTitleState.bind( this ) }
                    type="text"
                    floatingLabelStyle={ styles.floatingLabelStyle }
                    floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
                />
                <TextField
                    className="flex-item"
                    floatingLabelText="Description"
                    value={ this.props.desc }
                    inputStyle={ styles.textFieldStyle }
                    onChange={ this.handleUpdateDescriptionState.bind( this ) }
                    type="text"
                    multiLine={ true }
                    floatingLabelStyle={ styles.floatingLabelStyle }
                    floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
                />
                <TextField
                    className="flex-item"
                    floatingLabelText="Image"
                    value={ this.props.image }
                    inputStyle={ styles.textFieldStyle }
                    onChange={ this.handleUpdateImageURLState.bind( this ) }
                    type="url"
                    floatingLabelStyle={ styles.floatingLabelStyle }
                    floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
                />
            </Paper>
        );
    }
}

CakeForm.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


CakeForm.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onCakeFieldChange: PropTypes.func.isRequired,
};
