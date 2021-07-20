// imported react and react-native components
import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import firebase from "../utiliz/firebase";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

export default class Chat extends React.Component{

  constructor(){
    super();

    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    }
  this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

   // add messages to state and database
 addMessage(){
  const message = this.state.messages[0];

  this.referenceChatMessages.add({
    _id: message._id,
    text: message.text || null,
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  })
}



  componentDidMount(){
    //
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    //
        NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
    //
        this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {

              // await firebase.auth().signInAnonymously();
              user ={
                uid: 1,
                name: this.props.route.params.name
              }
            }
         console.log(user)
    //
            this.setState((prevState) => ({
              ...prevState,
              uid: user.uid,
              user:{
                _id: user.uid,
                name: user.name,
                avatar: "https://placeimg.com/158/158/any"
              },
              image: this.state.image,
              location: {
                longitude: 11.5249684,
                latitude: 48.0643933,
              },
            }))

          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
        })
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.referenceChatMessages = () => {}

  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // console.log(querySnapshot)
    // go through each document
    querySnapshot.forEach((doc) => {
    //   // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    })
  }


  /* function called when user sends a message  */
  onSend(messages = []) {

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
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

  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    let color = this.props.route.params.color;


    return (
      <View style={{ flex: 1, backgroundColor: color, height: '100%' }}>
        <GiftedChat
          /* renders Bubble  */
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          isConnected={this.state.isConnected}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {/* prevents keyboard to overlap input field on Android devices  */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    )
  }
}
