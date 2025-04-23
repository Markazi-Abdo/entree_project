import { create } from "zustand";
import AxiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useProductStore = create((set, get) => ({
    entrees:[],
    sorties:[],
    isLoading:false,

    saveEntree: async function(data) {
        set({ isLoading:true });
        try {
            const save = await AxiosInstance.post("/articles/create", data);
            set({ entrees:[...get().entrees, save.data.newArticle] });
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
            const data = await AxiosInstance.get("/history/all/Sortie");
            set({ sorties:data.data.history});
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
    setSortie: async function(article, number) {
        set({ isLoading:true });
        try {
            const newSortie = await AxiosInstance.post("/history/sortie", { article, number });
            set((prev) => ({ sorties:[...prev.sorties, newSortie.data.sortie ]}));
            set((prev) => {
                const findArticle = prev?.entrees?.find(item => item._id === article._id);
                const updatedEntrees = findArticle 
                && prev?.entress?.map(item => item._id === findArticle._id ? {...item, quantite:item.quantite - number} : item);
                return { entrees:updatedEntrees };
            })
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
    }
}))

export default useProductStore;