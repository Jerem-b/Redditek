import * as React from 'react';
import {Dimensions, View, ActivityIndicator, FlatList} from 'react-native';
import {Text, Card, IconButton} from 'react-native-paper';
import Image from 'react-native-auto-scale-image';
import {APIgetContent} from '../API';
import FiltersButton from '../components/FiltersButton';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      contents: [],
    };
    this.after = null;
    this.filter = '/new';
    this.loadingExtraData = false;
  }

  componentDidMount() {
    this.loadContents();
  }

  loadContents(after = null) {
    APIgetContent(this.filter, after)
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

  //bug if loadMoreContents and changeFilter are call at same time a warning occurs probably due to 'after'
  // KeyExtractor is commented to remove this bug

  render() {
    if (this.state.contents.length === 0) {
      return (
        <ActivityIndicator
          style={{margin: '50%'}}
          size="large"
          color="#FF5700"
        />
      );
    }

    return (
      <View>
        <FiltersButton filter={this.filter} changeFilter={this.changeFilter} />
        <FlatList
          data={this.state.contents}
          renderItem={this.renderContent}
          //keyExtractor={(item, index) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreContents}
        />
      </View>
    );
  }
}

export default Home;
