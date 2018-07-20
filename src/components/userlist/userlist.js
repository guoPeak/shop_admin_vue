
import axios from 'axios'

export default {
  name: 'UserList',

  data () {
    return {
      searchText: '',
      tableData: [],
      pageSize: 2,
      total: 0,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    getUserList (pagenum = 1, searchText = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query: searchText,
            pagenum: pagenum,
            pagesize: this.pageSize
          },
          headers: { Authorization: localStorage.getItem('token') }
        }).then((res) => {
          // console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    },

    getCurUserList (currentPage) {
      this.getUserList(currentPage, this.searchText)
    },

    userSearch () {
      this.getUserList(1, this.searchText)
    },

    addUserInfo () {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          // 通过校验了处理登录请求
          console.log(11)
        } else {
          return false
        }
      })
    }
  }
}
