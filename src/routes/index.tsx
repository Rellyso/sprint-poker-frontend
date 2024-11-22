import { HomePage } from "@/app/home/page";
import { LoginPage } from "@/app/login/page";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/private-route";
import { RoomPage } from "@/app/rooms/page";
import { LoginSuccessPage } from "@/app/login/success/page";
import { EnterRoomPage } from "@/app/rooms/enter/page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="login">
        <Route index element={<LoginPage />} />
        <Route path="success" element={<LoginSuccessPage />} />
      </Route>

      <Route path="/rooms/enter" element={
        <PrivateRoute>
          <EnterRoomPage />
        </PrivateRoute>
      }
      />
      <Route path="/rooms/:roomId" element={
        <PrivateRoute>
          <RoomPage />
        </PrivateRoute>
      } />
    </Route>

  )
)

export { router }