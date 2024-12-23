<template>
  <a-layout-content style="padding: 0 50px; height: 100vh">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb>
    <div
      :style="{
        background: '#d4d0cf',
        padding: '24px',
        height: 'calc(90vh - 72px)',
        overflowY: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }"
    >
      <CreateFormVue
        :title="'Setting Form'"
        @successCreate="handleAlertSuccess"
        @clearSuccess="handleClearSuccess"
        @updateSuccess="handleUpdateSuccess"
        @createFailed="handleCreateFailed"
      />
      <CustomTable @deletedSuccess="handleDeleteSuccess" />
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import CreateFormVue from "../../views/CreateForm.vue";
import CustomTable from "./CustomTable.vue";

export default defineComponent({
  components: {
    CreateFormVue,
    CustomTable,
  },

  setup() {
    const handleAlertSuccess = () => {
      alert("Created success");
    };
    const handleCreateFailed = () => {
      alert("Creation failed because the name already exists in the database.");
    };

    const handleUpdateSuccess = () => {
      alert("Updated success");
    };

    const handleDeleteSuccess = () => {
      alert("Deleted success");
    };

    const handleClearSuccess = () => {
      alert("Clear success");
    };

    return {
      handleAlertSuccess,
      handleClearSuccess,
      handleUpdateSuccess,
      handleDeleteSuccess,
      handleCreateFailed,
    };
  },
});
</script>
