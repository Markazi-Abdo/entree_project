import { create } from "zustand";
import AxiosInstance from "../utils/axios";

export const useAnalyticsStore = create((set) => ({
    isLoading:false,
    data:{},

    getData: async function() {
        set({ isLoading:true });
        try {
            const analytics = await AxiosInstance.get("/analytics/data");
            set({ data:analytics.data.data })
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false });
        }
    }
}))