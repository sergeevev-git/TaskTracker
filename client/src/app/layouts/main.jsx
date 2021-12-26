import React, { useState, useEffect } from "react";
import FinishedCard from "../components/ui/taskCards/finishedTasks";
import InWorkCard from "../components/ui/taskCards/InWorkTasks";
import NewTask from "../components/ui/taskCards/newTask";
import AddTask from "../components/ui/taskCards/addTask";
import Statistic from "../components/ui/taskCards/statistic";
import { useTodos } from "../hooks/useTodos";

import TodoList from "../components/ui/taskCards/todoList";

const Main = () => {
    const { getTodos, todos } = useTodos();
    const [newTodos, setNewTodos] = useState([]);
    const [inWorkTodos, setInWorkTodos] = useState([]);
    const [finishedTodos, setFinishedTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        setNewTodos(todos.filter((todo) => !todo.inwork && !todo.completed));
        setInWorkTodos(todos.filter((todo) => todo.inwork));
        setFinishedTodos(todos.filter((todo) => todo.completed));
    }, [todos]);

    // async function getAllUsers() {
    //     try {
    //         const { data } = await httpService.get("users/allUsers");

    //         setUsers(data.users);
    //         console.log(users);
    //     } catch (error) {
    //         errorCatcher(error);
    //         console.log(error.response);
    //     }
    // }

    // function errorCatcher(error) {
    //     const { message } = error.response.data;
    //     setError(message);
    // }

    return (
        <main>
            <div className="container-fluid main">
                <div className="row ">
                    <div className="col-12 col-md-6 col-lg-3 coloumn-add-stat">
                        <div className="coloumn-header">
                            <h4>new task</h4>
                        </div>
                        <hr />
                        <AddTask />
                        <div className="coloumn-header header-statitics">
                            <h4>statitics</h4>
                        </div>
                        <hr />
                        <Statistic />
                        {/* <button onClick={getAllUsers}>all users</button> */}
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-tasks">
                        <div className="coloumn-header">
                            <h4>tasks</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            {/* <NewTask todos={newTodos} /> */}
                            <TodoList todos={newTodos} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-in-progress">
                        <div className="coloumn-header">
                            <h4>in progress</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            {/* <InWorkCard todos={inWorkTodos} /> */}
                            <TodoList todos={inWorkTodos} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-finished">
                        <div className="coloumn-header">
                            <h4>finished</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            {/* <FinishedCard todos={finishedTodos} /> */}
                            <TodoList todos={finishedTodos} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
