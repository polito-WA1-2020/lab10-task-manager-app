import React,{ useEffect } from 'react';
import TodoItem from './TodoItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'

const TodoList = (props) => {

  let {mode, tasks, editTask, updateTask, deleteTask, getPublicTasks} = props;

  //same as componentDidMount()
  useEffect(() => {
    if(mode === "public"){
      getPublicTasks();
    }
  }, []);


  return(
    <AuthContext.Consumer>
      {(context) => (
        <>
        {context.authErr && <Redirect to = "/login"></Redirect>}
        
        {tasks && 
        <ListGroup as="ul" variant="flush">
          {tasks.map((task) => <TodoItem mode = {mode} key = {task.id} task = {task} editTask = {editTask} updateTask = {updateTask} deleteTask = {deleteTask} />) }
        </ListGroup>}
        </>
      )}
    </AuthContext.Consumer>
  );
}

export default TodoList;
