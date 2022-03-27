import React from 'react';
import UIComposer from './wireframe/UIComposer';
import themeList from './themes';
import { LicenseInfo } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey(
  'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);

class PutTogether extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
        themes: themeList,
        curThemeInfo: themeList[0]
    }

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(themeName) {
    for(var i = 0; i < this.state.themes.length; i++) {
      const theme = this.state.themes[i];
      if(theme.themeName === themeName) {
        this.setState({
          curThemeInfo: theme
        });
        break;
      }
    }
  }

  render() {
    return(
      <UIComposer 
        themes={ this.state.themes } 
        curThemeInfo={ this.state.curThemeInfo } 
        changeTheme={ this.changeTheme }
      />
    );
  }
}

export default PutTogether;