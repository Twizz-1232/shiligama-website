"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CatalogNavbar } from "@/components/catalog/catalog-navbar"

interface Order {
  id: string
  date: string
  status: "pendiente" | "en_camino" | "entregado"
  total: number
  items: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
}

const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "entregado",
    total: 125.50,
    items: [
      { name: "Arroz Extra Costeño 5kg", quantity: 2, price: 28.90, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop" },
      { name: "Aceite Vegetal Primor 1L", quantity: 3, price: 12.90, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop" },
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "en_camino",
    total: 89.70,
    items: [
      { name: "Leche Gloria Entera 1L", quantity: 6, price: 5.20, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop" },
      { name: "Azucar Rubia Casa Grande 1kg", quantity: 2, price: 4.50, image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100&h=100&fit=crop" },
    ]
  },
  {
    id: "ORD-003",
    date: "2024-01-22",
    status: "pendiente",
    total: 56.80,
    items: [
      { name: "Fideos Don Vittorio Spaghetti 500g", quantity: 4, price: 3.80, image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=100&h=100&fit=crop" },
    ]
  },
]

const statusConfig = {
  pendiente: {
    label: "Pendiente",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  en_camino: {
    label: "En camino",
    icon: Truck,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  entregado: {
    label: "Entregado",
    icon: CheckCircle,
    color: "bg-primary/10 text-primary border-primary/20",
  },
}

export default function MisPedidosPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <CatalogNavbar cartCount={0} searchQuery="" onSearchChange={() => {}} />

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground">No tienes pedidos</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Cuando realices un pedido, aparecera aqui
            </p>
            <Link href="/catalogo">
              <Button>Ir al catalogo</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status]
              const StatusIcon = status.icon
              const isExpanded = expandedOrder === order.id

              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-secondary/50 active:bg-secondary transition-colors"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <CardTitle className="text-base font-semibold">
                          {order.id}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("es-PE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={cn("flex items-center gap-1", status.color)}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Cantidad: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                              S/. {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Total
                        </span>
                        <span className="text-lg font-bold text-primary">
                          S/. {order.total.toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
