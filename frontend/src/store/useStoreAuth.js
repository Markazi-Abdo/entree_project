import { create } from "zustand";
import AxiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const url = "http://localhost:8050/niyaba";
const useAuthStore = create((set, get) => ({
    user:null,
    ioSocket:null,
    isLoading:false,
    onlineUsers:[],

    signUp: async function(data) {
        set({ isLoading:true });
        try {
            const action = await AxiosInstance.post("/auth/signup", data);
            set({ user:action.data.newUser });
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
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
            get().connectSocket();
            console.log("Everything working fine, user is good");
        } catch (error) {
            console.error("Error in GetProfile function: " + error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    connectSocket: function() {
        const { user, ioSocket } = get();
        if (!user || (ioSocket && ioSocket.connected)) return;
        
        const socket = io(url, {
            withCredentials:true,
            query:{
                userId:user?._id
            },
            transports: ["websocket"] 
        })
        socket.connect();
        set({ ioSocket:socket });
        socket.on("getUsers", (userIds) => {
            set({ onlineUsers:userIds });
        })
    },
    disconnectSocket: function(){
        if (!get().ioSocket) return;
        get().ioSocket.disconnect();
        set({ ioSocket:null });
    }
}))

export default useAuthStore;