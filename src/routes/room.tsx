import { ProtectedRoute } from "@/components/protected-route";
import { Route } from "react-router-dom";

export function RoomRoutes() {
  return (
    <Route
      path=":roomId"
      element={
        <ProtectedRoute
          isAllowed={true}
        >
          <div>Oi</div>
        </ProtectedRoute>
      }
    />
  )
}