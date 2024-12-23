<template>
  <a-layout class="layout" style="min-height: 100vh">
    <!-- Header -->
    <HeaderVue />
    <!-- Content -->
    <ContentVue />
    <!-- Footer -->
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex"; // ใช้ store
import ContentVue from "./components/core/Content.vue"; // นำเข้าเนื้อหา
import HeaderVue from "./components/core/Header.vue"; // นำเข้า Header

export default defineComponent({
  components: {
    ContentVue,
    HeaderVue,
  },
  setup() {
    const store = useStore(); // ใช้ store

    const apiData = computed(() => store.getters.apiData);

    onMounted(() => {
      store.dispatch("fetchApiData"); // เรียก action จาก store
    });

    return {
      apiData, // ส่ง ref ไปยัง template
    };
  },
});
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}

.api-data {
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 16px;
}
</style>
