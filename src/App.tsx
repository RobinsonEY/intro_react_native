import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Menu from './components/menu';
import TodoList from './components/todo-list';
import { ITodo } from './models/todo.model';
import EditTodoView from './screens/edit-todo.view';
import { getTodosFakeData } from './services/todo-service';
import { Text } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home.view';
import Login from './screens/login.view';

const mockUser = {
  username: 'JuanPerezEY',
  name: 'Juan',
  lastname: 'Perez'
}

export const UserContext = createContext(mockUser)

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <UserContext.Provider value={mockUser} >
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false 
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}