Vue.component('task', {
    // Template for a single task item, the slot is here to get data passed from the html code or somewhere else
    template: '<li><slot></slot></li>'
});

Vue.component('task-list', {
    // Template for a task list creating a lis of tasks according to the data fed below
    // In order to run, you need to wrap it in div tags because it needs at least one root item (???)
    template: '<div><task v-for="task in tasks">{{ task.task }}</task></div>',
    data() {
        return {
            tasks: [
                {task: "Go to the store", complete: true},
                {task: "Finish screencast", complete: false},
                {task: "Clear inbox", complete: false},
                {task: "Make dinner", complete: false},
                {task: "Clean room", complete: true},
            ]
        }
    }
});

Vue.component("message", {
    props: ['title', 'body'],

    data() {
        return {
            isVisible: true
        }
    },

    /* Here v-show indicates that the objects should be visible when the condition is true
     * This is a simple demosntration of how easily you can create a component to make your code more readable
     */
    template: `
    <div>
        <article class="message is-dark" v-show="isVisible">
            <div class="message-header">
                <p>{{ title }}</p>
                <button class="delete" aria-label="delete" @click="hide"></button>
            </div>
            <div class="message-body">
                {{ body }}
            </div>
        </article>
        <button v-show="!isVisible" @click="isVisible = true">Click here to show it again</button>
    </div>
    `,

    methods: {
        /* Method created to impact the isVisible variable in order to make some objects invisible
         * We used this method to test the v-show behaviour
         */
        hide() {
            this.isVisible = false;
        }
    }
});


/* The version of the modal below works, however it is not optimal regarding the code
 * The optimal way to do that is to make the vue responsible for this component by having a variable set to true/false
 * And to use v-show on the modal in the html directly in order to know if it should be shown or not
 * At the beginning, the modal should not be shown because it hides the webpage
 * Then, when clicking on the button, we set the value of the isVisible variable
 * This variable is not available from the modal component, then when closing we cannot just simply set it to false
 * Instead, we are going to send a custom event to the modal, and it is going to react accordingly
 * @see the example below
 */
Vue.component("modal", {
    data() {
        return {
            classmodal: "modal"
        }
    },
    template: `
    <div class="container">
        <button @click="classmodal='modal is-active'">Click here to show the message</button>
    
        <div :class="classmodal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <slot></slot>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="classmodal='modal'"></button>
        </div>
    </div>
    `
});

Vue.component("modalbis", {
    template: `
    
    `
});

new Vue({
    el: '#root',
    data: {
        isModalVisible: false
    }
});