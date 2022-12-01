import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
 fetch() {
    const arr = [];
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
    return arr;
 },
}
export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    getters: {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: { //methods
        addOneItem(state, todoItem) {
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload) {
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
            // 로컬스토리지에 데이터 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItem(state) {
            state.todoItems = [];
            localStorage.clear();
        }
    }
});