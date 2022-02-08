import React from 'react';
import UIComposer from './wireframe/UIComposer';
import themeList from './themes';

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