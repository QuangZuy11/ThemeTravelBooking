// Payment Service for handling transactions
export type PaymentMethodType = "credit_card" | "bank_transfer" | "e_wallet" | "cash"
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

export interface PaymentRequest {
  bookingId: string
  amount: number
  currency: string
  paymentMethod: PaymentMethodType
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  billingAddress?: {
    street: string
    city: string
    country: string
    zipCode: string
  }
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  currency: string
  paymentMethod: PaymentMethodType
  status: PaymentStatus
  transactionId?: string
  gatewayResponse?: any
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  failureReason?: string
}

interface PaymentMethod {
  id: string
  type: PaymentMethodType
  name: string
  description: string
  icon: string
  processingFee: number // percentage
  isAvailable: boolean
}

// Available payment methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: "credit_card",
    type: "credit_card",
    name: "Thẻ tín dụng/Ghi nợ",
    description: "Visa, Mastercard, JCB",
    icon: "💳",
    processingFee: 2.5,
    isAvailable: true,
  },
  {
    id: "bank_transfer",
    type: "bank_transfer",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trực tiếp",
    icon: "🏦",
    processingFee: 0,
    isAvailable: true,
  },
  {
    id: "e_wallet",
    type: "e_wallet",
    name: "Ví điện tử",
    description: "MoMo, ZaloPay, VNPay",
    icon: "📱",
    processingFee: 1.5,
    isAvailable: true,
  },
  {
    id: "cash",
    type: "cash",
    name: "Tiền mặt",
    description: "Thanh toán tại văn phòng",
    icon: "💵",
    processingFee: 0,
    isAvailable: true,
  },
]

// Process payment
export const processPayment = async (paymentRequest: PaymentRequest): Promise<Payment> => {
  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const payment: Payment = {
    id: Date.now().toString(),
    bookingId: paymentRequest.bookingId,
    amount: paymentRequest.amount,
    currency: paymentRequest.currency,
    paymentMethod: paymentRequest.paymentMethod,
    status: "processing",
    transactionId: `TXN${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Simulate payment gateway response
  const isSuccess = Math.random() > 0.1 // 90% success rate

  if (isSuccess) {
    payment.status = "completed"
    payment.completedAt = new Date()
    payment.gatewayResponse = {
      code: "00",
      message: "Transaction successful",
      authCode: `AUTH${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    }
  } else {
    payment.status = "failed"
    payment.failureReason = "Insufficient funds or card declined"
    payment.gatewayResponse = {
      code: "05",
      message: "Transaction declined",
    }
  }

  return payment
}

// Get payment history
export const getPaymentHistory = async (userId: string): Promise<Payment[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock payment history
  return [
    {
      id: "1",
      bookingId: "1",
      amount: 5000000,
      currency: "VND",
      paymentMethod: "credit_card",
      status: "completed",
      transactionId: "TXN123456789",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      completedAt: new Date("2024-01-15"),
      gatewayResponse: {
        code: "00",
        message: "Transaction successful",
        authCode: "AUTH123",
      },
    },
    {
      id: "2",
      bookingId: "2",
      amount: 6400000,
      currency: "VND",
      paymentMethod: "bank_transfer",
      status: "pending",
      transactionId: "TXN987654321",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
    },
  ]
}

// Refund payment
export const refundPayment = async (paymentId: string, amount: number, reason: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  // Mock refund process
  return true
}
