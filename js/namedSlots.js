Vue.component('card', {
    template: `
    <div class="card">
    
  <header class="card-header">
    <div class="card-header-title">
      {{ this.title }}
      <i class="time">{{"@ " + new Date().toLocaleTimeString()}}</i>
    </div>
    
    <a class="card-header-icon" aria-label="more options" @click="showHideText">
      <span class="icon">
        <b class="fas fa-angle-down" aria-hidden="false">V</b>
      </span>
    </a>
       
  </header>
  <transition name="showCardContent">
      <div class="card-content" v-show="this.showText">
        <div class="content">
          <slot name="content"></slot>
          <div class="date">
          {{separationLine}}
          <br>
          <time v-text="new Date().toLocaleString('en-US')"></time>
          </div>
        </div>
      </div>
  </transition>
  
  <transition name="showCardContent">
      <footer class="card-footer" v-show="this.showText">
        <a href="https://coinmarketcap.com/currencies/ripple/" class="card-footer-item">See on coinmarketcap</a>
        <a href="#" class="card-footer-item">See kraken graph</a>
      </footer>
  </transition>
  
</div>
    `,
    data() {
        return {
            showText: false
        }
    },
    methods: {
        showHideText() {
            this.showText = !this.showText
        }
    },
    computed: {
        separationLine() {
            let result = "";
            for (i = 0; i < new Date().toDateString().length; i++) {
                result += "-";
            }
            return result;
        }
    },
    props: {
        title: {required: true}
    }
});

Vue.component('list-currencies', {
    template: `
        <ul>
            <li v-for="obj in currencies">
                <card :title="obj.title">
                    <template slot="content">
                        <table>
                        <tr>
                            <th>Price</th>
                            <th class="percentage">Percentage 24h</th>
                            <th class="percentage">Percentage 5 mins</th>
                        </tr>
                        <tr>
                            <td><i>EUR {{obj.values.EUR.toFixed(7)}}</i></td>
                            <td class="percentage">1.59%</td>
                            <td class="percentage">1.59%</td>
                        </tr>
                        <tr>
                            <td><i>USD {{obj.values.USD.toFixed(7)}}</i></td>
                            <td class="percentage">-3.00%</td>
                            <td class="percentage">-3.00%</td>
                        </tr>
                        <tr>
                            <td><i>BTC {{obj.values.BTC.toFixed(7)}}</i></td>
                            <td class="percentage">5.58%</td>
                            <td class="percentage">5.58%</td>
                        </tr>
                    </template>
                </card>
            </li>
        </ul>
    `,
    data() {
        return {
            currencies: [
                {
                    title: "XRP",
                    values: {EUR: 1.59, USD: 1.70, BTC: 0.0001164}
                }, {
                    title: "USDT",
                    values: {EUR: 1.20, USD: 1.00, BTC: 0.0001164}
                }, {
                    title: "BTC",
                    values: {EUR: 9000, USD: 10000, BTC: 1}
                }
            ]
        }
    }
});


new Vue({
    el: "#root"
});