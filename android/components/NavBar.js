import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from '../Pages/Home.js';
import Profil from '../Pages/Profile.js';
import Settings from '../Pages/Settings.js';
import Search from '../Pages/Search.js';

class NavBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      index: 1,
      routes: [
        {key: 'settings', title: '', icon: 'cog'},
        {key: 'home', title: '', icon: 'home'},
        {key: 'search', title: '', icon: 'magnify'},
        {key: 'profile', title: '', icon: 'account'},
      ],
    };
  }

  handleIndexChange = index => this.setState({index});

  renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profil,
    search: Search,
    settings: Settings,
  });

  render() {
    return (
      <BottomNavigation
        barStyle={{backgroundColor: '#FF5700'}}
        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={this.renderScene}
      />
    );
  }
}

export default NavBar;
