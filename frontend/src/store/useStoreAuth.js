import { create } from "zustand";
import AxiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
    user:null,
    isLoading:false,

    signUp: async function(data) {
        set({ isLoading:true });
        try {
            const action = await AxiosInstance.post("/auth/signup", data);
            set({ user:action.data.newUser });
            toast.success("Signup avec successs");
        } catch (error) {
            console.error("Error in signUp function: " + error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    logIn: async function(data) {
        set({ isLoading:true });
        try {
            const action = await AxiosInstance.post("/auth/login", data);
            set({ user:action.data.user });
            toast.success("Login avec success");
        } catch (error) {
            console.error("Error in Login Function: " + error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    logout: async function() {
        set({ isLoading:true });
        try {
            await AxiosInstance.post("/auth/logout");
            set({ user:null });
            toast.success("Logout succesfull");
        } catch (error) {
            console.error("Error in Logout function: " + error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    getProfile: async function() {
        try {
            const action = await AxiosInstance.get("/auth/profilecheck");
            set({ user:action.data.user });
            console.log("Everything working fine, user is good");
        } catch (error) {
            console.error("Error in GetProfile function: " + error.message);
        } finally {
            set({ isLoading:false });
        }
    }
}))

export default useAuthStore;