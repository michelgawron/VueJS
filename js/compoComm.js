/**
 * Creating a custom object to handle our events
 * In order to fire an event you should use EventBus.$emit
 * In order to receive an event you should use EventBus.$on on a component's (or the general Vue) created() method
 * @type {Vue}
 */
EventBus = new Vue();

Vue.component("coupon", {
    data() {
        return {
            valueC: ''
        }
    },
    template: `
        <input :placeholder="myph" @blur="this.onCouponAppliedEvent" v-model="valueC">
    `,
    props: {myph: {required: true}},
    methods: {
        onCouponAppliedEvent(){
            EventBus.$emit('applied', this.valueC);
        }
    }
});

new Vue({
    el: "#root",
    methods: {
        onCouponApplied(code) {
            alert('It was applied ' + code);
            if (code == "ABCDEF") {
                this.setPrice(10);
            }
            else {
                this.setPrice(20)
            }
        },
        setPrice(price) {
            this.couponValue = price
        }
    },
    data: {
        couponValue: 0
    },
    computed: {
        price() {
            return 50 - this.couponValue;
        }
    },
    created(){
        alert(io.toString())
        EventBus.$on('applied', (code) => {
            this.onCouponApplied(code)
        })
    }

});