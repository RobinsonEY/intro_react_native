import React, { createContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home.view';
import Login from './screens/login.view';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { getTodos } from './services/todo-service';
import { getTodosFakeData } from './services/todo-service';

const mockUser = {
  username: 'JuanPerezEY',
  name: 'Juan',
  lastname: 'Perez'
}

export const UserContext = createContext(mockUser)

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}