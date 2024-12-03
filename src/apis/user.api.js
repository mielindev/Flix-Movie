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
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP00&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
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
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (formValues) => {
    try {
      const response = await fetcher.post("QuanLyNguoiDung/DangKy", formValues);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAccountInfomation: async (token) => {
    try {
      const response = await fetcher.post(
        "QuanLyNguoiDung/ThongTinTaiKhoan",
        token
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  editAccountInfor: async (formValues) => {
    try {
      const response = await fetcher.put(
        "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        formValues
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
