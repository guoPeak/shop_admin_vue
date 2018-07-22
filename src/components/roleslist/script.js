export default {
  name: 'roleList',

  data () {
    return {
      tableData: [],
      eidtRoledialog: false,
      editUserForm: {
        roleName: '',
        roleDesc: ''
      },
      editRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      addRoledialog: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getRolelist()
  },

  methods: {
    getRolelist () {
      this.axios
        .get('roles')
        .then(res => {
          // console.log(res)
          const { meta, data } = res.data
          if (meta.status === 200) {
            this.tableData = data
          }
        })
    },

    removeRight (data, id) {
      console.log(data, id)
    },

    addRole () {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          this.axios
            .post('roles', this.addRoleForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  message: '创建成功',
                  type: 'success',
                  duration: 1000
                })
                this.addRoledialog = false
                // 重置表单
                this.$refs.addRoleForm.resetFields()
                // 重新刷新列表
                this.getRolelist()
              }
            })
        } else {
          return false
        }
      })
    },

    showUserRoleById (id) {
      // console.log(id)
      this.axios
        .get(`roles/${id}`)
        .then(res => {
          const { meta, data } = res.data
          if (meta.status === 200) {
            this.editUserForm = data
            this.eidtRoledialog = true
          }
        })
    },

    eidtUser (id) {
      // console.log(id)
      this.axios
        .put(`roles/${id}`, this.editUserForm)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.eidtRoledialog = false
            this.$message({
              type: 'success',
              message: '修改成功!',
              duration: 1000
            })
            // 重新刷新列表
            this.getRolelist()
          }
        })
    },

    deleteUserRole (id) {
      // console.log(id)
      this.$confirm('你是否要删除该角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios
          .delete(`roles/${id}`)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1000
              })
              // 重新刷新列表
              this.getRolelist()
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
