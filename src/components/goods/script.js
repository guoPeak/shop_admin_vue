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
    this.getGoodsList()
  },

  filters: {
    date (msg) {
      return new Date(msg).toLocaleString()
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
      }
    },

    getCurPageGoods (curpage) {
      this.getGoodsList(curpage)
    },

    goodsSearch () {
      this.getGoodsList(1, this.searchText)
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
