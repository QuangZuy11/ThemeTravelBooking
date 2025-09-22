import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Calendar } from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Tour Hạ Long Bay 3N2Đ - Khám phá kỳ quan thiên nhiên",
    destination: "Quảng Ninh",
    duration: "3 ngày 2 đêm",
    groupSize: "2-15 người",
    price: "2,500,000",
    originalPrice: "3,000,000",
    rating: 4.9,
    reviews: 156,
    image: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    highlights: ["Du thuyền sang trọng", "Hang Sửng Sốt", "Làng chài Cửa Vạn"],
    departure: "Hàng ngày",
    discount: 17,
  },
  {
    id: 2,
    title: "Tour Sapa Trekking 2N1Đ - Chinh phục đỉnh Fansipan",
    destination: "Lào Cai",
    duration: "2 ngày 1 đêm",
    groupSize: "4-12 người",
    price: "1,800,000",
    originalPrice: "2,200,000",
    rating: 4.8,
    reviews: 89,
    image: "/sapa-vietnam-rice-terraces-mountain-landscape.jpg",
    highlights: ["Cáp treo Fansipan", "Bản Cát Cát", "Thác Bạc"],
    departure: "Thứ 2, 4, 6",
    discount: 18,
  },
  {
    id: 3,
    title: "Tour Hội An - Mỹ Sơn 1 ngày - Khám phá di sản văn hóa",
    destination: "Quảng Nam",
    duration: "1 ngày",
    groupSize: "6-20 người",
    price: "850,000",
    originalPrice: "1,000,000",
    rating: 4.7,
    reviews: 234,
    image: "/hoi-an-vietnam-ancient-town-lanterns-night.jpg",
    highlights: ["Phố cổ Hội An", "Thánh địa Mỹ Sơn", "Làng gốm Thanh Hà"],
    departure: "Hàng ngày",
    discount: 15,
  },
  {
    id: 4,
    title: "Tour Phú Quốc 4N3Đ - Thiên đường biển đảo",
    destination: "Kiên Giang",
    duration: "4 ngày 3 đêm",
    groupSize: "2-10 người",
    price: "3,200,000",
    originalPrice: "3,800,000",
    rating: 4.6,
    reviews: 67,
    image: "/phu-quoc-vietnam-tropical-beach-white-sand-palm-tr.jpg",
    highlights: ["Cáp treo Hòn Thơm", "Safari Phú Quốc", "Chợ đêm Dinh Cậu"],
    departure: "Chủ nhật",
    discount: 16,
  },
  {
    id: 5,
    title: "Tour Đà Lạt 3N2Đ - Thành phố ngàn hoa",
    destination: "Lâm Đồng",
    duration: "3 ngày 2 đêm",
    groupSize: "4-16 người",
    price: "1,950,000",
    originalPrice: "2,300,000",
    rating: 4.5,
    reviews: 123,
    image: "/da-lat-vietnam-flower-gardens-pine-forests-cool-cl.jpg",
    highlights: ["Thiền viện Trúc Lâm", "Thác Elephant", "Ga Đà Lạt"],
    departure: "Thứ 3, 5, 7",
    discount: 15,
  },
  {
    id: 6,
    title: "Tour Ninh Bình 2N1Đ - Vịnh Hạ Long trên cạn",
    destination: "Ninh Bình",
    duration: "2 ngày 1 đêm",
    groupSize: "6-18 người",
    price: "1,400,000",
    originalPrice: "1,650,000",
    rating: 4.8,
    reviews: 98,
    image: "/ninh-binh-vietnam-tam-coc-limestone-mountains-rive.jpg",
    highlights: ["Tràng An", "Tam Cốc", "Hang Múa"],
    departure: "Thứ 6, 7, CN",
    discount: 15,
  },
]

export function PopularTours() {
  return (
    <section id="tours" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tour Du Lịch Phổ Biến</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Những tour du lịch được yêu thích nhất với dịch vụ chất lượng cao và giá cả hợp lý
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
                {tour.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    -{tour.discount}%
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{tour.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.destination}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">{tour.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Khởi hành: {tour.departure}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
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

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{Number(tour.price).toLocaleString()} VNĐ</span>
                      {tour.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {Number(tour.originalPrice).toLocaleString()} VNĐ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {tour.rating} ({tour.reviews} đánh giá)
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Đặt ngay
                  </Button>
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
