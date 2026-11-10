export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  { id: "PAY-1001", amount: 316.0, status: "success", email: "ken99@yahoo.com" },
  { id: "PAY-1002", amount: 242.0, status: "success", email: "abe45@gmail.com" },
  { id: "PAY-1003", amount: 837.5, status: "processing", email: "monserrat44@gmail.com" },
  { id: "PAY-1004", amount: 874.0, status: "success", email: "silas22@gmail.com" },
  { id: "PAY-1005", amount: 721.0, status: "failed", email: "carmella@hotmail.com" },
  { id: "PAY-1006", amount: 154.2, status: "pending", email: "sokha.dev@gmail.com" },
  { id: "PAY-1007", amount: 99.99, status: "success", email: "vanna.tech@yahoo.com" },
  { id: "PAY-1008", amount: 450.0, status: "processing", email: "dara.developer@gmail.com" },
  { id: "PAY-1009", amount: 1250.0, status: "success", email: "sopheap.cloud@hotmail.com" },
  { id: "PAY-1010", amount: 85.0, status: "failed", email: "bopha.design@gmail.com" },
  { id: "PAY-1011", amount: 640.75, status: "pending", email: "chenda.istad@gmail.com" },
  { id: "PAY-1012", amount: 320.0, status: "success", email: "visal.code@outlook.com" },
  { id: "PAY-1013", amount: 512.5, status: "processing", email: "piseth.admin@gmail.com" },
  { id: "PAY-1014", amount: 75.0, status: "success", email: "kalyan.web@gmail.com" },
  { id: "PAY-1015", amount: 1890.0, status: "failed", email: "makara.eng@yahoo.com" },
  { id: "PAY-1016", amount: 430.0, status: "success", email: "samnang.ui@gmail.com" },
  { id: "PAY-1017", amount: 215.3, status: "pending", email: "thida.frontend@gmail.com" },
  { id: "PAY-1018", amount: 980.0, status: "success", email: "serey.devops@hotmail.com" },
  { id: "PAY-1019", amount: 60.0, status: "processing", email: "mony.spring@gmail.com" },
  { id: "PAY-1020", amount: 1100.0, status: "success", email: "ratanak.fullstack@gmail.com" },
]