import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {NavLink} from 'react-router-dom';

class Filters extends React.Component {

    componentDidMount(){
        this.props.onFilter(this.props.activeFilter);
    }


    createProject = (project) => {
        return (
            <NavLink key = {`#${project}`} to = {`/tasks/${project}`}><ListGroup.Item action active = {this.props.activeFilter === project ? true : false} onClick = {() => this.props.onFilter(project)}>{project}</ListGroup.Item></NavLink>
        );
    }
    
    render() {
        return (
            <>
                <ListGroup  variant="flush">
                    <NavLink key = "#all" to = "/tasks"><ListGroup.Item action active = {this.props.activeFilter === "all" ? true : false} id = "filter-all" onClick = {() => this.props.onFilter("all")}>All</ListGroup.Item></NavLink>
                    <NavLink key = "#important" to = "/tasks/important"><ListGroup.Item action active = {this.props.activeFilter === "important" ? true : false} id = "filter-important" onClick = {() => this.props.onFilter("important")}>Important</ListGroup.Item></NavLink>
                    <NavLink key = "#today" to = "/tasks/today"><ListGroup.Item action active = {this.props.activeFilter === "today" ? true : false} id = "filter-today" onClick = {() => this.props.onFilter("today")}>Today</ListGroup.Item></NavLink>
                    <NavLink key = "#week" to = "/tasks/week"><ListGroup.Item action active = {this.props.activeFilter === "week" ? true : false} id = "filter-week" onClick = {() => this.props.onFilter("week")}>Next 7 Days</ListGroup.Item></NavLink>
                    <NavLink key = "#private" to = "/tasks/private"><ListGroup.Item action active = {this.props.activeFilter === "private" ? true : false} id = "filter-private" onClick = {() => this.props.onFilter("private")}>Private</ListGroup.Item></NavLink>
                    <NavLink key = "#shared" to = "/tasks/shared"><ListGroup.Item action active = {this.props.activeFilter === "shared" ? true : false} id = "filter-shared" onClick = {() => this.props.onFilter("shared")}>Shared With...</ListGroup.Item></NavLink>
                    <ListGroup.Item className="p-3 mt-5 list-title">Projects</ListGroup.Item>
                    {this.props.projects.map(this.createProject) }
                </ListGroup>
            </>
        );
    }
}

export default Filters;
