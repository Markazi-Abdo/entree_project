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
    },
    downloadExcelEntree: async function(data) {
        set({ isLoading:true })
        try {
            const res = await AxiosInstance.post("/history/donwload_excel_entree", { data }, { responseType:"blob" });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "entrees.xlsx");
            link.click();
            link.remove();

        } catch (error) {
            console.log(error.message)
        } finally {
            set({ isLoading:false })
        }
    },
    downloadExcelSortie: async function(data) {
        set({ isLoading:true })
        try {
            const res = await AxiosInstance.post("/history/donwload_excel_sortie", { data }, { responseType:"blob" });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sorties.xlsx");
            link.click();
            link.remove();

        } catch (error) {
            console.log(error.message)
        } finally {
            set({ isLoading:false })
        }
    }
}))