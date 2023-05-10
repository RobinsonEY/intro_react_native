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

  const [data, setData] = useState<ITodo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onAddTodo = () => { setIsModalVisible(true) }
  const onCloseEditTodo = () => { setIsModalVisible(false) }
  const onSaveTodo = (data: ITodo) => { setData((d) => [...d, data]); setIsModalVisible(false) }

  const onDeleteTodo = (index: number) => {
    let oldData = [...data];
    oldData.splice(index, 1)
    setData([...oldData])
  }

  //Cuando corre por primera vez
  useEffect(() => {
    getTodosFakeData().then((data) => {
      setData([...data]);
    })
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={mockUser} >
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerShown: false 
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: 'black'
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  linearGradient: {
    paddingBottom: 20
  },
});