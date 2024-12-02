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
  getMoviedDetails: async (movieId) => {
    try {
      const response = await fetcher.get(
        `QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
  getMovieTheaterSystem: async () => {
    try {
      const response = await fetcher.get("QuanLyRap/LayThongTinHeThongRap");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMovieByName: async (theaterId) => {
    try {
      const respose = await fetcher.get(
        `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${theaterId}&maNhom=GP03`
      );
      return respose.data;
    } catch (error) {
      throw error;
    }
  },
  getListPurchase: async (showId) => {
    try {
      const response = await fetcher.get(
        `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default movieApi;
