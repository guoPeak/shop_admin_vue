export default {
  name: 'goods',

  data () {
    return {
      goodsData: [],
      total: 0,
      pageSize: 6,
      currentPage: 1,
      searchText: ''
    }
  },

  created () {
    this.getGoodsList(this.$route.query.page, this.$route.query.search)
  },

  watch: {
    $route (to) {
      // 监视路由变化来改变当前页
      this.getGoodsList(to.query.page, to.query.search)
    }
  },

  filters: {
    date (msg) {
      function checkDay (n) {
        return n > 10 ? n : '0' + n
      }

      const date = new Date(msg)
      const year = date.getFullYear()
      const month = checkDay(date.getMonth() + 1)
      const day = checkDay(date.getDate())
      const hour = checkDay(date.getHours())
      const minute = checkDay(date.getMinutes())
      const second = checkDay(date.getSeconds())

      const newDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      return newDate
    }
  },

  methods: {
    async getGoodsList (pagenum = 1, searchText = '') {
      const res = await this.axios.get('goods', {
        params: {
          query: searchText,
          pagenum,
          pagesize: this.pageSize
        }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.goodsData = data.goods
        this.total = data.total
        this.currentPage = pagenum - 0 // 让其得到数字
      }
    },

    getCurPageGoods (curpage) {
      // this.getGoodsList(curpage)
      this.$router.push({
        path: '/goods',
        query: {
          search: this.searchText,
          page: curpage
        }
      })
    },

    goodsSearch () {
      this.$router.push({
        path: '/goods',
        query: {
          search: this.searchText,
          page: 1
        }
      })
      this.currentPage = 1
    },

    deleteGoods (goodId) {
      console.log(goodId)
    },

    async getGoodsById (goodId) {
      // console.log(goodId)
      const res = await this.axios.get(`goods/${goodId}`)

      console.log(res)
    }
  }
}
