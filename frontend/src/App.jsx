import { Navigate, Route as Path, Routes as Paths } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast"
import useAuthStore from "./store/useStoreAuth";
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const Login = lazy(() => import("./pages/Auth/Login"));
const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const Acceuil = lazy(() => import("./components/Dashboard/Acceuil"));
const Produits = lazy(() => import("./components/Dashboard/Produits"));

export default function App() {
  const { isLoading, user, getProfile } = useAuthStore();

  useEffect(()=>{
    getProfile();
  }, [ getProfile ])

  if (isLoading) return <Loading />
  return (
    <main className="bg-base-100 min-h-screen flex w-screen ">
      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <Paths>
            <Path index element={<Home />}></Path>
            <Path path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard"/>}></Path>
            <Path path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />}></Path> 
            <Path path="/dashboard" element={user ? <DashBoard/> : <Navigate to="/login" />}>
                <Path index element={<Acceuil />}></Path>
                <Path path="/dashboard/produits" element={<Produits />}></Path>
            </Path>
          </Paths>
        </Suspense>
      </div>
      <Toaster
      position="bottom-right"
      reverseOrder={true}
      />
    </main>
  )
}
