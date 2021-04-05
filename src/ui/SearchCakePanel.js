import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {cyan500, orange500, grey500} from 'material-ui/styles/colors';

export default class SearchCakePanel extends Component {
  constructor( props ){
    super( props );
    this.state = {
    }
  }

  handleUpdateTitleState( event ){
    let title = event.target.value;
    this.props.onSearchTitleChange( title );
  }

  render(){
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

    const customSearchPanelStyle = {
      margin: 10,
      borderColor: cyan500,
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius:"10px",
    };

    return(
      <div
        style={ customSearchPanelStyle }
      >
        <TextField
          className="flex-item"
          floatingLabelText="Search"
          value={ this.props.title }
          inputStyle={ styles.textFieldStyle }
          style={{ margin: 12 }}
          onChange={ this.handleUpdateTitleState.bind( this ) }
          type="text"
          floatingLabelStyle={ styles.floatingLabelStyle }
          floatingLabelFocusStyle={ styles.floatingLabelFocusStyle }
        />
      </div>
    );
  }
}

SearchCakePanel.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

SearchCakePanel.propTypes = {
  title : PropTypes.string.isRequired,
  onSearchTitleChange: PropTypes.func.isRequired,
};