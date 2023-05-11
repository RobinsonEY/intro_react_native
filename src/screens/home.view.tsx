import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { ITodo } from '../models/todo.model';
import { getTodos, getTodosFakeData } from '../services/todo-service';
import TodoList from '../components/todo-list';
import Menu from '../components/menu';
import EditTodoView from './edit-todo.view';
import { useSelector } from 'react-redux';
import { IUser } from '../models/user.model';


export default function Home() {

  const user:IUser = useSelector((state:any) => state.user);

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
    getTodosFakeData().then((data) => {
      setData([...data]);
    })
  }, []);


  return (
        <SafeAreaView style={styles.container}>
            <Text  style={styles.title}>Daily Tasks: {user.username}</Text>
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