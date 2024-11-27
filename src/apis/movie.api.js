import fetcher from "./fetcher";

const movieApi = {
  getBannerMovie: async () => {
    try {
      const response = await fetcher.get("QuanLyPhim/LayDanhSachBanner");
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  getMovieList: async () => {
    try {
      const response = await fetcher.get(
        "QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
      );
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  getMovieListPagination: async (page = 1, pageSize = 10) => {
    try {
      const response = await fetcher.get(
        `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteMovie: async (movieId) => {
    try {
      const response = await fetcher.delete(`QuanLyPhim/XP?MaPhim=${movieId}`);
      return response.data.content;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default movieApi;
