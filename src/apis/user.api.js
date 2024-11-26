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
};

export default userApi;
