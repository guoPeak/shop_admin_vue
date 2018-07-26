import { quillEditor } from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'goodAdd',

  data () {
    return {
      activeStep: 0,
      addGoodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        pics: [],
        is_promote: '否',
        goods_introduce: ''
      },

      allCateMenu: [],

      addGoodsRules: {
        goods_name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' }
          // { type: 'number', message: '价格由数字组成', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
          // { type: 'number', message: '商品数量由数字组成', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' }
          // { type: 'number', message: '商品重量由数字组成', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '商品分类不能为空', trigger: 'blur' }
        ]
      },

      activeName: '1',

      headers: {
        Authorization: localStorage.getItem('token')
      }

    }
  },

  created () {
    this.getAllCateMenu()
  },

  components: {
    quillEditor
  },

  methods: {
    async getAllCateMenu () {
      const res = await this.axios.get('categories', {
        params: { type: 3 }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.allCateMenu = data
      }
    },

    next () {
      this.activeStep++
      this.activeName = (this.activeName - 0) + 1 + ''
    },

    changeTabActive (tab) {
      this.activeStep = (tab.index - 0)
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.addGoodsForm.pics = this.addGoodsForm.pics.filter(e => {
        return e.pic !== file.response.data.tmp_path
      })
    },

    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    },

    handleSuccess (res) {
      // console.log(res)
      this.addGoodsForm.pics.push({ pic: res.data.tmp_path })
    },

    submitAddGoods () {
      this.$refs.addGoodsForm.validate((valid) => {
        if (valid) {
          this.axios
            .post('goods', {
              ...this.addGoodsForm,
              goods_cat: this.addGoodsForm.goods_cat.join(',')
            })
            .then(res => {
              console.log(res)
              const { meta } = res.data
              if (meta.status === 201) {
                this.$router.push('/goods')
                this.$message({
                  message: meta.msg,
                  type: 'success'
                })
              }
            })
        } else {
          this.$message.error('表单验证失败，请填写规范')
          return false
        }
      })
    }
  }
}
