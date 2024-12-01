import fetcher from "./fetcher";

const userApi = {
  login: async (payload) => {
    // payload: {taiKhoan: 'string', matKhau: 'string'}
    try {
      const response = await fetcher.post("QuanLyNguoiDung/DangNhap", payload);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  getUserListPagination: async ({ page = 1, pageSize = 10 }) => {
    try {
      const response = await fetcher.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP03&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (taiKhoanUser) => {
    try {
      const response = await fetcher.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoanUser}`
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  addUser: async (payload) => {
    try {
      const response = await fetcher.post(
        "QuanLyNguoiDung/ThemNguoiDung",
        payload
      );
      console.log("👉 ~ addUser: ~ response:", response);
      return response.data.content;
    } catch (error) {
      console.log("👉 ~ addUser: ~ error:", error);
      throw error;
    }
  },
};

export default userApi;
