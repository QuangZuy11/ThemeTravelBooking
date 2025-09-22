import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, Clock, MapPin, Heart } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "An toàn & Tin cậy",
    description: "Đảm bảo an toàn tuyệt đối cho mọi chuyến đi với bảo hiểm du lịch toàn diện",
  },
  {
    icon: Award,
    title: "Chất lượng hàng đầu",
    description: "Được chứng nhận bởi các tổ chức du lịch uy tín với tiêu chuẩn dịch vụ 5 sao",
  },
  {
    icon: Users,
    title: "Hướng dẫn viên chuyên nghiệp",
    description: "Đội ngũ HDV giàu kinh nghiệm, am hiểu văn hóa và lịch sử địa phương",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi trong suốt hành trình",
  },
  {
    icon: MapPin,
    title: "Lịch trình linh hoạt",
    description: "Tùy chỉnh lịch trình theo nhu cầu và sở thích của từng khách hàng",
  },
  {
    icon: Heart,
    title: "Trải nghiệm đáng nhớ",
    description: "Tạo ra những kỷ niệm khó quên với các hoạt động độc đáo và ý nghĩa",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tại Sao Chọn VietTravel?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất với dịch vụ chuyên nghiệp và tận tâm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-balance">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Sẵn sàng khám phá Việt Nam?</h3>
            <p className="text-muted-foreground mb-6 text-balance">
              Hãy để chúng tôi đồng hành cùng bạn trong những chuyến phiêu lưu tuyệt vời khắp đất nước Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Khách hàng hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Tour đã tổ chức</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Hỗ trợ khách hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
