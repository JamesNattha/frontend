import axiosInstance from "../../utils/axios";
import { FormState } from "../../models/member.type";
import { ApiResponse } from "../../models/ApiResponse";

// สร้างผู้ใช้ใหม่
const createUser = async (values: FormState): Promise<ApiResponse<any>> => {
  try {
    // console.log("values", values);
    const response = await axiosInstance.post("/user/createUser", values);
    return {
      isStatus: true,
      data: response.data,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error.message
    );
    return {
      isStatus: false,
      data: null,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// แก้ไขข้อมูลผู้ใช้
const updateUser = async (
  id: number,
  values: FormState
): Promise<ApiResponse<any>> => {
  try {
    console.log("values", values);
    const response = await axiosInstance.patch(
      `/user/updateUser/${id}`,
      values
    );
    return {
      isStatus: true,
      data: response.data,
      message: "User update successfully",
    };
  } catch (error: any) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    return {
      isStatus: false,
      data: null,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// ลบข้อมูลผู้ใช้
const deleteUser = async (id: number): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.delete(`/user/deleteUser/${id}`);
    return {
      isStatus: true,
      data: response.data,
      message: "User update successfully",
    };
  } catch (error: any) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    return {
      isStatus: false,
      data: null,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// ดึงข้อมูลผู้ใช้
const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user/getUser");
    return {
      isStatus: true,
      data: response.data,
      message: "User retrieved successfully",
    };
  } catch (error: any) {
    console.error(
      "Error retrieving user:",
      error.response ? error.response.data : error.message
    );
    return {
      isStatus: false,
      data: null,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

// สร้าง Object รวมฟังก์ชัน API
const UserAPI = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

export default UserAPI;
