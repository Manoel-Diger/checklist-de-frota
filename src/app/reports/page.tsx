import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ReportsPanel } from "@/components/reports-panel"

export default function ReportsPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <h1 className="text-lg font-semibold">Relatórios</h1>
              <p className="text-sm text-muted-foreground">Análises e relatórios detalhados da frota</p>
            </div>
          </header>
          <ReportsPanel />
        </div>
      </SidebarInset>
    </>
  )
}
