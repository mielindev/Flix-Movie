import fetcher from "./fetcher";

const movieApi = {
  getBannerMovie: async () => {
    try {
      const response = await fetcher.get("QuanLyPhim/LayDanhSachBanner");
      console.log("👉 ~ getBannerMovie: ~ response:", response);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  getMovieList: async () => {
    try {
      const response = await fetcher.get(
        "QuanLyPhim/LayDanhSachPhim?maNhom=GP03"
      );
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  getMovieListPagination: async (page = 1, pageSize = 10) => {
    try {
      const response = await fetcher.get(
        `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP03&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteMovie: async (movieId) => {
    try {
      const response = await fetcher.delete(
        `QuanLyPhim/XoaPhim?MaPhim=${movieId}`,
        movieId
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  addMovie: async (formData) => {
    try {
      const response = await fetcher.post(
        "QuanLyPhim/ThemPhimUploadHinh",
        formData
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  updateMovie: async (formData) => {
    try {
      const response = await fetcher.post(
        "QuanLyPhim/CapNhatPhimUpload",
        formData
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
};

export default movieApi;
