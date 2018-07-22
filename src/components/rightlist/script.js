export default {

  data () {
    return {
      tableData: []
    }
  },

  created () {
    this.getRightList()
  },

  methods: {
    getRightList () {
      this.axios
        .get('rights/list')
        .then(res => {
          // console.log(res)
          const { meta, data } = res.data
          if (meta.status === 200) {
            this.tableData = data
            this.tableData.forEach(e => {
              e.level = this.translateNum(+e.level + 1) + '级'
            })
          }
        })
    },

    translateNum (key) {
      switch (key) {
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        case 4:
          return '四'
      }
    }
  }
}
