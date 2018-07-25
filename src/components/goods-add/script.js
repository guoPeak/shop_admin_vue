import { quillEditor } from 'vue-quill-editor'
// import hljs from ''
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
        is_promote: '否'
      },

      allCateMenu: [],

      addGoodsRules: {
        goods_name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格由数字组成', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' },
          { type: 'number', message: '商品数量由数字组成', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' },
          { type: 'number', message: '商品重量由数字组成', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '商品分类不能为空', trigger: 'blur' }
        ]
      },

      activeName: '1',
      isAutoUp: true,
      headers: {
        Authorization: localStorage.getItem('token')
      },

      goods_introduce: ''
    }
  },

  created () {
    this.getAllCateMenu()
  },

  components: {
    quillEditor
  },

  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }

    // contentCode () {
    //   return hljs.highlightAuto(this.goods_introduce).value
    // }
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
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    },

    afterUpLoad (res) {
      console.log(res)
      this.addGoodsForm.pics.push({ pic: res.data.tmp_path })
    },

    submitAddGoods () {
      this.$refs.addGoodsForm.validate((valid) => {
        if (valid) {
          this.addGoodsForm.goods_introduce = this.goods_introduce
          this.axios
            .post('goods', this.addGoodsForm)
            .then(res => {
              console.log(res)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
