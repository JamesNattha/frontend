<template>
  <a-card
    title="Form Create"
    :bordered="true"
    style="margin-bottom: 10px"
    :extra="currentTime"
  >
    <h1>{{ title }}</h1>
    <a-form
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      label-align="left"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-row :gutter="[8, 8]">
        <!-- First Name -->
        <a-col :span="12">
          <a-form-item label="First Name">
            <a-input
              v-model:value="formState.first_name"
              placeholder="First Name"
              :status="formState.first_name ? '' : 'error'"
            >
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>

        <!-- Last Name -->
        <a-col :span="12">
          <a-form-item label="Last Name">
            <a-input
              v-model:value="formState.last_name"
              type="text"
              placeholder="Last Name"
              :status="formState.last_name ? '' : 'error'"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>

        <!-- Phone -->
        <a-col :span="12">
          <a-form-item
            label="Phone"
            :validateStatus="
              formState.phone && !phoneError.value ? 'success' : 'error'
            "
            :help="
              phoneError.value
                ? 'Phone number must be between 9 to 10 digits'
                : ''
            "
          >
            <a-input
              v-model:value="formState.phone"
              type="text"
              placeholder="Phone"
              @input="validatePhone"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>

        <!-- Sex -->
        <a-col :span="24">
          <a-form-item
            label="Sex"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-radio-group v-model:value="formState.sex">
              <a-radio :value="true">Male</a-radio>
              <a-radio :value="false">Female</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <!-- Submit Button -->
        <a-col :span="24" style="display: flex; justify-content: flex-end">
          <a-form-item>
            <a-button
              type="primary"
              style="margin-right: 13px"
              @click="handleClear"
              >Clear</a-button
            >
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="!isFormUpdated"
            >
              Save
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- <pre>
      {{ formState }}
    </pre> -->
  </a-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  emits: ["successCreate", "clearSuccess", "updateSuccess", "createFailed"],
  props: ["title"],
  setup(props, { emit }) {
    const defaultState = {
      first_name: "",
      last_name: "",
      phone: "",
      sex: true,
    };

    const store = useStore();
    const formState = reactive({ ...defaultState, ...store.state.formState });

    watch(
      () => store.state.formState,
      (newFormState) => {
        Object.assign(formState, newFormState); // อัพเดต formState
      },
      { deep: true }
    );

    const phoneError = reactive({
      value: false,
    });

    console.log("phoneError", phoneError);

    const isFormUpdated = computed(() => {
      return (
        formState.first_name !== defaultState.first_name &&
        formState.last_name !== defaultState.last_name &&
        formState.phone !== defaultState.phone &&
        !phoneError.value
      );
    });

    const validatePhone = () => {
      // เช็คว่าเบอร์โทรต้องมี 9-10 หลักและต้องเป็นตัวเลข
      const phoneRegex = /^[0-9]{9,10}$/;
      phoneError.value = !phoneRegex.test(formState.phone);
    };

    const handleFinish = async () => {
      if (formState.user_id) {
        console.log("formState", formState);
        store
          .dispatch("updateUser", {
            id: formState.user_id,
            userData: formState,
          })
          .then(() => {
            emit("updateSuccess");
            store.dispatch("fetchApiData");
          });
      } else {
        try {
          const response = await store.dispatch("createUser", formState);

          if (response.isStatus) {
            emit("successCreate");
            Object.assign(formState, { ...defaultState });
            await store.dispatch("fetchApiData");
          } else {
            console.log("");
          }
        } catch (error) {
          emit("createFailed");
        }
      }
    };

    const handleClear = () => {
      Object.assign(formState, { ...defaultState });
      emit("clearSuccess");
    };

    return {
      formState,
      handleClear,
      handleFinish,
      isFormUpdated,
      validatePhone,
      phoneError,
    };
  },
});
</script>

<style>
.container {
  padding: 30px;
}
</style>
