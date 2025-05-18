"use client";

import {IncomeTimeline} from "@/presentation/components/dashboard/incomeTimeline";
import {OrderList} from "@/presentation/components/dashboard/orderList";
import Footer from "@/presentation/components/footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-bg_primary text-accent">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[2fr,1fr]">
          <OrderList />
          <IncomeTimeline />
        </div>
      </div>

      <Footer />
    </div>
  );
}
