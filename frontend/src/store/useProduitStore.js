import { create } from "zustand";
import AxiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useStoreAuth";

const useProductStore = create((set, get) => ({
    entrees:[],
    sorties:[],
    socket: null,
    isLoading:false,

    saveEntree: async function(data) {
        const { downloadEntreeFile } = get();
        set({ isLoading:true });
        try {
            const save = await AxiosInstance.post("/articles/create", data);
            get().listenForUpdates();
            set({ entrees:[...get().entrees, save.data.newArticle] });
            downloadEntreeFile(data);
            console.log("Article created");
        } catch (error) {
            console.error(error.message)
        } finally {
            set({ isLoading:false})
        }
    },
    getEntrees: async function() {
        set({ isLoading:true });
        try {
            const data = await AxiosInstance.get("/history/all/Entree");
            set({ entrees:data.data.history});
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    getSorties: async function() {
        set({ isLoading:true });
        try {
            const data = await AxiosInstance.get("/history/allsorties");
            set({ sorties:data.data.sorties });
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    deleteEntree: async function(id) {
        set({ isLoading:true });
        try {
            await AxiosInstance.delete(`/articles/delete/${id}`);
            set((prev) => {
                const findItem = prev?.entrees?.find(item => id === item._id);
                const updatedState = findItem
                && prev?.entrees?.filter(item => item._id !== id);
                return { entrees:updatedState}
            })
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    updateEntree: async function(id, data) {
        set({ isLoading:true });
        try {
            const product = await AxiosInstance.put(`/articles/update/${id}`, data);
            get().listenForUpdates();
            set((prev) => {
                const findItem = prev?.entrees?.find(item => item._id === id);
                const updatedState = findItem
                && prev?.entrees?.map(item => item.article._id === id ? product.data.article : item);
                return { entrees:updatedState };
            })
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    setSortie: async function(sorties, to) {
        set({ isLoading:true });
        const { downloadSortieFile } = get();
        try {
            const newSortie = await AxiosInstance.post("/history/sortie", { sorties, to });
            set((prev) => ({ sorties:[...prev.sorties, newSortie.data.newSortie ]}));
            downloadSortieFile(sorties);
            toast.success("Sortie Enregistées");
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false });
        }
    },
    deleteSortie: async function(id) {
        set({ isLoading:true });
        try {
            set((prev) => {
                const findItem = prev?.sorties?.find(item => item._id === id);
                const updatedSorties = findItem
                && prev?.sorties?.filter(item => item._id !== id);
                return { sorties:updatedSorties };
            })
            toast.success("Supprimes");
        } catch (error) {
            console.error(error.message);
        } finally {
            set({ isLoading:false })
        }
    },
    listenForUpdates: function() {
        const socket = useAuthStore.getState().ioSocket;
        if (!socket) return;
        
        socket.on("getEntrees", (data) => {
            set({ entrees:[...get().entrees, data]})
        })
    },
    downloadEntreeFile: async function(data) {
        set({ isLoading:true })
        console.log(data);
        try {
            const res = await AxiosInstance.post(
                "/articles/download_entree", 
                { article:data },
                { responseType:"blob" }
            )

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `entree-${data.nom}.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error.message); 
        } finally {
            set({ isLoading:false })
        }
    },
    downloadSortieFile: async function(data) {
        set({ isLoading:true });
        try {
            const res = await AxiosInstance.post("/articles/download_sortie", { article:data }, { responseType:"blob" });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${data.nom}_decharge_document.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error.message)
        } finally {
            set({ isLoading:false })
        }
    }
}))

export default useProductStore;