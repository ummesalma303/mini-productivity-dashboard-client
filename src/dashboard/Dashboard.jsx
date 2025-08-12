import { AppSidebar } from "@/components/app-sidebar"
import TaskManager from "@/components/TaskManager"
import TaskCard from "@/components/TaskManager"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/providers/AuthProvider"
// import { Toaster } from "@/components/ui/toaster"

import { useContext } from "react"
// import { Toaster } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import GoalsSection from "@/components/GoalsSection"
import Goals from "@/pages/Goals"
import { Outlet } from "react-router"

export default function Dashboard() {
  const name = useContext(AuthContext)
  console.log(name)
  return (
 <>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } 
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Productivity
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Task Bite</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
       
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-10">
          
        
          {/* <TaskManager></TaskManager>
          <Goals></Goals> */}
          {/* <h1>ghjkghkjhgjhhhhhhhhh hgjk</h1> */}
          <Outlet></Outlet>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
            <Toaster position="top-center"/>

 </>
  )
}
