import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan500} from 'material-ui/styles/colors';
import CakeForm from './CakeForm';

export default class AddCakeDialogButton extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      openDialog: false,
      title: '',
      desc: '',
      image: '',
    }
  };

  handleOpenAddCakeDialog(){
    this.setState({
      openDialog: true,
    });
  }

  handleCancelButton(){
    this.setState({
      title: '',
      desc: '',
      image: '',
    });

    this.setState({
      openDialog: false,
    });
  }

  handleSubmitButton(){
    this.setState({
      openDialog: false,
    });

    const cakeObj = {
      title: this.state.title,
      desc: this.state.desc,
      image: this.state.image,
      expanded: true,
    };

    this.props.addCake( cakeObj );

    this.setState({
      title: '',
      desc: '',
      image: '',
    })
  }

  renderAddCakeForm(){
    let obj = {
      title:'',
      desc:'',
      image:'',
    };

    return (
      < CakeForm
        cake={ obj }
        title={ this.state.title }
        desc={ this.state.desc }
        image={ this.state.image }
        onCakeFieldChange={ this.handleAddCakeFieldChange.bind( this ) }
      />
    )
  }

  handleAddCakeFieldChange( fieldName, fieldValue ){
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

  render(){
    const style = {
      margin: 12,
    };

    const actions = [
      < RaisedButton
        label="Submit"
        primary={ true }
        onTouchTap={ this.handleSubmitButton.bind( this ) }
        disabled={
          ( this.state.title.localeCompare('') === 0 ) ||
          ( this.state.desc.localeCompare('') === 0 ) ||
          ( this.state.image.localeCompare('') === 0 )
        }
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
          label="Add Cake"
          primary={ true }
          onTouchTap={ this.handleOpenAddCakeDialog.bind( this ) }
        />
        < Dialog
          title="Add Cake"
          actions={ actions }
          actionsContainerClassName="flex-container flex-dialog-box col-12"
          modal={ true }
          open={ this.state.openDialog }
          contentStyle={ customDialogStyle }
        >
          { this.state.openDialog ? this.renderAddCakeForm() : "" }
        </ Dialog>
      </div>
    )
  };
}

AddCakeDialogButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

AddCakeDialogButton.propTypes = {
  addCake : PropTypes.func.isRequired,
};