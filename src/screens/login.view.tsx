import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { UserContext } from '../App';
import { useDispatch } from 'react-redux';
import { getTodosFakeData } from '../services/todo-service';
import { addUser } from '../redux/user-slice';

export default function Login ({navigation}) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    getTodosFakeData().then((todos) => {
      dispatch(addUser({name:'Robin',username:'MiGu31',email:'test@test.com'}))
      console.log("todostodos", todos)
    })
  },[])

  const user = useContext(UserContext);
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HeyAPP</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}
              onPress={() =>
                navigation.navigate('Home')
              }>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
  
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

function render() {
    throw new Error('Function not implemented.');
}
