<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"/>
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer material-symbols-outlined addBtn" v-on:click="addTodo">
        add
    </span>
  </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo() {
            if (this.newTodoItem !== '') { // newTodoItem 이 무조건 값이 있을때
                this.$emit('add-todo-item', this.newTodoItem);
                this.clearInput();
            }
        },
        clearInput() {
            this.newTodoItem = '';
        }
    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: #fff;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    height: 100%;
    color:#fff;
    border-radius: 0 5px 5px 0;
    font-size: 40px;
    padding-top: 5px;
    box-sizing: border-box;
    vertical-align: middle;
}
</style>