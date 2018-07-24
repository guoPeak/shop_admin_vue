export default {
  name: 'roleList',

  data () {
    return {
      tableData: [],
      eidtRoledialog: false,
      editUserForm: {
        roleName: '',
        roleDesc: '',
        id: 0
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
      },
      assignRightdialog: false,

      allRightsData: [],

      defaultProps: {
        children: 'children',
        label: 'authName'
      },

      // 设置默认选中的值
      defaultCheckedRights: [],

      currentRoleId: -1
    }
  },

  created () {
    this.getRolelist()

    // 在渲染dom之前获取所有权限的数据
    // this.getAllRights()
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

    showEditRoleById (role) {
      this.editUserForm.roleName = role.roleName
      this.editUserForm.roleDesc = role.roleDesc
      this.editUserForm.id = role.id
      this.eidtRoledialog = true
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
    },

    // async getAllRights () {
    //   const res = await this.axios.get('rights/tree')
    //   // console.log(res)
    //   const { meta, data } = res.data
    //   if (meta.status === 200) {
    //     this.allRightsData = data
    //   }
    // },

    async showAssignRights (role) {
      this.currentRoleId = role.id
      // 获取该角色的权限数据
      let checkedRightsId = []
      role.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            checkedRightsId.push(level3.id)
          })
        })
      })

      this.defaultCheckedRights = checkedRightsId

      const res = await this.axios.get('rights/tree')
      // console.log(res)
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.allRightsData = data
        this.assignRightdialog = true
      }

      // vue是异步更新dom的 对话框没有显示的时候，是没有渲染到dom中的
      // this.$nextTick(() => {
      //   this.$refs.assignTree.setCheckedKeys(checkedRightsId)
      // })
    },

    async updateAssignRight () {
      const checkedRights = this.$refs.assignTree.getCheckedKeys()
      const halfCheckedRights = this.$refs.assignTree.getHalfCheckedKeys()
      const AllChecked = [...checkedRights, ...halfCheckedRights]
      // console.log(checkedRights, halfCheckedRights)
      // console.log(checked)
      const rids = AllChecked.join(',')
      const res = await this.axios.post(`roles/${this.currentRoleId}/rights`, { rids })
      // 隐藏对话框和重新渲染列表
      const { meta } = res.data
      if (meta.status === 200) {
        this.assignRightdialog = false
        this.getRolelist()
      }
    },

    async removeRight (role, rightId) {
      // console.log(role, rightId)
      const res = await this.axios.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      const { meta, data } = res.data
      if (meta.status === 200) {
        role.children = data
      }
    }
  }
}
