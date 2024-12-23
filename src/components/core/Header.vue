<template>
  <a-layout-header>
    <div class="logo" :style="{ backgroundImage: `url(${logoUrl})` }" />
    <!-- <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu> -->
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LogoFree from "../../../public/free_logo.png";
export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>(["2"]);
    // const logoUrl = ref("https://toppng.com/uploads/preview/free-logo-design-11551057495oqoep79juj.png"); // URL ของโลโก้
    const logoUrl = LogoFree;

    return {
      selectedKeys,
      logoUrl,
    };
  },
});
</script>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
