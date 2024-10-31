import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/page";
import { Toaster } from "./components/ui/toaster";
import { AppProvider } from "./providers/app-provider";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
    </Route>
  )
)

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppProvider>
  )
}

export default App
