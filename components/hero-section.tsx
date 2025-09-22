"use client"

import { useState, useEffect } from "react"
import { Button, Card, TextField, Box, Container, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import GroupIcon from "@mui/icons-material/Group"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

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
    <Box sx={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
      {/* Image Carousel */}
      <Box sx={{ position: 'absolute', inset: 0 }}>
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s'
            }}
          >
            <Box
              component="img"
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.4)'
            }} />
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <Button
        variant="text"
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 10,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
        }}
        onClick={prevSlide}
      >
        <ChevronLeftIcon sx={{ fontSize: 40 }} />
      </Button>
      <Button
        variant="text"
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 10,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
        }}
        onClick={nextSlide}
      >
        <ChevronRightIcon sx={{ fontSize: 40 }} />
      </Button>

      {/* Content Overlay */}
      <Box sx={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Khám Phá Vẻ Đẹp Việt Nam
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
              Trải nghiệm những chuyến du lịch tuyệt vời với các tour chất lượng cao, dịch vụ chuyên nghiệp và giá cả hợp lý
            </Typography>

            {/* Search Form */}
            <Card sx={{ maxWidth: '900px', mx: 'auto', p: 3, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="subtitle2" color="text.primary">
                      Điểm đến
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Chọn điểm đến..."
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarMonthIcon fontSize="small" />
                    <Typography variant="subtitle2" color="text.primary">
                      Ngày khởi hành
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <GroupIcon fontSize="small" />
                    <Typography variant="subtitle2" color="text.primary">
                      Số người
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="2 người lớn"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    sx={{ height: 40 }}
                  >
                    Tìm tour
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Slide Indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
              {heroImages.map((_, index) => (
                <Button
                  key={index}
                  sx={{
                    minWidth: 'auto',
                    width: 12,
                    height: 12,
                    p: 0,
                    borderRadius: '50%',
                    bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                    '&:hover': { bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.7)' }
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
