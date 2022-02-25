import * as React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Searchbar, Avatar, Card} from 'react-native-paper';
import {APIgetPopularSubreddit, APIsearchSubreddits} from '../API';
import Subreddit from './Subreddit';

class Search extends React.Component {
  constructor() {
    super(),
      (this.state = {
        searchQuery: '',
        subreddits: [],
        isSubredditFocused: false,
      });
    this.focusedSubreddit = null;
    this.after = null;
  }

  componentDidMount() {
    this.search();
  }

  search(after = null) {
    if (this.state.searchQuery === '') {
      APIgetPopularSubreddit(after)
        .then(response => response.json())
        .then(subreddits => {
          this.setState({
            subreddits: [...this.state.subreddits, ...subreddits.data.children],
          });
          this.after = subreddits.data.after;
        })
        .catch(err => console.log(err));
    } else {
      APIsearchSubreddits(this.state.searchQuery, after)
        .then(response => response.json())
        .then(subreddits => {
          this.setState({
            subreddits: [...this.state.subreddits, ...subreddits.data.children],
          });
          this.after = subreddits.data.after;
        })
        .catch(err => console.log(err));
    }
  }

  //xD
  searchMore = () => {
    if (this.after !== null) {
      this.search(this.after);
    }
  };

  focusSubreddit = item => {
    this.focusedSubreddit = item;
    this.setState({isSubredditFocused: true});
  };

  unfocusSubreddit = () => {
    this.focusedSubreddit = null;
    this.setState({isSubredditFocused: false});
  };

  renderSubreddit = ({item}) => {
    var uri =
      'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png';
    if (
      item.data.community_icon !== '' &&
      item.data.community_icon !== undefined &&
      item.data.community_icon !== null
    ) {
      uri = item.data.community_icon.replace('amp;', '');
    }

    return (
      <TouchableOpacity onPress={() => this.focusSubreddit(item)}>
        <Card pointerEvents="none">
          <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image
              style={{backgroundColor: 'transparent'}}
              source={{uri: uri}}
            />
            <Text style={{paddingLeft: 30}}>{item.data.display_name}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    var content;

    if (this.state.isSubredditFocused) {
      return (
        <Subreddit subreddit={this.focusedSubreddit} unfocus={this.unfocus} />
      );
    }

    if (this.state.subreddits.length === 0) {
      content = (
        <ActivityIndicator
          style={{margin: '50%'}}
          size="large"
          color="#FF5700"
        />
      );
    } else {
      content = (
        <FlatList
          data={this.state.subreddits}
          renderItem={this.renderSubreddit}
          onEndReachedThreshold={0.5}
          onEndReached={this.searchMore}
        />
      );
    }

    return (
      <View>
        <Searchbar
          placeholder="search"
          icon="magnify"
          onChangeText={query => this.setState({searchQuery: query})}
          onSubmitEditing={() => this.setState({subreddits: []}, this.search)}
        />
        {content}
      </View>
    );
  }
}

export default Search;
