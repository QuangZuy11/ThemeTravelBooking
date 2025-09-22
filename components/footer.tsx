import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold text-primary">VietTravel</h3>
                <p className="text-sm text-muted">Khám phá Việt Nam</p>
              </div>
            </div>
            <p className="text-muted mb-4">
              Công ty du lịch hàng đầu Việt Nam với hơn 10 năm kinh nghiệm, chuyên tổ chức các tour trong nước và quốc
              tế chất lượng cao.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="text-muted hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-muted hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-muted hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-muted hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-muted hover:text-primary transition-colors">
                  Điểm đến
                </a>
              </li>
              <li>
                <a href="#tours" className="text-muted hover:text-primary transition-colors">
                  Tour du lịch
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted hover:text-primary transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Tin tức
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Tour trong nước
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Tour nước ngoài
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Đặt vé máy bay
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Đặt khách sạn
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Thuê xe du lịch
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-colors">
                  Visa & Hộ chiếu
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted text-sm">+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted text-sm">info@viettravel.com</span>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Đăng ký nhận tin</h5>
              <div className="flex gap-2">
                <Input
                  placeholder="Email của bạn"
                  className="bg-muted/20 border-muted text-background placeholder:text-muted/70"
                />
                <Button className="bg-primary hover:bg-primary/90">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-12 pt-8 text-center">
          <p className="text-muted text-sm">
            © 2024 VietTravel. Tất cả quyền được bảo lưu. |
            <a href="#" className="hover:text-primary transition-colors">
              {" "}
              Chính sách bảo mật
            </a>{" "}
            |
            <a href="#" className="hover:text-primary transition-colors">
              {" "}
              Điều khoản sử dụng
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
