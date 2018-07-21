
export default {
  name: 'UserList',

  data () {
    return {
      searchText: '',
      tableData: [],
      pageSize: 2,
      total: 0,
      currentPage: 1,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
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
      addUserdialog: false,
      editUserdialog: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      editRules: {
        email: [
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    getUserList (pagenum = 1, searchText = '') {
      this.axios
        .get('/users', {
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
      this.currentPage = 1
    },

    /**
     * 添加用户
     */
    addUserInfo () {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          // 通过校验了处理添加用户请求
          this.axios
            .post('/users', this.addUserForm)
            .then(res => {
              // console.log(res)
              const { meta } = res.data
              if (meta.status === 201) {
                // 隐藏模态框 清空表单
                this.addUserdialog = false
                this.$refs.addUserForm.resetFields()
                // 显示提示消息
                this.$message({
                  message: meta.msg,
                  type: 'success',
                  duration: 800
                })
                // 刷新列表
                this.getUserList(this.currentPage)
              } else if (meta.status === 400) {
                this.$message({
                  message: meta.msg,
                  type: 'error',
                  duration: 800
                })
              }
            })
        } else {
          return false
        }
      })
    },

    /**
     * 改变用户的状态
     * @param {Object} status 当前行用户的数据
     */
    changeStatus (status) {
      // console.log(status)
      // 发送修改用户状态请求
      const url = '/users/' + status.id + '/state/' + status.mg_state
      this.axios
        .put(url).then((res) => {
          // console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.$message({
              message: data.mg_state === 1 ? '启用成功' : '禁用成功',
              type: 'success',
              duration: 1000
            })
          }
        })
    },

    /**
     * 根据id查询用户
     * @param {Number} id 用户的id
     */
    getUserInfoById (id) {
      // console.log(id)
      // 获取用户信息
      this.axios
        .get(`users/${id}`)
        .then(res => {
          const { meta, data } = res.data
          const {username, email, mobile, id} = data
          if (meta.status === 200) {
            // 改变编辑用户模态框的数据
            this.editUserForm = {
              username,
              email,
              mobile,
              id
            }
            // 显示模态框
            this.editUserdialog = true
          }
        })
    },

    /**
     * 编辑用户信息提交
     * @param {Number} id 用户的id
     */
    editUserInfo (id) {
      this.$refs.editUserForm.validate(valid => {
        if (valid) {
          this.axios
            .put(`users/${id}`, this.editUserForm)
            .then(res => {
              // console.log(res)
              const { meta } = res.data
              if (meta.status === 200) {
                // 隐藏模态框
                this.editUserdialog = false
                // 显示提示信息
                this.$message({
                  message: meta.msg,
                  type: 'success',
                  duration: 800
                })
                // 刷新当前页
                this.getUserList(this.currentPage, this.searchText)
              }
            })
        } else {
          return false
        }
      })
    },

    /**
     * 删除用户信息
     * @param {Number} id 用户的id
     */
    deleteUser (id) {
      this.$confirm('您确认要删除该用户信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios
          .delete(`users/${id}`)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功',
                duration: 1000
              })
              // 刷新列表
              this.getUserList(this.currentPage, this.searchText)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1000
        })
      })
    }
  }
}
