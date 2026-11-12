import React from "react";
import { DataTable } from "../payments/data-table";
import { columns } from "../payments/columns";
import { payments } from "../payments/payments-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentParallelSlot() {
  return (
    <Card className="p-4 border-border">
      <CardHeader className="p-2 pb-4">
        <CardTitle className="text-xl font-bold">Payments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={payments} />
      </CardContent>
    </Card>
  );
}
