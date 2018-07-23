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
          }
        })
    }
  }
}
