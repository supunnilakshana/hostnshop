'use client'

import { Circle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TimelineEntry {
  time: string
  type: 'payment-received' | 'sale' | 'payment-made' | 'arrival'
  description: string
  reference?: string
}

const timelineData: TimelineEntry[] = [
  {
    time: "09:30 am",
    type: "payment-received",
    description: "Payment received from John Doe of $385.90"
  },
  {
    time: "10:00 am",
    type: "sale",
    description: "New sale recorded",
    reference: "ML-3467"
  },
  {
    time: "12:00 am",
    type: "payment-made",
    description: "Payment was made of $64.95 to Michael"
  },
  {
    time: "09:30 am",
    type: "sale",
    description: "New sale recorded",
    reference: "ML-3467"
  },
  {
    time: "09:30 am",
    type: "arrival",
    description: "New arrival recorded"
  },
  {
    time: "12:00 am",
    type: "payment-received",
    description: "Payment Received"
  }
]

const getStatusColor = (type: TimelineEntry['type']) => {
  switch (type) {
    case 'payment-received':
      return 'text-blue-500'
    case 'sale':
      return 'text-blue-500'
    case 'payment-made':
      return 'text-emerald-500'
    case 'arrival':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export function IncomeTimeline() {
  return (
    <div className="max-w-md mx-auto p-6">

    <Card className='shadow-xl h-full'>
      <CardHeader>
        <CardTitle>Income Graph</CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {timelineData.map((entry, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-20 text-sm text-gray-600">
                  {entry.time}
                </div>
                <div className="mt-1">
                  <Circle className={`w-3 h-3 ${getStatusColor(entry.type)}`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">
                    {entry.description}
                    {entry.reference && (
                      <span className="text-blue-500 ml-1">#{entry.reference}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </CardContent>
    </Card> 
    </div>
  )
}

