import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const [id, setId] = useState(1)
    const url = 'http://127.0.0.1:8000/api/tasks/'


    useEffect(() => {
        axios.get(url, {
            headers: {
            'Authorization': 'Token 967415e7c0efce69a6260b8919faa3f548c10efe'
        }})
        .then(res => {setTasks(res.data)})
    }, [])

    const getTask = () => {
        axios.get(url + `${id}/`, {
            headers: {
            'Authorization': 'Token 967415e7c0efce69a6260b8919faa3f548c10efe'
        }})
        .then(res => {setSelectedTask(res.data)})
    }

    const deleteTask = (id) => {
        axios.delete(url + `${id}/`, {
            headers: {
            'Authorization': 'Token 967415e7c0efce69a6260b8919faa3f548c10efe'
        }})
        .then(res => {setTasks(tasks.filter(task => task.id !== id)); setSelectedTask([])})
    }


    return (
        <div>
            <ul>
                {
                    tasks.map(task => <li key={task.id}>{task.title} {task.id}
                    
                    <button onClick={() => deleteTask(task.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    
                    </li>)
                }

                Set id<br/>
                <input type="text" value={id} onChange={evt => setId(evt.target.value)}/>
                <br/>
                <button type="button" onClick={() => getTask()}>Get Task</button>
                {/* <button type="button" onClick={() => deleteTask()}>Delete Task</button> */}
                <h3>{selectedTask.title} {selectedTask.id}</h3>
            </ul>
        </div>
    )
}

export default DrfApiFetch
