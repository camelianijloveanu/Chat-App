// import react and react-native elements
import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

// export Start component
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* avoids hiding the chatOptions box when using keyboard */}
      <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    enabled>
        <ImageBackground
          style={styles.imgBackground}
          source={require('../assets/Background-Image.png')}
        >
          <View style={styles.main}>
            <Text style={styles.title}>Let's Chat</Text>
          </View>
          <View style={styles.chatOptions}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
            <View style={styles.box}>
              <Text
                style={styles.backgroundColorText}>
                Choose Background Color:
              </Text>
              {/* background color options for user to choose */}
              <View style={styles.color}>
                <TouchableOpacity
                  style={styles.color1}
                  onPress={() => this.setState({ color: '#090C08' })}
                />
                <TouchableOpacity
                  style={styles.color2}
                  onPress={() => this.setState({ color: '#474056' })}
                />
                <TouchableOpacity
                  style={styles.color3}
                  onPress={() => this.setState({ color: '#8A95A5' })}
                />
                <TouchableOpacity
                  style={styles.color4}
                  onPress={() => this.setState({ color: '#B9C6AE' })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
            >
              <Text style={styles.startText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 50,
  },
  main: {
    flex: 0.50, 
 },
  chatOptions: {
    flex: 0.40,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 5,
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-around',
  },
  nameInput: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: '2%',
    opacity: 50,
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757083',
    marginBottom: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: '#757083',
    height: 60,
    borderRadius: 5,
  },
  startText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 60,
  },
  color: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})