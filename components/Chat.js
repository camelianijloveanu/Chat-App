// imported react and react-native components
import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';

// export Chat component
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }
  /* function to display system message and welcome message  */
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello ${this.props.route.params.name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: `${this.props.route.params.name} entered the chat`,
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }
  /* function called when user sends a message  */
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  /* function to change bubble style  */
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, backgroundColor: color, height: '100%' }}>
        <GiftedChat
          /* renders Bubble  */
          renderBubble={this.renderBubble.bind(this)}
          /* renders state messages  */
          messages={this.state.messages}
          /* displays last message along with previous ones  */
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* prevents keyboard to overlap input field on Android devices  */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    )
  }
}