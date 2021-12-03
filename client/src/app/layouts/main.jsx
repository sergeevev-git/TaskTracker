import React from "react";
import FinishedCard from "../components/ui/taskCards/finishedCard";
import InWorkCard from "../components/ui/taskCards/inWorkCard";
import NewTask from "../components/ui/taskCards/newTask";
import AddTask from "../components/ui/taskCards/addTask";
import Statistic from "../components/ui/taskCards/statistic";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router";

const Main = () => {
    const { isLogin } = useAuth();
    const history = useHistory();
    if (!isLogin) {
        history.push("/login");
    }
    return (
        <main>
            <div className="container-fluid main">
                <div className="row ">
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-add-stat">
                        <h4 className="ms-3 mt-3 mb-0">new task</h4>
                        <hr />
                        <AddTask />
                        <Statistic />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-tasks">
                        <h4 className="ms-3 mt-3 mb-0">tasks</h4>
                        <hr />
                        <NewTask />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-in-progress">
                        <h4 className="ms-3 mt-3 mb-0">in progress</h4>
                        <hr />

                        <InWorkCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-finished">
                        <h4 className="ms-3 mt-3 mb-0">finished</h4>
                        <hr />

                        <FinishedCard />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
