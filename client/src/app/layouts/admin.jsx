import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../services/localStorage.service";
import Background from "../components/ui/hoc/background";
import UserStatistics from "../components/ui/userStatistics";
import {
    getAllDataLoadingStatus,
    getAllTodos,
    getAllUsers,
    loadAllTodosList,
    loadAllUsersList,
} from "../store/admin";
import { getIsLoggedIn } from "../store/user";
import AdminTable from "../components/ui/adminTable";

const Admin = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const todos = useSelector(getAllTodos());
    const users = useSelector(getAllUsers());
    const dataStatusLoading = useSelector(getAllDataLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadAllUsersList(localStorageService.getUserId()));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (users) {
            dispatch(loadAllTodosList(localStorageService.getUserId()));
        }
    }, [users]);

    const statistics =
        todos && users
            ? users.map((u) => {
                  const user = {};
                  user.data = { ...u };
                  user.allTodos = todos.filter((todo) => todo.user === u._id);
                  user.newTodos = todos.filter((todo) => todo.status === "new");
                  user.inWorkTodos = todos.filter(
                      (todo) => todo.status === "inWork"
                  );
                  user.finishedTodos = todos.filter(
                      (todo) => todo.status === "completed"
                  );
                  return user;
              })
            : [];

    console.log("statistics: ", statistics);
    if (dataStatusLoading || statistics.length === 0) return null;

    if (statistics) {
        return (
            <div className="col-md-8 offset-md-3 shadow d-flex p-3 align-items-center flex-column admin">
                <AdminTable statistics={statistics} />
            </div>
        );
    }
};

export default Admin;
