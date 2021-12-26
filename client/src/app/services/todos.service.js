import httpService from "./http.service";

const todosEndPoint = "todos/";

const todosService = {
    fetchAll: async (userId) => {
        //    console.log("fetchAll", userId);
        const { data } = await httpService.get(todosEndPoint, {
            params: { userId },
        });

        return data;
    },

    add: async (todo) => {
        console.log("add payload", todo);
        const { data } = await httpService.post(todosEndPoint + "add", todo);
        console.log("todosService", data);
        return data;
    },

    update: async (payload) => {
        console.log("payload", payload);
        const { data } = await httpService.post(todosEndPoint + "add", payload);
        console.log("todosService", data);
        return data;
    },

    inWork: async (payload) => {
        console.log("payload", payload);
        const { data } = await httpService.post(todosEndPoint + "add", payload);
        console.log("todosService", data);
        return data;
    },

    important: async (id) => {
        const { data } = await httpService.put(
            todosEndPoint + `important/${id}`,
            { id }
        );
        return data;
    },

    complete: async (id) => {
        console.log("complete todo", id);
        const { data } = await httpService.put(
            todosEndPoint + `complete/${id}`,
            { id }
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
