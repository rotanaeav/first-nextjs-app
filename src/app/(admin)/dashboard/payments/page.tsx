import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { payments } from './payments-data'

export default function PaymentsPage() {
  return (
    <div><DataTable columns={columns} data={payments}/></div>
  )
}
