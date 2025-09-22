import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Calendar } from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Tour Vịnh Hạ Long 2N1Đ - Du thuyền 5 sao",
    image: "/ha-long-bay-luxury-cruise-ship-sunset-limestone-is.jpg",
    price: "2,890,000",
    originalPrice: "3,200,000",
    duration: "2 ngày 1 đêm",
    groupSize: "15-20 người",
    rating: 4.9,
    reviews: 156,
    departure: "Hà Nội",
    highlights: ["Du thuyền 5 sao", "Động Thiên Cung", "Làng chài Cửa Vạn"],
    discount: "10%",
  },
  {
    id: 2,
    title: "Tour Sapa 3N2Đ - Trekking & Homestay",
    image: "/sapa-vietnam-trekking-rice-terraces-ethnic-village.jpg",
    price: "1,950,000",
    originalPrice: "2,300,000",
    duration: "3 ngày 2 đêm",
    groupSize: "10-15 người",
    rating: 4.8,
    reviews: 89,
    departure: "Hà Nội",
    highlights: ["Fansipan", "Bản Cát Cát", "Homestay dân tộc"],
    discount: "15%",
  },
  {
    id: 3,
    title: "Tour Hội An - Mỹ Sơn 3N2Đ",
    image: "/hoi-an-vietnam-ancient-town-my-son-sanctuary-templ.jpg",
    price: "2,150,000",
    originalPrice: null,
    duration: "3 ngày 2 đêm",
    groupSize: "12-18 người",
    rating: 4.7,
    reviews: 124,
    departure: "Đà Nẵng",
    highlights: ["Phố cổ Hội An", "Thánh địa Mỹ Sơn", "Làng rau Trà Quế"],
    discount: null,
  },
  {
    id: 4,
    title: "Tour Phú Quốc 4N3Đ - Resort 4 sao",
    image: "/phu-quoc-vietnam-beach-resort-cable-car-sunset.jpg",
    price: "4,200,000",
    originalPrice: "4,800,000",
    duration: "4 ngày 3 đêm",
    groupSize: "8-12 người",
    rating: 4.9,
    reviews: 203,
    departure: "TP.HCM",
    highlights: ["Cáp treo Hòn Thơm", "Safari Phú Quốc", "Chợ đêm Dinh Cậu"],
    discount: "12%",
  },
  {
    id: 5,
    title: "Tour Đà Lạt 3N2Đ - Thành phố ngàn hoa",
    image: "/da-lat-vietnam-flower-gardens-waterfalls-pine-fore.jpg",
    price: "1,680,000",
    originalPrice: null,
    duration: "3 ngày 2 đêm",
    groupSize: "15-20 người",
    rating: 4.6,
    reviews: 97,
    departure: "TP.HCM",
    highlights: ["Thác Elephant", "Vườn hoa Đà Lạt", "Ga Đà Lạt"],
    discount: null,
  },
  {
    id: 6,
    title: "Tour Ninh Bình 2N1Đ - Tràng An & Tam Cốc",
    image: "/ninh-binh-vietnam-trang-an-tam-coc-boat-tour-limes.jpg",
    price: "1,450,000",
    originalPrice: "1,650,000",
    duration: "2 ngày 1 đêm",
    groupSize: "12-16 người",
    rating: 4.8,
    reviews: 78,
    departure: "Hà Nội",
    highlights: ["Tràng An", "Tam Cốc", "Chùa Bái Đính"],
    discount: "12%",
  },
]

export function PopularTours() {
  return (
    <section id="tours" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tour Du Lịch Phổ Biến</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Những tour du lịch được yêu thích nhất với chất lượng dịch vụ tuyệt vời và giá cả hợp lý
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Card key={tour.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {tour.discount && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    Giảm {tour.discount}
                  </Badge>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{tour.rating}</span>
                  <span className="text-xs text-muted-foreground">({tour.reviews})</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-balance">{tour.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Khởi hành từ {tour.departure}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {tour.highlights.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.highlights.length - 2} khác
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">{tour.price}đ</span>
                      {tour.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{tour.originalPrice}đ</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">/ người</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Đặt ngay</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground bg-transparent">
            Xem tất cả tour
          </Button>
        </div>
      </div>
    </section>
  )
}
