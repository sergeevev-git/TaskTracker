import React from "react";
import "react-toastify/dist/ReactToastify.css";
import useRoutes from "./routes";
import TodosProvider from "./hooks/useTodos";

import "./App.scss";

import Header from "./components/ui/header";
import Footer from "./components/ui/footer";

const App = () => {
    const routes = useRoutes();

    return (
        <div>
            <Header />
            <TodosProvider>{routes}</TodosProvider>
            <Footer />
        </div>
    );
};

export default App;
