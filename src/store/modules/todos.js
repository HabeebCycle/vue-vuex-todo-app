import axios from "axios";

const state = {
  todos: [],
  loading: false,
};

const getters = {
  allTodos: (state) => state.todos,
  isLoading: (state) => state.loading,
};

const actions = {
  async fetchTodos({ commit }) {
    commit("setLoading", true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setLoading", false);
    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    commit("setLoading", true);
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("setLoading", false);
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    commit("setLoading", true);
    await await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    commit("setLoading", false);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    commit("setLoading", true);
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setLoading", false);
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, todo) {
    commit("setLoading", true);
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`
    );
    commit("setLoading", false);
    if (response.status === 200) commit("updateTodo", todo);
  },
};

const mutations = {
  setLoading: (state, isLoading) => (state.loading = isLoading),
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
