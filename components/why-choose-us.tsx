import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, Headphones, MapPin, Clock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "An Toàn & Tin Cậy",
    description: "Đảm bảo an toàn tuyệt đối cho mọi chuyến đi với bảo hiểm du lịch toàn diện",
  },
  {
    icon: Award,
    title: "Chất Lượng Hàng Đầu",
    description: "Được chứng nhận bởi Tổng cục Du lịch và nhiều giải thưởng uy tín",
  },
  {
    icon: Users,
    title: "Hướng Dẫn Viên Chuyên Nghiệp",
    description: "Đội ngũ HDV giàu kinh nghiệm, am hiểu văn hóa và lịch sử địa phương",
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi trong suốt hành trình",
  },
  {
    icon: MapPin,
    title: "Điểm Đến Đa Dạng",
    description: "Hơn 100 điểm đến trong nước và quốc tế với các tour độc đáo",
  },
  {
    icon: Clock,
    title: "Lịch Trình Linh Hoạt",
    description: "Tùy chỉnh lịch trình theo nhu cầu và sở thích của từng khách hàng",
  },
]

export function WhyChooseUs() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tại Sao Chọn VietTravel?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-balance">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-muted-foreground">Năm kinh nghiệm</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Khách hàng hài lòng</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Điểm đến</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="text-muted-foreground">Đánh giá trung bình</div>
          </div>
        </div>
      </div>
    </section>
  )
}
