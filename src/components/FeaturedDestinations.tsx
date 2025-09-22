import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    image: "/ha-long-bay-vietnam-limestone-karsts-emerald-water.jpg",
    rating: 4.9,
    tours: 25,
    description: "Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi tuyệt đẹp",
  },
  {
    id: 2,
    name: "Sapa",
    location: "Lào Cai",
    image: "/sapa-vietnam-rice-terraces-mountain-landscape-ethn.jpg",
    rating: 4.8,
    tours: 18,
    description: "Ruộng bậc thang hùng vĩ và văn hóa dân tộc đa dạng",
  },
  {
    id: 3,
    name: "Hội An",
    location: "Quảng Nam",
    image: "/hoi-an-vietnam-ancient-town-colorful-lanterns-rive.jpg",
    rating: 4.9,
    tours: 22,
    description: "Phố cổ với kiến trúc độc đáo và ẩm thực phong phú",
  },
  {
    id: 4,
    name: "Phú Quốc",
    location: "Kiên Giang",
    image: "/phu-quoc-vietnam-tropical-beach-white-sand-palm-tr.jpg",
    rating: 4.7,
    tours: 15,
    description: "Đảo ngọc với bãi biển tuyệt đẹp và hải sản tươi ngon",
  },
  {
    id: 5,
    name: "Đà Lạt",
    location: "Lâm Đồng",
    image: "/da-lat-vietnam-flower-gardens-pine-forests-cool-cl.jpg",
    rating: 4.6,
    tours: 20,
    description: "Thành phố ngàn hoa với khí hậu mát mẻ quanh năm",
  },
  {
    id: 6,
    name: "Ninh Bình",
    location: "Ninh Bình",
    image: "/ninh-binh-vietnam-tam-coc-limestone-mountains-rive.jpg",
    rating: 4.8,
    tours: 12,
    description: "Vịnh Hạ Long trên cạn với cảnh quan hùng vĩ",
  },
]

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Điểm Đến Nổi Bật</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Khám phá những điểm đến tuyệt vời nhất Việt Nam với các tour được thiết kế đặc biệt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{destination.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.location}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{destination.tours} tour có sẵn</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Xem tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Xem tất cả điểm đến
          </Button>
        </div>
      </div>
    </section>
  )
}
