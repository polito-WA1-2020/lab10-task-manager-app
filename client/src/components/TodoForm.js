import React from 'react';
import Button from'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.task){
      this.state = {...this.props.task};
      if(this.props.task.deadline){
        this.state.deadlineDate = this.props.task.deadline.format("YYYY-MM-DD");
        this.state.deadlineTime = this.props.task.deadline.format("HH:mm");
      }
    } else {
      this.state = {description: '', project: '', important: false, privateTask: true, deadlineDate: '', deadlineTime: ''};
    }

    this.state.submitted = false;
  }

  updateField = (name, value) => {
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let task = Object.assign({}, this.state);
      // set a single deadline
      if(task.deadlineDate && task.deadlineTime && task.deadlineDate !== "" && task.deadlineTime !== "")
        task.deadline = moment(task.deadlineDate + " " + task.deadlineTime);
      else if(task.deadlineDate && task.deadlineDate !== "")
        task.deadline = moment(task.deadlineDate);
      
      this.props.addOrEditTask(task);
      this.setState({submitted : true});
    }
  }

  render() {
    if (this.state.submitted)
      return <Redirect to='/' />;
    return(
      <AuthContext.Consumer>
      {(context) => (
        <>
          {!this.props.task && <h1>Add a Task</h1>}
          {this.props.task && <h1>Update Task</h1>}

          <Form method="POST" onSubmit={(event) => this.handleSubmit(event)}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Type a description..." value = {this.state.description} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} required autoFocus/>
              </Form.Group>

              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control type="text" name="project" placeholder="Type a project for the task..." value = {this.state.project} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
              </Form.Group>

              <Form.Group controlId="important">
                <Form.Check type="checkbox" label="Important" id="important" name="important" checked = {this.state.important} onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)} />
              </Form.Group>

              <Form.Group controlId="private">
                <Form.Check type="checkbox" label="Private" id="private" name="privateTask" onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)} checked={this.state.privateTask}/>
              </Form.Group>

              <Form.Group controlId="deadline-date">
                <Form.Label>Deadline</Form.Label>
                <Form.Control type="date" name="deadlineDate" value = {this.state.deadlineDate} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
              </Form.Group>

              <Form.Group controlId="deadline-time">
                <Form.Control type="time" name="deadlineTime" value = {this.state.deadlineTime} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">{this.state.id? 'Update': 'Add'}</Button>
                <Link to = "/tasks">Cancel</Link>

              </Form.Group>
          </Form>
        </>
      )}
      </AuthContext.Consumer>
    );
    
  }
}

export default TodoForm;