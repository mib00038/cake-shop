import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import './index.css';

const AppWrapper = () => (
  <MuiThemeProvider muiTheme={ getMuiTheme( darkBaseTheme ) } >
      <App/>
  </ MuiThemeProvider >
);

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);
