import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/page";
import { Toaster } from "./components/ui/toaster";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
