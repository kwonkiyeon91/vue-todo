<template>
  <div id="app">
    <TodoHeader />
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 매서드 명"/> -->
    <TodoInput v-on:add-todo-item="addOneItem"/>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름 ="현재 위치의 컴포넌트 데이터 속성"/> -->
    <TodoList v-bind:propsdata="todoItems" 
            v-on:remove-item="removeOneItem" 
            v-on:toggle-item="toggleOneItem"/>
    <TodoFooter v-on:clear-all-item="clearAllItem"/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  data() {
    return {
        todoItems: []
    }
  },
  methods: {
    addOneItem(todoItem) {
        var obj = {completed: false, item: todoItem};
        localStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
        this.todoItems.splice(index, 1);
        localStorage.removeItem(todoItem.item)
    },
    toggleOneItem(todoItem, index) {
        this.todoItems[index].completed = !this.todoItems[index].completed
        // 로컬스토리지에 데이터 갱신
        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem() {
        this.todoItems = [];
        localStorage.clear();
    }
  },
  created() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
           this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
 }
}
</script>

<style>
body {
    text-align: center;
    background-color: #f6f6f6;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
