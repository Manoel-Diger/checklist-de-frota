import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral da sua frota</p>
        </div>
        <Button asChild>
          <Link href="/checklist/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Inspeção
          </Link>
        </Button>
      </div>
    </header>
  )
}