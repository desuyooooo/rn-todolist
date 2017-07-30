import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, Button, ToastAndroid, FlatList, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      desc: '',
      items: [
        {key: 1, title: 'eat', desc: 'now'},
        {key: 2, title: 'sleep', desc: 'later'}
      ]
    };
  }

  render() {
    return (
      <View style={styles.view}>
        <StatusBar
          hidden={false}
        />
        <TextInput
          onChangeText={(title) => this.setState({title})}
          placeholder='What should I do?'
          style={styles.textInput}
          value={this.state.title}
        />
        <TextInput
          onChangeText={(desc) => this.setState({desc})}
          placeholder='uhh what'
          style={styles.textInput}
          value={this.state.desc}
        />
        <View style={styles.button}>
        <Button 
          color='#e91e63'
          disabled={this.state.title=='' || this.state.desc==''}
          onPress={this.addItem.bind(this)}
          style={styles.button}
          title='ADD'
        />
        </View>
        <FlatList
          data={this.state.items}
          renderItem={
            ({item}) => 
            <Todo>{item.title} - {item.desc}</Todo>
            }
        />

      </View>
    );
  }

  addItem(){
    ToastAndroid.show('Added a To Do', ToastAndroid.SHORT);
    this.setState((prevState)=>{
      return{
        items: this.state.items.concat([{
          key: this.state.items.length + 1,
          title: this.state.title,
          desc: this.state.desc
        }]),
        title:'',
        desc:''
      }})
  }

}

class Todo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      checked: false,
      style: {}
    };
  }

	handleChange() {
      this.setState({checked: !this.state.checked});
      if (!this.state.checked){
        this.setState({style: {textDecorationLine: 'line-through'}})
      } else {
        this.setState({style: {}})
      }
	}

  render () {
		return (
      <View>
        <CheckBox
          checked={this.state.checked}
          onIconPress={this.handleChange.bind(this)}
          textStyle={this.state.style}
          title={this.props.children.join(' ')}
        />
      </View>
    );
	}
}

const styles = StyleSheet.create({
    view: {
      backgroundColor:'#e0f2f1',
      flex: 1,
      padding: 50
    },
    textInput: {
      height: 46, 
      fontSize: 24,
      marginLeft: 10,
      marginRight: 10,
      padding: 10
    },
    button: {
      padding: 10
    }
  });