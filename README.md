# Train Tracker

 A pitiful attempt to do the impossible
 

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)

##  Features

-  **Interactive Map**: View the complete LRT-2 route with all stations
-  **Station Markers**: Click on any station to view detailed information
-  **Route Visualization**: See the entire train line rendered on the map
-  **Station Selection**: Select origin and destination stations

##  Screenshots

<img width="395" height="878" alt="image" src="https://github.com/user-attachments/assets/94f445b3-078e-48b0-a3c1-eccc6399adbf" />


## 🛠️ Tech Stack

### Core
- **React Native** - Mobile framework
- **Expo** (~54.0.33) - Development platform
- **TypeScript** - Type safety
- **Expo Router** (~6.0.23) - File-based routing

### Mapping
- **Mapbox Maps SDK** (`@rnmapbox/maps`) - Interactive maps
- **GeoJSON** - Route and station data

### Styling
- **NativeWind** / **Tailwind CSS** - Utility-first styling
- Custom color system with design tokens

## 📁 Project Structure

```
train-tracker/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── _layout.tsx          # Tab layout
│   │   └── ...
│   ├── _layout.tsx              # Root layout
├── assets/                       # Static assets
│   ├── images/                  # Images and icons
│   └── fonts/                   # Custom fonts
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   │   ├── StationCodeBadge.tsx
│   │   └── ...
│   └── Map.tsx             # Main map component
├── constants/                    # App constants
│   └── colors.ts                # Color palette
├── context/                      # React Context providers
│   └── StationContext.tsx       # Station selection state
├── data/                         # Static data
│   ├── trains/
│   │   └── lrt2/
│   │       ├── route.json       # GeoJSON track data
│   │       └── stations.json    # Station information
│   └── map/
│       └── mapstyle.json        # Map styling
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── app.config.js                 # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

### Adding More Train Lines in the future

1. Add route GeoJSON to `data/trains/[line-name]/route.json`
2. Add station data to `data/trains/[line-name]/stations.json`
3. Create a new map component or extend existing one

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
