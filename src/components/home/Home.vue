<template>
  <el-container>
    <el-header>
      <h1>电商后台管理系统</h1>
    </el-header>
    <el-container>
      <el-aside width="220px"></el-aside>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

.el-container {
  height: 100%;
}

.el-header {
  background-color: #aaa;
  text-align: center;
  line-height: 60px;
}

.el-header h1 {
  margin: 0;
  padding: 0;
  font-size: 30px;
  color: #fff;
}

.el-aside {
  height: 100%;
  background-color: red;
}

.el-main {
  height: 100%;
  background: green;
}
</style>
