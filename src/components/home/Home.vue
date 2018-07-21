<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" class="logo-img">
          <img src="@/assets/logo.png">
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="logout">
          <span>欢迎上海前端22期星曜会员</span>
          <a href="#" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏导航 -->
        <el-col>
          <el-menu
            default-active="1"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            background-color="#545C64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userlist">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/rolelist">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="/permissionlist">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  methods: {
    logout () {
      this.$confirm('您确认是否要退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 1000
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 1000
        })
      })
    },

    handleSelect (index) {
      this.$router.push(index)
    }
  }
}
</script>

<style>

.el-container {
  height: 100%;
}

.logo-img {
  height: 60px;
  padding: 5px;
}

.logo-img img {
  height: 100%;
}

.el-header {
  background-color: #B3C1CD;
  line-height: 60px;
}

.el-header h1 {
  margin: 0;
  padding: 0;
  font-size: 30px;
  text-align: center;
  color: #fff;
}

.logout {
  text-align: right;
  font-weight: 700;
}

.logout a {
  color: #B07A17;
}

.el-aside {
  background-color: #545C64;
}

.el-main {
  background: #EAEEF1;
}
</style>
