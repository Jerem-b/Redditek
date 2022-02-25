import * as React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

class FiltersButton extends React.Component {
  constructor() {
    super();
    this.filters = [
      {name: 'New', value: '/new'},
      {name: 'Hot', value: '/hot'},
      {name: 'Top', value: '/top'},
      {name: 'Controversial', value: '/controversial'},
    ];
  }

  render() {
    var filtersButton = [];

    for (const [index, {name, value}] of this.filters.entries()) {
      filtersButton.push(
        <Button
          key={index}
          mode="outlined"
          color={this.props.filter === value ? '#FF5700' : 'black'}
          onPress={() => {
            this.props.changeFilter(value);
          }}>
          {name}
        </Button>,
      );
    }

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {filtersButton}
      </View>
    );
  }
}

export default FiltersButton;
