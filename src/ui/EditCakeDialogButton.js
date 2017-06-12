import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan500} from 'material-ui/styles/colors';
import CakeForm from './CakeForm';

export default class EditCakeDialogButton extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            cake: this.props.cake,
            id: this.props.cake.id,
            title: this.props.cake.title,
            desc: this.props.cake.desc,
            image: this.props.cake.image,
            openDialog: false,
        }
    };

    componentWillReceiveProps( nextProps ){

        if ( typeof nextProps.cake !== 'undefined' ) {
            this.setState({
                cake: nextProps.cake,
                id: nextProps.cake.id,
                title: nextProps.cake.title,
                desc: nextProps.cake.desc,
                image: nextProps.cake.image,
            });
        }

    }

    handleOpenEditCakeDialog(){
        this.setState({
            openDialog: true,
        });
    }

    handleCancelButton(e){

        this.setState({
            title: this.state.cake.title,
            desc: this.state.cake.desc,
            image: this.state.cake.image,
        });

        this.setState({
            openDialog: false,

        });
    }

    handleCakeFieldChange( fieldName, fieldValue ){
        if ( fieldName.localeCompare( "title" ) === 0 ) {
            this.setState({
                title: fieldValue
            });
        }
        if ( fieldName.localeCompare( "desc" ) === 0 ) {
            this.setState({
                desc: fieldValue
            });
        }
        if ( fieldName.localeCompare( "image" ) === 0 ) {
            this.setState({
                image: fieldValue
            });
        }
    }


    renderEditCakeForm(){
        return (
            < CakeForm
                title={ this.state.title }
                desc={ this.state.desc }
                image={ this.state.image }
                onCakeFieldChange={ this.handleCakeFieldChange.bind( this )} />
        )
    }

    handleSubmitForm(){
        this.setState({
            openDialog: false,
        });

        const cakeObj = {
            id: this.state.cake.id,
            title: this.state.title,
            desc: this.state.desc,
            image: this.state.image,
        };

        this.props.editCake( cakeObj );
    }

    render(){
        const style = {
            margin: 12,
        };

        const actions = [
            < RaisedButton
                label="Submit"
                primary={ true }
                onTouchTap={ this.handleSubmitForm.bind( this ) }
                className="flex-item col-5"
                style={ style }
            />,
            < RaisedButton
                label="Cancel"
                primary={ true }
                onTouchTap={ this.handleCancelButton.bind( this ) }
                className="flex-item col-5"
                style={ style }
            />,
        ];

        const customDialogStyle = {
            width: '100%',
            borderColor: cyan500,
            borderStyle: "solid",
            borderWidth: 4,
        };

        return (
            <div >
                < RaisedButton
                    label="Edit"
                    primary={ true }
                    onTouchTap={ this.handleOpenEditCakeDialog.bind( this ) }
                    className="flex-item col-5"
                />
                < Dialog
                    title="Edit Cake"
                    actions={ actions }
                    actionsContainerClassName="flex-container flex-dialog-box col-12"
                    modal={ true }
                    open={ this.state.openDialog }
                    contentStyle={ customDialogStyle }
                >
                    { this.state.openDialog ? this.renderEditCakeForm() : "" }
                </ Dialog>
            </div>
        )
    };
}

EditCakeDialogButton.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

EditCakeDialogButton.propTypes = {
    cake: PropTypes.object.isRequired,
    editCake : PropTypes.func.isRequired,
};
