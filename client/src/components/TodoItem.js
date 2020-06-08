import React from 'react';
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom' ;

const TodoItem = (props) => {

  let {mode,task, deleteTask, updateTask} = props;

  const onChangeTask = (ev,task) => {
    if(ev.target.checked) {
      task.completed = true;
      updateTask(task);
    } else {
      task.completed = false;
      updateTask(task);
    }
  }

  return (
    <ListGroup.Item id = {task.id}>
      <div className="d-flex w-100 justify-content-between">
          <div className="custom-control custom-checkbox">
            {mode === "private" && <input type="checkbox" className={task.important ? "custom-control-input important" : "custom-control-input"} id={"check-t" +  task.id} defaultChecked = {task.completed} onChange = {(ev) => onChangeTask(ev,task)}/>}
            {mode === "public" && <input type="checkbox" className={task.important ? "custom-control-input important" : "custom-control-input"} id={"check-t" +  task.id} defaultChecked = {task.completed} disabled />}

            <label className="custom-control-label"  htmlFor={"check-t" +  task.id} >{task.description}</label>
            <span className="badge badge-success ml-4">{task.project}</span>
          </div>
          {!task.privateTask && mode === "public" &&
            <small>{task.user}</small>
          }
          {!task.privateTask && (
                <svg className="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>)}


          {task.deadline &&  (
            <small className = {task.deadline.isBefore(moment()) ? "date bg-danger text-white" : "date"}>{task.deadline.format("dddd, MMMM Do YYYY, h:mm:ss a")} </small>
          )}
          
          {mode === "private" && <div>
            <Link to ={`/task/${task.id}`}><Image width="20" height="20" className="img-button" src="/svg/edit.svg" alt ="" /*onClick={() => editTask(task)}*//></Link>
            <Image width="20" height="20" className="img-button" src="/svg/delete.svg" alt ="" onClick={() => deleteTask(task)}/>
          </div>}

        </div>
    </ListGroup.Item>
  );
}
export default TodoItem;
