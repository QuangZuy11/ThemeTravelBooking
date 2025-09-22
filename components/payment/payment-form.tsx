"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  processPayment,
  paymentMethods,
  type PaymentRequest,
  type Payment,
  type PaymentMethod,
} from "@/lib/payment-service"
import { sendPaymentConfirmation } from "@/lib/notification-service"
import { useAuth } from "@/contexts/auth-context"
import {
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react"

interface PaymentFormProps {
  bookingId: string
  bookingNumber: string
  amount: number
  serviceName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentCompleted?: (payment: Payment) => void
}

export function PaymentForm({
  bookingId,
  bookingNumber,
  amount,
  serviceName,
  open,
  onOpenChange,
  onPaymentCompleted,
}: PaymentFormProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<Payment | null>(null)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      country: "Vietnam",
      zipCode: "",
    },
    saveCard: false,
    agreeTerms: false,
  })

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "credit_card":
        return <CreditCard className="h-5 w-5" />
      case "bank_transfer":
        return <Building2 className="h-5 w-5" />
      case "e_wallet":
        return <Smartphone className="h-5 w-5" />
      case "cash":
        return <Banknote className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const calculateTotal = () => {
    if (!selectedMethod) return amount
    const processingFee = (amount * selectedMethod.processingFee) / 100
    return amount + processingFee
  }

  const handleProcessPayment = async () => {
    if (!user || !selectedMethod) return

    setIsProcessing(true)
    try {
      const paymentRequest: PaymentRequest = {
        bookingId,
        amount: calculateTotal(),
        currency: "VND",
        paymentMethod: selectedMethod.type,
        customerInfo: {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
        },
        billingAddress: paymentData.billingAddress.street ? paymentData.billingAddress : undefined,
      }

      const payment = await processPayment(paymentRequest)
      setPaymentResult(payment)
      setStep(3)

      if (payment.status === "completed") {
        // Send notification
        await sendPaymentConfirmation(user.id, payment.id, payment.amount, bookingNumber)
        onPaymentCompleted?.(payment)
      }
    } catch (error) {
      console.error("Payment processing error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedMethod(null)
    setPaymentResult(null)
    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: {
        street: "",
        city: "",
        country: "Vietnam",
        zipCode: "",
      },
      saveCard: false,
      agreeTerms: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Thanh toán an toàn
          </DialogTitle>
          <DialogDescription>Hoàn tất thanh toán cho booking {bookingNumber}</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Dịch vụ:</span>
                    <span className="font-medium">{serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mã booking:</span>
                    <span>{bookingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá dịch vụ:</span>
                    <span>{amount.toLocaleString("vi-VN")}đ</span>
                  </div>
                  {selectedMethod && selectedMethod.processingFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Phí xử lý ({selectedMethod.processingFee}%):</span>
                      <span>{((amount * selectedMethod.processingFee) / 100).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">{calculateTotal().toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chọn phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods
                    .filter((method) => method.isAvailable)
                    .map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedMethod?.id === method.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedMethod(method)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getMethodIcon(method.type)}
                            <div>
                              <h3 className="font-medium">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {method.processingFee > 0 && (
                              <Badge variant="secondary">+{method.processingFee}% phí</Badge>
                            )}
                            {method.processingFee === 0 && <Badge variant="outline">Miễn phí</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setStep(2)} className="w-full" disabled={!selectedMethod}>
              Tiếp tục
            </Button>
          </div>
        )}

        {step === 2 && selectedMethod && (
          <div className="space-y-6">
            {/* Payment Details */}
            {selectedMethod.type === "credit_card" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin thẻ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Số thẻ</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Tên chủ thẻ</Label>
                    <Input
                      id="cardholderName"
                      placeholder="NGUYEN VAN A"
                      value={paymentData.cardholderName}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      checked={paymentData.saveCard}
                      onCheckedChange={(checked) => setPaymentData((prev) => ({ ...prev, saveCard: !!checked }))}
                    />
                    <Label htmlFor="saveCard" className="text-sm">
                      Lưu thông tin thẻ cho lần thanh toán sau
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedMethod.type === "bank_transfer" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thông tin chuyển khoản</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Ngân hàng: Vietcombank</p>
                      <p>Số tài khoản: 1234567890</p>
                      <p>Chủ tài khoản: CONG TY DU LICH VIETTRAVEL</p>
                      <p>Nội dung: {bookingNumber}</p>
                    </div>
                    <div className="flex items-start gap-2 text-orange-600">
                      <AlertTriangle className="h-4 w-4 mt-0.5" />
                      <p className="text-sm">
                        Vui lòng chuyển khoản đúng số tiền và ghi đúng nội dung để được xử lý tự động.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedMethod.type === "e_wallet" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thanh toán ví điện tử</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ví điện tử" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="momo">MoMo</SelectItem>
                        <SelectItem value="zalopay">ZaloPay</SelectItem>
                        <SelectItem value="vnpay">VNPay</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600">
                      Bạn sẽ được chuyển hướng đến ứng dụng ví điện tử để hoàn tất thanh toán.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedMethod.type === "cash" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thanh toán tiền mặt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>Địa chỉ văn phòng:</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">VietTravel - Chi nhánh Hà Nội</p>
                      <p>123 Phố Huế, Hai Bà Trưng, Hà Nội</p>
                      <p>Điện thoại: 024 3123 4567</p>
                      <p>Giờ làm việc: 8:00 - 17:30 (T2-T6)</p>
                    </div>
                    <p className="text-orange-600">Vui lòng mang theo mã booking {bookingNumber} khi đến thanh toán.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={paymentData.agreeTerms}
                onCheckedChange={(checked) => setPaymentData((prev) => ({ ...prev, agreeTerms: !!checked }))}
              />
              <Label htmlFor="agreeTerms" className="text-sm">
                Tôi đồng ý với{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  chính sách bảo mật
                </a>
              </Label>
            </div>

            {/* Payment Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Tổng thanh toán:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {calculateTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-transparent">
                Quay lại
              </Button>
              <Button
                onClick={handleProcessPayment}
                className="flex-1"
                disabled={!paymentData.agreeTerms || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  `Thanh toán ${calculateTotal().toLocaleString("vi-VN")}đ`
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && paymentResult && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              {paymentResult.status === "completed" ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>

            <div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  paymentResult.status === "completed" ? "text-green-600" : "text-red-600"
                }`}
              >
                {paymentResult.status === "completed" ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
              </h2>
              <p className="text-gray-600">
                {paymentResult.status === "completed"
                  ? "Giao dịch của bạn đã được xử lý thành công."
                  : paymentResult.failureReason || "Đã có lỗi xảy ra trong quá trình thanh toán."}
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Mã giao dịch:</span>
                    <span className="font-medium">{paymentResult.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phương thức:</span>
                    <span>{selectedMethod?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số tiền:</span>
                    <span className="font-medium text-orange-600">{paymentResult.amount.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời gian:</span>
                    <span>{paymentResult.createdAt.toLocaleString("vi-VN")}</span>
                  </div>
                  {paymentResult.gatewayResponse?.authCode && (
                    <div className="flex justify-between">
                      <span>Mã xác thực:</span>
                      <span className="font-medium">{paymentResult.gatewayResponse.authCode}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  resetForm()
                }}
                className="flex-1 bg-transparent"
              >
                Đóng
              </Button>
              {paymentResult.status === "completed" ? (
                <Button
                  onClick={() => {
                    onOpenChange(false)
                    resetForm()
                  }}
                  className="flex-1"
                >
                  Xem booking
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setStep(1)
                    setPaymentResult(null)
                  }}
                  className="flex-1"
                >
                  Thử lại
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
