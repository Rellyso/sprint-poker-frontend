import { HomePage } from "@/app/home/page";
import { LoginPage } from "@/app/login/page";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/private-route";
import { RoomPage } from "@/app/room/page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="/rooms/:roomId" element={
        <PrivateRoute>
          <RoomPage />
        </PrivateRoute>
      } />
    </Route>

  )
)

export { router }