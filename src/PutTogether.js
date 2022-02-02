import React from 'react';
import UIComposer from './components/wireframe/UIComposer';
import themeList from './themes/ThemeList';

class PutTogether extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
        themes: themeList,
        curTheme: themeList[0]
    }

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(themeName) {
    for(var i = 0; i < this.state.themes.length; i++) {
      const theme = this.state.themes[i];
      if(theme.themeName === themeName) {
        this.setState({
          curTheme: theme
        });
        break;
      }
    }
  }

  render() {
    return(
      <UIComposer 
        themes={this.state.themes} 
        curTheme={ this.state.curTheme } 
        changeTheme={ this.changeTheme }
      />
    );
  }
}

export default PutTogether;