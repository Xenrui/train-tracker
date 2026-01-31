// app.config.js
export default {
  expo: {
    name: 'lakbay',
    slug: 'lakbay',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'lakbay',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.anonymous.lakbay',
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      [
        '@rnmapbox/maps',
        {
          // Use environment variable instead of hardcoding
          RNMAPBOX_MAPS_DOWNLOAD_TOKEN:
            process.env.RNMAPBOX_MAPS_DOWNLOAD_TOKEN,
        },
      ],
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      'expo-font',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      // Add this for runtime access to public token
      mapboxAccessToken: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
    },
  },
};
