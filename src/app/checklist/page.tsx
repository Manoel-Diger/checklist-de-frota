import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function ChecklistPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4">
          <h1>Página de Checklist</h1>
          <p>Teste básico funcionando</p>
        </div>
      </SidebarInset>
    </>
  )
}