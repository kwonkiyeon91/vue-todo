<template>
  <div>
    <ul>
        <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
            <span class="checkBtn material-symbols-outlined" 
                v-bind:class="{checkBtnCompleted: todoItem.completed}" 
                v-on:click="toggleComplete(todoItem, index)">
                check_circle
            </span>
            <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
            <span class="material-symbols-outlined removeBtn" v-on:click="removeTodo(todoItem, index)">
                delete
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {    
 data() {
    return {
        todoItems: []
    }
 },
 methods: {
    removeTodo(todoItem, index) {
        this.todoItems.splice(index, 1);
        localStorage.removeItem(todoItem, index)
    },
    toggleComplete(todoItem) {
        todoItem.completed = !todoItem.completed
        // 로컬스토리지에 데이터 갱신
        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
 },
 created: function() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
           this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
 }
}
</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    text-align: left;
}
li {
    display:flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    color: #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
    font-size: 29px;
    margin-top: 10px;
}
</style>