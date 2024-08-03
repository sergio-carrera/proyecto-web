
import { LeftSidebar } from "../shared/LeftSidebar"
import { Outlet } from "react-router-dom"

export const RootLayout = () => {
  return (
    <div className="flex h-screen">
        <LeftSidebar/>
        <section className="flex flex-1 h-full">
            <Outlet/>
        </section>
    </div>
  )
}
