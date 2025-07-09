"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const checklistItems = [
  {
    category: "Documentação",
    items: [
      { id: "doc_cnh", label: "CNH do motorista válida", required: true },
      { id: "doc_crlv", label: "CRLV em dia", required: true },
      { id: "doc_seguro", label: "Seguro obrigatório válido", required: true },
      { id: "doc_tacografo", label: "Tacógrafo funcionando", required: true },
    ],
  },
  {
    category: "Sistema de Freios",
    items: [
      { id: "freio_pedal", label: "Pedal de freio firme", required: true },
      { id: "freio_estacionamento", label: "Freio de estacionamento eficiente", required: true },
      { id: "freio_ar", label: "Sistema de ar comprimido OK", required: true },
      { id: "freio_abs", label: "Sistema ABS funcionando", required: false },
    ],
  },
  {
    category: "Pneus e Rodas",
    items: [
      { id: "pneu_pressao", label: "Pressão dos pneus adequada", required: true },
      { id: "pneu_desgaste", label: "Desgaste dentro do limite", required: true },
      { id: "pneu_estepe", label: "Estepe em boas condições", required: true },
      { id: "roda_parafusos", label: "Parafusos das rodas apertados", required: true },
    ],
  },
  {
    category: "Sistema Elétrico",
    items: [
      { id: "luz_farol", label: "Faróis funcionando", required: true },
      { id: "luz_seta", label: "Setas funcionando", required: true },
      { id: "luz_freio", label: "Luz de freio funcionando", required: true },
      { id: "luz_placa", label: "Luz da placa funcionando", required: true },
    ],
  },
  {
    category: "Motor e Fluidos",
    items: [
      { id: "motor_oleo", label: "Nível de óleo adequado", required: true },
      { id: "motor_agua", label: "Nível de água adequado", required: true },
      { id: "motor_combustivel", label: "Combustível suficiente", required: true },
      { id: "motor_vazamentos", label: "Sem vazamentos visíveis", required: true },
    ],
  },
]

export function ChecklistForm() {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [observations, setObservations] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const { toast } = useToast()

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setPhotos((prev) => [...prev, ...files])
  }

  const handleSubmit = () => {
    if (!selectedVehicle) {
      toast({
        title: "Erro",
        description: "Selecione um veículo para continuar",
        variant: "destructive",
      })
      return
    }

    const requiredItems = checklistItems.flatMap((category) => category.items.filter((item) => item.required))
    const uncheckedRequired = requiredItems.filter((item) => !checkedItems[item.id])

    if (uncheckedRequired.length > 0) {
      toast({
        title: "Itens obrigatórios pendentes",
        description: `${uncheckedRequired.length} itens obrigatórios não foram verificados`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Checklist enviado com sucesso!",
      description: "A inspeção foi registrada no sistema",
    })
  }

  const getCompletionRate = () => {
    const totalItems = checklistItems.flatMap((category) => category.items).length
    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    return Math.round((checkedCount / totalItems) * 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Veículo</CardTitle>
          <CardDescription>Selecione o veículo e preencha as informações básicas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Veículo</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scania-abc1234">Scania R450 - ABC-1234</SelectItem>
                  <SelectItem value="volvo-def5678">Volvo FH540 - DEF-5678</SelectItem>
                  <SelectItem value="mercedes-ghi9012">Mercedes Actros - GHI-9012</SelectItem>
                  <SelectItem value="daf-jkl3456">DAF XF480 - JKL-3456</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="km">Quilometragem</Label>
              <Input id="km" placeholder="Ex: 125.000" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progresso do Checklist</span>
            <Badge variant="outline">{getCompletionRate()}% Completo</Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {checklistItems.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {category.category}
              <Badge variant="secondary">
                {category.items.filter((item) => checkedItems[item.id]).length}/{category.items.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                  />
                  <Label
                    htmlFor={item.id}
                    className={`flex-1 ${checkedItems[item.id] ? "line-through text-gray-500" : ""}`}
                  >
                    {item.label}
                    {item.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {checkedItems[item.id] ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Fotos da Inspeção</CardTitle>
          <CardDescription>Adicione fotos relevantes da inspeção (opcional)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Camera className="mr-2 h-4 w-4" />
                Tirar Foto
              </Button>
              <Label htmlFor="photo-upload" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </span>
                </Button>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </Label>
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
          <CardDescription>Adicione observações adicionais sobre a inspeção</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva qualquer observação importante sobre o veículo..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 bg-transparent">
          Salvar Rascunho
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Finalizar Inspeção
        </Button>
      </div>
    </div>
  )
}
