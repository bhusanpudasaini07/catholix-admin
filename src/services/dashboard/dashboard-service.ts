import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

  const getDeviceStats = () => {
    return httpRequest("/dashboard/device-stats", httpMethods.GET);
  };
  const getBanner = async (search: string, page: number, perPage: number) => {
    const response = await httpRequest(
      `/banners?search=${search}&page=${page}&limit=${perPage}`,
      httpMethods.GET,
    );
    return response?.data;
  };

  const createBanner = (banner: any) => {
    return httpRequest("/banners", httpMethods.POST, banner, {
      "Content-Type": "multipart/form-data",
    });
  };

  const updateBanner = (id: string, banner: any) => {
    return httpRequest(`/banners/${id}`, httpMethods.PUT, banner, {
      "Content-Type": "multipart/form-data",
    });
  };

  const getBannerById = (id: string) => {
    return httpRequest(`/banners/${id}`, httpMethods.GET);
  };

  const deleteBanner = (id: string) => {
    return httpRequest(`/banners/${id}`, httpMethods.DELETE);
  };
export {
 
  getDeviceStats,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  getBannerById
};
