# 3D Avatar Fitting App

A web application that allows users to upload 3D avatar models and clothing, then fit them together in an interactive 3D scene.

## Features

- Upload 3D avatar models (GLB/GLTF format)
- Upload 3D clothing models (GLB/GLTF format)
- Interactive 3D viewport with orbit controls (rotate, zoom, pan)
- Toggle clothing visibility
- Change clothing color
- Reset scene
- Responsive design for desktop and mobile
- Drag and drop file upload

## Tech Stack

- Next.js
- React
- Three.js with React Three Fiber
- Material UI (MUI)
- TypeScript

## Setup Instructions

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/avatar-fitting-app.git
cd avatar-fitting-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload an avatar model by clicking on the "Upload Avatar" area or dragging and dropping a GLB/GLTF file.
2. Upload a clothing model by clicking on the "Upload Clothing" area or dragging and dropping a GLB/GLTF file.
3. Use your mouse to interact with the 3D scene:
   - Left-click and drag to rotate
   - Right-click and drag to pan
   - Scroll to zoom
4. Use the control panel to:
   - Toggle clothing visibility
   - Change the clothing color
   - Reset the scene

## Notes on 3D Models

- The app works best with humanoid avatar models
- Clothing models should be proportional to the avatar
- The app performs basic auto-fitting by centering both models
- For best results, use models with similar proportions and scales

## License

MIT
