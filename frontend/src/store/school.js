import { create } from "zustand";
import AxiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const useSchoolStore = create((set, get) => ({
    schools:[],
    isLoading:false,

    getSchools: async function() {
        set({ isLoading:true })
        try {
            const schools = await AxiosInstance.get("/school/all");
            set({ schools:schools.data.schools });
            toast.success(schools.data.message);
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    addSchool: async function(data) {
        set({ isLoading:true });
        try {
            const newSchool = await AxiosInstance.post("/school/add", data);
            set((prev) => ({ schools:[...prev.schools, newSchool.data.newSchool] }))
        } catch(error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    updateSchool: async function(codeGrise, data) {
        set({ isLoading:true });
        try {
            const updated = await AxiosInstance.put(`/school/update/${codeGrise}`, data);
            const updatedSchools = get().schools.map(item => item.codeGrise === codeGrise ? updated.data.school : item);
            set({ schools:updatedSchools });
        } catch(error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    removeSchool: async function(codeGrise) {
        set({ isLoading:true });
        try {
            await AxiosInstance.delete(`/school/remove/${codeGrise}`);
            const updatedSchools = get().schools.filter(item => item.codeGrise !== codeGrise);
            set({ schools:updatedSchools });
        } catch(error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    getInfo: async function(codeGrise) {
        set({ isLoading:true });
        try {
           const details = await AxiosInstance.get(`/school/details/${codeGrise}`);
           return details.data.details; 
        } catch(error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    }
}))