import React, { useRef } from "react";
import AddTask from "./addTask";
import Statistic from "./statistic";
import TodoList from "./todoList";

const Board = ({ board, ...props }) => {
    const boardStyle = {
        "add task": "add-stat",
        "new tasks": "tasks",
        "in progress": "in-progress",
        finished: "finished",
    };
    const ref = useRef(null);

    const { onDragOver, onDragLeave, onDragEnd, onDrop, currentTask, statistic } = props;

    return (
        <>
            {board.title === "add task" ? (
                <div
                    className={
                        "col-12 col-md-6 col-lg-3 coloumn-" + boardStyle[board.title]
                    }
                >
                    <div className="coloumn-header ">
                        <h4>{board.title}</h4>
                    </div>
                    <hr />
                    <AddTask />
                    <div className="coloumn-header header-statitics">
                        <h4>statistic</h4>
                    </div>
                    <hr />
                    <Statistic statistic={statistic} />
                </div>
            ) : (
                board.tasks && (
                    <div
                        className={
                            "col-12 col-md-6 col-lg-3 d-flex flex-column coloumn-" +
                            boardStyle[board.title]
                        }
                        ref={ref}
                        onDragLeave={(e) => onDragLeave(e, ref)}
                        onDragOver={(e) => onDragOver(e, ref)}
                        onDragEnd={(e) => onDragEnd(e, ref)}
                        onDrop={(e) => onDrop(e, board, currentTask)}
                    >
                        <div className="coloumn-header">
                            <h4>{board.title}</h4>
                        </div>
                        <hr />
                        <div className="coloumn-content">
                            <TodoList
                                // board={board.title}
                                // todos={board.tasks}
                                board={board}
                                {...props}
                            />
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Board;
