import moment from 'moment';

class Task{    

    constructor(id, description, important, privateTask, deadline, project, completed,user) {
        if(id){
            this.id = id;
        }
            
        this.description = description;
        this.important = important;
        this.privateTask = privateTask;

        if(deadline !== undefined){
            this.deadline = moment(new Date(deadline));
        }
        if(project){
            this.project = project;
        }
        this.completed = completed || false;
        this.user = user;
    }

    /**
     * Construct a Task from a plain object
     * @param {{}} json 
     * @return {Task} the newly created Task object
     */
    static from(json) {
        const t =  Object.assign(new Task(), json);
        if(t.deadline){
            t.deadline = moment(new Date(t.deadline));
        }
        return t;
    }

}

export default Task;

