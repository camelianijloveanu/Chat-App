// imported react and react-native components
import React from 'react';
import { View, Text } from 'react-native';

// export Chat component
export default class Chat extends React.Component {
  render() {
    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <Text>Welcome to the chat!</Text>
      </View>
    )
  }
}