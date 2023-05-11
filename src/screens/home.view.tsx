import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { ITodo } from '../models/todo.model';
import { getTodos, getTodosFakeData } from '../services/todo-service';
import TodoList from '../components/todo-list';
import Menu from '../components/menu';
import EditTodoView from './edit-todo.view';

const mockUser = {
  username: 'JuanPerezEY',
  name: 'Juan',
  lastname: 'Perez'
}

export const UserContext = createContext(mockUser)

export default function Home() {

  const [data, setData] = useState<ITodo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTodo, setEditTodo] = useState<ITodo>();

  const onAddTodo = () => { setIsModalVisible(true) }
  const onCloseEditTodo = () => { setIsModalVisible(false) }
  const onSaveTodo = (todo: ITodo) => { 
    let currentArray = [...data];
    //Si es que ya existe un elemento
    if(currentArray.find(element => element.id == todo.id)){
      let element = currentArray.findIndex(element => element.id == todo.id);
      currentArray[element] = todo;
      setData([...currentArray]);
    }else{
      setData((d) => [...d, todo]); 
    }
    setIsModalVisible(false);
  }

  const onEditTodo = (data: ITodo) => { 
    //setData((d) => [...d, data]);
    setEditTodo(data)
    setIsModalVisible(true);
  }

  const onDeleteTodo = (todo: ITodo) => {
    let oldData = [...data];
    oldData.splice(oldData.indexOf(todo), 1)
    setData([...oldData])
  }

  //Cuando corre por primera vez
  useEffect(() => {
    getTodos().then((data) => {
      console.log("...data",...data)
      setData([...data]);
    })
  }, []);


  return (
        <SafeAreaView style={styles.container}>
            <Text  style={styles.title}>Daily Tasks</Text>
          <ScrollView style={styles.scrollView}>
            <TodoList data={data} onDeleteTodo={onDeleteTodo} onEditTodo={onEditTodo} />
          </ScrollView>
          <Menu onAddTodo={onAddTodo}/>
          {isModalVisible ? (
                  <EditTodoView isVisible={isModalVisible}
                  onClose={onCloseEditTodo}
                  onSave={onSaveTodo}
                  data={editTodo}
                />
          ) : (
            false
          )}

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#003f5c',
    height: '100%',
    width: '100%',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: 'white'
  },
  scrollView: {
    paddingHorizontal: 4,
  },
  linearGradient: {
    paddingBottom:20
  },
});