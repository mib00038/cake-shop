import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import EditCakeDialogButton from './EditCakeDialogButton';

export default class CakeCard extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      cake: this.props.cake,
      expanded: this.props.cake.expanded,
    };
  };

  componentWillReceiveProps( nextProps ){
    if ( typeof nextProps.cake !== 'undefined' ) {
      this.setState({
        cake: nextProps.cake,
        expanded: nextProps.cake.expanded,
      });
    }
  }

  handleDeleteButton(){
    this.props.deleteCake( this.state.cake.id );
  }

  handleExpandChange( expanded ){
    this.setState({ expanded: expanded });
    this.props.onExpandChange( this.state.cake, expanded );

  }

  render() {
    const style = {
      margin: 12,
    };

    return (
      <Card
        expanded={ this.state.expanded }
        onExpandChange={ this.handleExpandChange.bind( this ) }
        style={ style }
      >
        <CardHeader
          title={ this.state.expanded ? '' : this.state.cake.title }
          actAsExpander={ true }
          showExpandableButton={ true }
        />
        <CardMedia
          overlay={
            <CardTitle
              title={ this.state.cake.title }
            />
          }
          expandable={ true }
        >
          <img
            src={ this.state.cake.image }
            alt=""
          />
        </CardMedia>
        <CardText
          expandable={ true }
        >
          { this.state.cake.desc }
        </CardText>
        <CardActions
          className="flex-container"
          expandable={ true }
        >
          <EditCakeDialogButton
            className="flex-item"
            cake={ this.state.cake }
            editCake={ this.props.editCake }
            style={ style }
          />
          < RaisedButton
            label="Delete"
            primary={ true }
            onTouchTap={ this.handleDeleteButton.bind( this ) }
            className="flex-item"
            style={ style }
          />
        </CardActions>
      </Card>
    )
  }
}

CakeCard.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

CakeCard.propTypes = {
  cake: PropTypes.object.isRequired,
  onExpandChange: PropTypes.func.isRequired,
  deleteCake: PropTypes.func.isRequired,
  editCake: PropTypes.func.isRequired,
};