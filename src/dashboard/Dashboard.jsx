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
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3"> */}
            {/* <div className="aspect-video rounded-xl bg-muted/50" />
            <h2>hgjkgjk</h2>
            <div className="aspect-video rounded-xl bg-muted/50" /> */}
            {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
          {/* </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-10">
          
          {/* <Button className='mb-4'><CirclePlus />Add Task</Button>
          <hr /> */}
          <TaskManager></TaskManager>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
            <Toaster position="top-center"/>

 </>
  )
}
