// 加载树型导航
import ElTreeGrid from 'element-tree-grid'

export default {
  name: 'categories',

  data () {
    return {
      categoriesList: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      loading: true,
      addCategorydialog: false,
      addCategoryForm: {
        cateName: '',
        catPid: []
      },
      allCateMenu: [],

      editCategorydialog: false,
      editCategoryForm: {
        cateName: '',
        cateId: -1
      }
    }
  },

  created () {
    this.getCategoriesList()
  },

  mounted () {
    // 获取添加分类的父级名称
    this.getaddCateMenu()
  },

  components: {
    [ElTreeGrid.name]: ElTreeGrid
  },

  methods: {
    async getCategoriesList (pagenum = 1) {
      const res = await this.axios.get('categories', {
        params: {
          type: 3,
          pagenum,
          pagesize: this.pageSize
        }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.categoriesList = data.result
        this.total = data.total

        this.loading = false
      }
    },

    changePage (curpage) {
      this.loading = true
      this.getCategoriesList(curpage)
    },

    async getaddCateMenu () {
      const res = await this.axios.get('categories', {
        params: { type: 2 }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.allCateMenu = data
      }
    },

    async addCate () {
      const { cateName, catPid } = this.addCategoryForm
      const params = {
        cat_pid: catPid.slice(-1)[0],
        cat_name: cateName,
        cat_level: catPid.length
      }
      const res = await this.axios.post('categories', params)
      // console.log(res)
      const { meta } = res.data
      if (meta.status === 201) {
        this.addCategorydialog = false
        // 重新刷新列表 且加载动态效果
        this.loading = true
        this.getCategoriesList()

        // 清空添加分类对话框的内容
        this.addCategoryForm.cateName = ''
        this.addCategoryForm.catPid = []
      }
    },

    deleteCate (id) {
      // console.log(id)
      this.$confirm('您是否要删除该分类？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.wayForDel(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async wayForDel (id) {
      const res = await this.axios.delete(`categories/${id}`)
      console.log(res)
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getCategoriesList()
      }
    },

    async showEditCateDialog (id) {
      const res = await this.axios.get(`categories/${id}`)
      // console.log(res)
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.editCategoryForm.cateName = data.cat_name
        this.editCategoryForm.cateId = data.cat_id
        this.editCategorydialog = true
      }
    },

    async editCate () {
      const { cateId, cateName } = this.editCategoryForm
      const res = await this.axios.put(`categories/${cateId}`, { cat_name: cateName })
      // console.log(res)
      const { meta } = res.data
      if (meta.status === 200) {
        this.editCategorydialog = false
        // 重新刷新列表 且加载动态效果
        this.loading = true
        this.getCategoriesList()
      }
    }
  }
}
