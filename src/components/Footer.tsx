import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold text-primary">VietTravel</h3>
                <p className="text-sm text-background/70">Khám phá Việt Nam</p>
              </div>
            </div>
            <p className="text-background/80 text-sm">
              Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất, giúp bạn khám phá vẻ đẹp của đất nước
              Việt Nam.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:text-primary hover:bg-background/10">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:text-primary hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-background/80 hover:text-primary transition-colors">
                  Điểm đến
                </a>
              </li>
              <li>
                <a href="#tours" className="text-background/80 hover:text-primary transition-colors">
                  Tour du lịch
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-primary transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/80 hover:text-primary transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Dịch vụ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Tour trong nước
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Tour nước ngoài
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Đặt khách sạn
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Vé máy bay
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Thuê xe
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên hệ</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80">+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80">info@viettravel.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-background/80">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Đăng ký nhận tin</h5>
              <div className="flex gap-2">
                <Input
                  placeholder="Email của bạn"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button className="bg-primary hover:bg-primary/90">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2024 VietTravel. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
