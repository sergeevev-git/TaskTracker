import httpService from "./http.service";

const todosEndPoint = "todos/";

const todosService = {
    fetchAll: async (userId) => {
        const { data } = await httpService.get(todosEndPoint, {
            params: { userId },
        });
        return data;
    },

    add: async (todo) => {
        console.log("add payload", todo);
        const { data } = await httpService.post(todosEndPoint, todo);
        console.log("todosService add", data);
        return data;
    },

    important: async (id) => {
        const { data } = await httpService.put(
            todosEndPoint + `important/${id}`,
            {
                id,
            }
        );
        return data;
    },

    edit: async (payload) => {
        console.log("payload edit", payload);
        const { data } = await httpService.patch(
            todosEndPoint + `edit/${payload._id}`,
            payload
        );
        console.log("todosService edit", data);
        return data;
    },

    new: async (id) => {
        console.log("new payload", id);
        const { data } = await httpService.put(todosEndPoint + `new/${id}`, {
            id,
        });
        console.log("todosService new", data);
        return data;
    },

    inWork: async (id, drop) => {
        console.log("inWork payload", id);
        const { data } = await httpService.put(todosEndPoint + `inwork/${id}`, {
            id,
            drop,
        });
        console.log("todosService inWork", data);
        return data;
    },

    complete: async (id, drop) => {
        console.log("complete todo", id);
        const { data } = await httpService.put(
            todosEndPoint + `complete/${id}`,
            {
                id,
                drop,
            }
        );
        return data;
    },

    delete: async (id) => {
        console.log("delete todo", id);
        const { data } = await httpService.delete(
            todosEndPoint + `delete/${id}`,
            { id }
        );
        console.log("delete todo data", data);
        return data;
    },
};

export default todosService;
