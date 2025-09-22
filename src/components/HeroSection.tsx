"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Calendar, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  {
    url: "/ha-long-bay-vietnam-beautiful-landscape-with-limes.jpg",
    title: "Vịnh Hạ Long",
    subtitle: "Kỳ quan thiên nhiên thế giới",
  },
  {
    url: "/sapa-vietnam-rice-terraces-mountain-landscape.jpg",
    title: "Sapa",
    subtitle: "Ruộng bậc thang tuyệt đẹp",
  },
  {
    url: "/hoi-an-vietnam-ancient-town-lanterns-night.jpg",
    title: "Hội An",
    subtitle: "Phố cổ đầy màu sắc",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Khám Phá Vẻ Đẹp Việt Nam</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto">
            Trải nghiệm những chuyến du lịch tuyệt vời với các tour chất lượng cao, dịch vụ chuyên nghiệp và giá cả hợp
            lý
          </p>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Điểm đến
                </label>
                <Input placeholder="Chọn điểm đến..." className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ngày khởi hành
                </label>
                <Input type="date" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Số người
                </label>
                <Input placeholder="2 người lớn" className="bg-white" />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 h-10">
                  <Search className="h-4 w-4 mr-2" />
                  Tìm tour
                </Button>
              </div>
            </div>
          </Card>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
