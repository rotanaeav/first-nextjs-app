import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { payments } from "./payments-data";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/50">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Payments & Transactions
        </h1>
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  );
}
