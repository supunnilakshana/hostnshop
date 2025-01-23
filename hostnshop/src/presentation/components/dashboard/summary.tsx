"use client"

import { Card } from "../ui/card"
import { DollarSign } from "lucide-react"

export function Summary (){
    return(
        <div>
            <Card className="relative p-6 w-[300px] shadow-xl">
      
      <div className="absolute top-6 right-6 bg-bg_primary w-10 h-10 rounded-full flex items-center justify-center">
        <DollarSign className="h-5 w-5 text-white" />
      </div>

    
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Summary</h3>
        <div className="space-y-1">
          <p className="text-3xl font-bold">$6,820</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-rose-500 text-sm">
              <span className="inline-block">+9%</span>
            </div>
            <span className="text-sm text-muted-foreground">last year</span>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="mt-4 h-[60px]">
        <svg className="w-full h-full" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 50C25 50 25 20 50 20C75 20 75 40 100 40C125 40 125 10 150 10C175 10 175 30 200 30C225 30 225 50 250 50C275 50 275 20 300 20"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            className="stroke-bg_primary"
          />
        </svg>
      </div>
    </Card>
        </div>
    )
}