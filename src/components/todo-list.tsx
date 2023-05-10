import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import { ITodo } from "../models/todo.model";
import { Button, ListItem } from '@rneui/themed';



interface ITodoListProps {
  data: ITodo[],
  onDeleteTodo: (index: number) => void
}

const ButtonContent = (props: {title:string,icon:{name:string,color:string}, buttonStyle:{minHeight:string,backgroundColor:string}, action:(index:number)=>void, arrayIndex:number}) => {
  return (
    <Button
      title={props.title}
      icon={{ name: props.icon.name, color: props.icon.color }}
      buttonStyle={{ minHeight: props.buttonStyle.minHeight, backgroundColor: props.buttonStyle.backgroundColor}}
      onPress={() =>  { props.action(props.arrayIndex)} }
    />)
}

const TodoList = (props: ITodoListProps) => {

  const onDeleteTodo = (index:number) => {
    props.onDeleteTodo(index);
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        props.data.map((element, index) => {
          return (<ListItem.Swipeable
            style={styles.listItemSwipeable}
            key={element.id} 
            leftContent={<ButtonContent icon={{ name: 'info', color: 'white' }} buttonStyle={{ minHeight: '100%',backgroundColor:'lightblue' }} title="Info" action={onDeleteTodo} arrayIndex={index}/>}
            rightContent={<ButtonContent icon={{ name: 'delete', color: 'white' }} buttonStyle={{ minHeight: '100%', backgroundColor:'red' }} title="Delete" action={onDeleteTodo} arrayIndex={index}/>}
          >
            <ListItem.Content>
              <ListItem.Title>{element.text}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />

          </ListItem.Swipeable>)
        })
      }
    </SafeAreaView>
  );
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    overflow: 'scroll',
  },
  listItemSwipeable : {
    backgroundColor:'#F0F0F0',
    borderColor:'#F0F0F0',
    height: '100%',
    borderWidth: 0.5
  }
});