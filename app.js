const app = Vue.createApp({
  data() {
    return {
      todoList: [],
    };
  },

  mounted() {
    this.getTodos();
  },
  watch: {
    todoList: {
      handler: function (updatedList) {
        localStorage.setItem("todo_list", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },

  methods: {
    getTodos() {
      if (localStorage.getItem("todo_list")) {
        this.todoList = JSON.parse(localStorage.getItem("todo_list"));
      }
    },
    addTodo(event) {
      this.todoList.push({
        id: new Date().getTime(),
        text: event.target.value,
        completed: false,
      });

      event.target.value = "";
      return true;
    },
    removeItem(todoItem) {
      this.todoList = this.todoList.filter((todo) => todo !== todoItem);
    },
  },

  computed: {
    completedItemCount() {
      return this.todoList.filter((t) => t.completed).length;
    },
    unCompletedItemCount() {
      return this.todoList.filter((t) => !t.completed).length;
    },
  },
});

app.mount("#app");
