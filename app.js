const app = Vue.createApp({
  data() {
    return {
      todoList: [],
      nightMode: false,
    };
  },

  mounted() {
    this.getTodos();
    this.getNightModeSettings();
  },
  watch: {
    todoList: {
      handler: function (updatedList) {
        localStorage.setItem("todo_list", JSON.stringify(updatedList));
      },
      deep: true,
    },
    nightMode: {
      handler: function (updatedSettings) {
        localStorage.setItem("nightModeSettings", JSON.stringify(updatedSettings));
      },
    },
  },

  methods: {
    getTodos() {
      if (localStorage.getItem("todo_list")) {
        this.todoList = JSON.parse(localStorage.getItem("todo_list"));
      }
    },
    getNightModeSettings() {
      if (localStorage.getItem("nightModeSettings")) {
        this.nightMode = JSON.parse(localStorage.getItem("nightModeSettings"));
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
    addTodo2(event) {
      this.todoList.push({
        id: new Date().getTime(),
        text: event,
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
    addNightModeClass() {
      if (this.nightMode) {
        document.body.classList.add("night-mode");
      } else {
        document.body.classList.remove("night-mode");
      }
      return { "night-mode": this.nightMode };
    },
  },
});

app.mount("#app");
