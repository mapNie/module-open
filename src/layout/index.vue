<template>
  <div class="content wh100">
    <div class="TopNavbar">
      <TopNavbar />
    </div>
    <div class="content_home wh100">
      <div class="content_sidebar wh100">
        <Sidebar />
      </div>
      <div class="content_body">
        222
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/sidebar.vue'
import TopNavbar from "./components/topNavbar.vue";
</script>

<style scoped lang="scss">
.content {
  background-color: #f5f5f5;

  .content_home {
    display: flex;

    .content_sidebar {
      width: 220px !important;
    }

    .content_body {
      padding: 20px;
    }
  }
}
</style>
