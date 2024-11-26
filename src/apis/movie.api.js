import fetcher from "./fetcher";

const movieApi = {
  getBannerMovie: async () => {
    try {
      const response = await fetcher.get("QuanLyPhim/LayDanhSachBanner");
      return response.data.content;
    } catch (error) {
      throw error;
    }
  },
};

export default movieApi;
