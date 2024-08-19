import { LeftSidebarAdmin } from "../shared/LeftSidebarAdmin"
import { Outlet } from "react-router-dom"

export const RootLayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <LeftSidebarAdmin />
      <section className="flex-1 overflow-auto">
        <Outlet />
      </section>
    </div>
  )
}
