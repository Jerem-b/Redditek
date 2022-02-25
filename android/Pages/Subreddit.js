import * as React from 'react';
import {FlatList, View, Dimensions, StyleSheet} from 'react-native';
import {Card, Text, Button, IconButton} from 'react-native-paper';
import Image from 'react-native-auto-scale-image';
import FiltersButton from '../components/FiltersButton';
import {APIgetContent, APIsubscribe} from '../API';

class Subreddit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      contents: [],
      subscribed: props.subreddit.data.user_is_subscriber,
    };
    this.after = null;
    this.filter = '/new';
    this.loadingExtraData = false;
  }

  componentDidMount() {
    this.loadContents();
  }

  loadContents(after = null) {
    APIgetContent(
      `/${this.props.subreddit.data.display_name_prefixed}${this.filter}`,
      after,
    )
      .then(response => response.json())
      .then(contents => {
        var datas = [];

        this.after = contents.data.after;
        for (const content of contents.data.children) {
          datas.push(content.data);
        }
        this.setState({contents: [...this.state.contents, ...datas]});
      })
      .catch(err => console.log(`error during load contents: ${err}`))
      .finally(() => (this.loadingExtraData = false));
  }

  loadMoreContents = () => {
    if (!this.loadingExtraData) {
      this.loadingExtraData = true;
      this.loadContents(this.after);
    }
  };

  renderContent = ({item}) => {
    return (
      <Card style={{marginBottom: 20}}>
        <Text>r/{item.subreddit}</Text>
        {item.preview !== undefined && (
          <Image
            style={{
              width: Dimensions.get('window').width,
            }}
            uri={item.preview.images[0].source.url.replace('amp;', '')}
          />
        )}
        <Card.Actions style={{marginTop: -10, marginBottom: -15}}>
          <IconButton size={20} icon="arrow-up-bold-outline"></IconButton>
          <Text>{item.ups}</Text>
          <IconButton size={20} icon="arrow-down-bold-outline"></IconButton>
          <IconButton size={20} icon="message-outline"></IconButton>
          <IconButton size={20} icon="share-outline"></IconButton>
        </Card.Actions>
        <Card.Content style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold'}}>u/{item.author} </Text>
          <Text>{item.title}</Text>
        </Card.Content>
      </Card>
    );
  };

  changeFilter = newValue => {
    this.filter = newValue;
    this.after = null;
    this.setState({contents: []}, this.loadContents);
  };

  subscribe = () => {
    this.setState({subscribed: !this.state.subscribed}, () => {
      const action = this.state.subscribed ? 'sub' : 'unsub';
      APIsubscribe(action, this.props.subreddit.data.name);
    });
  };

  render() {
    var uri =
      'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png';
    if (
      this.props.subreddit.data.header_img !== '' &&
      this.props.subreddit.data.header_img !== undefined &&
      this.props.subreddit.data.header_img !== null
    ) {
      uri = this.props.subreddit.data.header_img.replace('amp;', '');
    }

    return (
      <View>
        <Card>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={{
                width: Dimensions.get('window').width / 8,
              }}
              uri={uri}
            />
            <Button
              color="#FF5700"
              mode="outlined"
              style={style.button}
              onPress={this.subscribe}>
              {this.state.subscribed ? 'joined' : 'join'}
            </Button>
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 13}}>
              {' '}
              {this.props.subreddit.data.display_name}{' '}
            </Text>
            <Text style={{fontSize: 13}}>
              {' '}
              {this.props.subreddit.data.title}{' '}
            </Text>
            <Text style={{fontSize: 13}}>
              {' '}
              {this.props.subreddit.data.subscribers} subscribers
            </Text>
          </Card.Content>
          <Text style={{fontSize: 12}}>
            {' '}
            {this.props.subreddit.data.public_description}{' '}
          </Text>
        </Card>
        <FiltersButton filter={this.filter} changeFilter={this.changeFilter} />
        <FlatList
          data={this.state.contents}
          renderItem={this.renderContent}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreContents}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  button: {
    marginBottom: 10,
    backgroundColor: '#dee1e3',
  },
});

export default Subreddit;
