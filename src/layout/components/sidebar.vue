<template>
  <div class="content wh100">
    <el-menu
      active-text-color="#409eff"
      background-color="#ffffff"
      class="el-menu-vertical-demo wh100"
      default-active="2"
      text-color="#303133"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>

        <el-sub-menu index="1-1">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>

      <el-menu-item index="3">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
const handleOpen = (key, keyPath) => {
  console.log(key,'1', keyPath,'2')
}
const handleClose = (key, keyPath) => {
  console.log(key,'3', keyPath,'4')
}
</script>

<style scoped lang="scss">
.content {

}
</style>

