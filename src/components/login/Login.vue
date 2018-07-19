<template>
  <div class="login-container">
    <el-form class="login-form" :label-position="labelPosition" ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" status-icon>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      labelPosition: 'top'
    }
  },

  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 通过校验了处理登录请求
          this.handleLogin()
        } else {
          return false
        }
      })
    },

    resetForm () {
      this.$refs.loginForm.resetFields()
    },

    handleLogin () {
      axios
        .post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            localStorage.setItem('token', res.data.data.token)
            // 登录成功，跳转到home页
            this.$router.push('/home')
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              duration: 500
            })
          } else {
            this.$message({
              message: '登录失败，用户名或者密码错误',
              type: 'error',
              duration: 1500
            })
          }
        })
    }
  }
}
</script>

<style>

.login-container {
  width: 100%;
  height: 100%;
  background-color: #202d3f;
  overflow: hidden;
}

.login-form {
  width: 350px;
  margin: 200px auto 0;
  padding: 25px;
  border-radius: 15px;
  background-color: #fff;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
  line-height: 30px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

</style>
