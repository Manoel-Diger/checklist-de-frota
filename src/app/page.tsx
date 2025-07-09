import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentInspections } from "@/components/recent-inspections"
import { FleetOverview } from "@/components/fleet-overview"
import { AlertsPanel } from "@/components/alerts-panel"

export default function DashboardPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-50/50">
          <DashboardHeader />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStats />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <FleetOverview />
            </div>
            <div className="col-span-3">
              <RecentInspections />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AlertsPanel />
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
