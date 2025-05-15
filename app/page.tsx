"use client"

import { useState, useEffect } from "react"
import { Box, Button, Container, Typography, AppBar, Toolbar } from "@mui/material"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Shirt,
  Palette,
  RotateCw,
  Upload,
  Zap,
  Smartphone,
  Github,
  Layers,
  User,
  Home,
  Menu,
  ArrowRight,
} from "lucide-react"

// Sketchfab model component
const SketchfabModel = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        title="Fashion Woman 0318"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
        src="https://sketchfab.com/models/3e095eed1dc74ec78ad0d472c4019d47/embed"
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          bgcolor: "rgba(255,255,255,0.8)",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          fontSize: "13px",
          fontWeight: "normal",
          color: "#4A4A4A",
        }}
      >
        <Typography variant="caption" sx={{ display: "block" }}>
          <a
            href="https://sketchfab.com/3d-models/fashion-woman-0318-3e095eed1dc74ec78ad0d472c4019d47"
            target="_blank"
            rel="noreferrer nofollow"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            Fashion Woman 0318
          </a>{" "}
          by{" "}
          <a
            href="https://sketchfab.com/3dfarm"
            target="_blank"
            rel="noreferrer nofollow"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            3DFarm
          </a>{" "}
          on{" "}
          <a
            href="https://sketchfab.com"
            target="_blank"
            rel="noreferrer nofollow"
            style={{ fontWeight: "bold", color: "#1CAAD9" }}
          >
            Sketchfab
          </a>
        </Typography>
      </Box>
    </Box>
  )
}

// Feature card component with icon
const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
    <Box
      sx={{
        p: 3,
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
          color: "primary.main",
          fontSize: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom align="center">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {description}
      </Typography>
    </Box>
  </motion.div>
)

export default function LandingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = () => {
    router.push("/app")
  }

  if (!mounted) return null

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Navigation */}
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: "blur(10px)", bgcolor: "rgba(255, 255, 255, 0.8)" }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Layers size={28} color="#5c6bc0" />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontWeight: "bold", color: "#5c6bc0" }}>
              AvatarFit
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button startIcon={<Home size={18} />} color="inherit">
              Home
            </Button>
            <Button startIcon={<Layers size={18} />} color="inherit">
              Features
            </Button>
            <Button startIcon={<Github size={18} />} color="inherit">
              GitHub
            </Button>
            <Button variant="contained" color="primary" onClick={handleGetStarted} startIcon={<User size={18} />}>
              Try Now
            </Button>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Button color="inherit">
              <Menu />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          bgcolor: "#5c6bc0",
          color: "white",
          pt: 8, // Add padding top to account for the AppBar
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #5c6bc0 0%, #3949ab 100%)",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
            <Box sx={{ flex: 1, pr: { md: 4 }, mb: { xs: 6, md: 0 } }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  3D Avatar Fitting App
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
                  Upload, customize, and fit clothing on your 3D avatars with ease
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{
                    bgcolor: "white",
                    color: "#5c6bc0",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                  endIcon={<ArrowRight size={20} />}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>

            {/* Sketchfab Model */}
            <Box
              sx={{
                flex: 1,
                height: { xs: "300px", md: "500px" },
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ height: "100%" }}
              >
                <SketchfabModel />
              </motion.div>
            </Box>
          </Box>
        </Container>

        {/* Animated wave */}
        <Box
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23FFFFFF'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23FFFFFF'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23FFFFFF'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Key Features
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
              Our app provides everything you need to create and customize your 3D avatars
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 4,
          }}
        >
          <FeatureCard
            icon={<RotateCw size={40} />}
            title="Interactive 3D Viewport"
            description="Rotate, zoom, and pan to view your avatar from any angle with intuitive controls."
            delay={0.2}
          />
          <FeatureCard
            icon={<Shirt size={40} />}
            title="Clothing Customization"
            description="Upload and fit clothing models onto your avatar with automatic positioning."
            delay={0.3}
          />
          <FeatureCard
            icon={<Palette size={40} />}
            title="Color Customization"
            description="Change the color of clothing items to match your style preferences."
            delay={0.4}
          />
          <FeatureCard
            icon={<Smartphone size={40} />}
            title="Responsive Design"
            description="Use the app on any device - desktop, tablet, or mobile phone."
            delay={0.5}
          />
          <FeatureCard
            icon={<Upload size={40} />}
            title="Drag & Drop Upload"
            description="Easily upload your 3D models with a simple drag and drop interface."
            delay={0.6}
          />
          <FeatureCard
            icon={<Zap size={40} />}
            title="Real-time Preview"
            description="See changes to your avatar and clothing in real-time as you make them."
            delay={0.7}
          />
        </Box>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "#f0f0f0" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                How It Works
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
                Get started in just three simple steps
              </Typography>
            </motion.div>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 4,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <Upload size={40} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  1. Upload Avatar
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upload your 3D avatar model in GLB or GLTF format
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <Shirt size={40} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  2. Add Clothing
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upload clothing items to fit on your avatar
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <Palette size={40} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  3. Customize
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Adjust colors and positioning to perfect your look
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component="section"
        sx={{
          py: 10,
          bgcolor: "#5c6bc0",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <Box
          sx={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />

        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Get Started?
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 300, maxWidth: 700, mx: "auto" }}>
              Jump right in and start creating your custom 3D avatar with our easy-to-use tools
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                bgcolor: "white",
                color: "#5c6bc0",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
              startIcon={<Zap size={20} />}
              endIcon={<ArrowRight size={20} />}
            >
              Launch App
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: "center", bgcolor: "#f0f0f0" }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}>
            <Github size={24} color="#666" />
            <Layers size={24} color="#666" />
            <User size={24} color="#666" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} 3D Avatar Fitting App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
