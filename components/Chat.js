// imported react and react-native components
import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';

// import Firestore to store data in database
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBmfd2GQTer0fjTqbfIjz7OTZxvt-YcEvg",
  authDomain: "chatapp-a91bb.firebaseapp.com",
  projectId: "chatapp-a91bb",
  storageBucket: "chatapp-a91bb.appspot.com",
  messagingSenderId: "548450133327",
  appId: "1:548450133327:web:15ffc54bf255be795a113a",
  measurementId: "G-WRG36DN160"
};

export default class Chat extends React.Component{

  constructor(){
    super();
  
    this.state = {
      messages: [],
      uid: 0,

    }

  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
  this.referenceChatMessages = firebase.firestore().collection("messages");
  }
  

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    })
  }

   // add messages to state and database
 addMessage(){
  const message = this.state.messages[0];

  this.referenceChatMessages.add({
    _id: message._id,
    text: message.text || null,
    createdAt: message.createdAt,
    user: message.user,
  })
}



  componentDidMount(){

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {

      if(!user){
        await firebase.auth().signInAnonymously();
      }
      // update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user:{
          _id: user.uid,
          name: user.name,
          avatar: "https://placeimg.com/158/158/any"
        },
      });

      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
    })


    // listen for updates in collection
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
 }



  /* function called when user sends a message  */
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
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