// CustomTable.vue
<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.user_id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.first_name }} {{ record.last_name }}
      </template>
      <template v-else-if="column.key === 'sex'">
        {{ record.sex ? "Male" : "Female" }}
      </template>
      <template v-else-if="column.key === 'created_date'">
        {{ formatDate(record.created_date) }}
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <a-button type="link" @click="handleEdit(record)">Edit</a-button>
          <a-button type="link" @click="handleDelete(record)">Delete</a-button>
        </div>
      </template>
      <template v-else>
        {{ record[column.dataIndex] }}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { ApiData } from "../../models/User";
export default defineComponent({
  emits: ["deletedSuccess"],
  setup(_, { emit }) {
    const store = useStore();
    const apiData = computed<ApiData[]>(
      () => store.getters.apiData?.data || []
    );

    const dataSource = computed(() => apiData.value || []);
    const pagination = computed(() => ({
      total: apiData.value.length,
      pageSize: 5,
    }));

    const columns = [
      {
        title: "Name",
        key: "name",
        customRender: ({ record }: { record: ApiData }) =>
          `${record.first_name} ${record.last_name}`,
        width: "25%",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: "20%",
      },
      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex",
        filters: [
          { text: "Male", value: true },
          { text: "Female", value: false },
        ],
        onFilter: (value: boolean, record: ApiData) => record.sex === value,
        customRender: ({ text }: { text: boolean }) =>
          text ? "Male" : "Female",
        width: "15%",
      },
      {
        title: "Created Date",
        dataIndex: "created_date",
        key: "created_date",
        sorter: (a: ApiData, b: ApiData) =>
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime(),
        customRender: ({ text }: { text: string }) => formatDate(text),
        width: "20%",
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: "20%",
      },
    ];

    const formatDate = (date: string): string => {
      return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    };

    const handleTableChange = () => {
      console.log("Table changed");
    };

    const handleEdit = (record: ApiData) => {
      console.log("record", record);
      store.commit("setFormState", record);
    };

    const handleDelete = (record: ApiData) => {
      console.log("Deleting record:", record.user_id);
      store
        .dispatch("deleteUser", {
          id: record.user_id,
        })
        .then(() => {
          emit("deletedSuccess");
          store.dispatch("fetchApiData");
        });
    };

    return {
      apiData,
      dataSource,
      pagination,
      loading: false,
      handleTableChange,
      formatDate,
      handleEdit,
      handleDelete,
      columns,
    };
  },
});
</script>
