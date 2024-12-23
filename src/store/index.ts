import { createStore } from "vuex";
import api from "../_api"; // เชื่อมต่อกับ API

export default createStore({
  state: {
    apiData: null, // ข้อมูลจาก API
    user: null, // ข้อมูลผู้ใช้ที่ถูกสร้าง
    error: null, // เก็บข้อผิดพลาด (ถ้ามี)
    formState: {
      user_id: "",
      first_name: "",
      last_name: "",
      phone: "",
      sex: true,
    },
  },
  mutations: {
    setApiData(state, data) {
      state.apiData = data;
    },

    setUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
    setFormState(state, newFormState) {
      state.formState = { ...newFormState };
    },
  },
  actions: {
    // ฟังก์ชัน fetchApiData ใช้ดึงข้อมูลจาก API
    async fetchApiData({ commit }) {
      try {
        const response = await api.user.getUser();
        commit("setApiData", response.data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    },

    // ฟังก์ชัน createUser ใช้สร้างผู้ใช้ใหม่
    async createUser({ commit }, userData) {
      try {
        const response = await api.user.createUser(userData); // เชื่อมต่อ API สำหรับการสร้างผู้ใช้
        if (response.data.success) {
          commit("setUser", response.data.data); // ถ้าสร้างสำเร็จ commit ข้อมูลผู้ใช้
        } else {
          commit("setError", "Error creating user");
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          commit("setError", error.message); // ถ้ามีข้อผิดพลาดใน API
        } else {
          commit("setError", "An unknown error occurred");
        }
        console.error("Error creating user:", error);
      }
    },

    // ฟังก์ชัน updateUser ใช้อัพเดทข้อมูลผู้ใช้ใหม่
    async updateUser({ commit }, { id, userData }) {
      try {
        console.log("123", id, "12345", userData);
        const response = await api.user.updateUser(id, userData); // เชื่อมต่อ API สำหรับการอัพเดทผู้ใช้
        if (response.data.success) {
          commit("setUser", response.data.data); // ถ้าสำเร็จ commit ข้อมูลผู้ใช้
        } else {
          commit("setError", "Error updating user");
        }
      } catch (error) {
        if (error instanceof Error) {
          commit("setError", error.message); // ถ้ามีข้อผิดพลาดใน API
        } else {
          commit("setError", "An unknown error occurred");
        }
        console.error("Error updating user:", error);
      }
    },

    // ฟังก์ชัน deleteUser ใช้อัพเดทข้อมูลผู้ใช้ใหม่
    async deleteUser({ commit }, { id }) {
      try {
        const response = await api.user.deleteUser(id); // เชื่อมต่อ API สำหรับการอัพเดทผู้ใช้
        if (response.data.success) {
          commit("setUser", response.data.data); // ถ้าสำเร็จ commit ข้อมูลผู้ใช้
        } else {
          commit("setError", "Error deleting user");
        }
      } catch (error) {
        if (error instanceof Error) {
          commit("setError", error.message); // ถ้ามีข้อผิดพลาดใน API
        } else {
          commit("setError", "An unknown error occurred");
        }
        console.error("Error deleting user:", error);
      }
    },
  },
  getters: {
    apiData: (state) => state.apiData,
    user: (state) => state.user,
    error: (state) => state.error,
  },
});
