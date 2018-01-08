/*
 * OVERVIEW:
 * In fact, what we are doing here works as follows:
 * First of all, we get the selected property from the HTML code thanks to single tab props
 * Then, we bind it to a data variable, isActive
 * Each element is going to have its class name controlled thanks to the isActive value
 * Thus, when we load the page for the first time, each tab's selected value is first computed to false or gotten
 * from the tag
 * Then, those values are bind to the isActive property, which is going to control the class name in our tabs list
 */


Vue.component("tabs", {
    template: `
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{'is-active': tab.isActive}">
                    <a @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
    `,
    data() {
        return {
            // We need to provide a default value for our tabs variable
            tabs: []
        }

    }
    ,
    mounted() {
        // Children only lists vue children
        console.log(this.$children);
    },
    // Method executed upon creation of the element
    created() {
        // We get the list of tabs by reading the children variable
        this.tabs = this.$children;
    },
    methods: {
        // This method works, however it throws an error so you shouldn't use it with tab.selected but with isActive
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            })
        }
    }
});

Vue.component("tab", {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,
    props: {
        // Every tab we create requires a name
        name: {required: true},
        /* The selected property is used to retrieve the property from the tag - if a tab needs to be selected by default
         * Then we are going to use the variable isActive on the data in order to select tabs thanks to the binding
         */
        selected: {default: false}
    },
    data() {
        return {
            // The property we are going to use in order to have control over selected tabs
            isActive: false
        }
    },
    mounted() {
        // Binding the isActive data to the selected property
        this.isActive = this.selected
    }
});

new Vue({
    el: '#root'
});