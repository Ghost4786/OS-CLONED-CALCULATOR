# Open Source iOS-Style Scientific Calculator (Vite + Capacitor)

Welcome to the **Premium iOS-Style Scientific Calculator** template! This is a production-ready, high-performance web and mobile application built with modern web technologies. It is designed to perfectly mimic the native iOS calculator aesthetic while providing advanced scientific capabilities.

### 📥 Download App
You can download and install the compiled Android APK directly to your phone:
[**Download Latest APK**](https://github.com/Ghost4786/OS-CLONED-CALCULATOR/releases/latest/download/app-release.apk) (Or view all [Releases](https://github.com/Ghost4786/OS-CLONED-CALCULATOR/releases/latest))

## Features

*   **Pixel-Perfect iOS Design**: Features the iconic "Oval Zero", perfect circular buttons, deep obsidian black background, and Apple's exact color hex codes.
*   **Fully Responsive**: Utilizes dynamic CSS Grid and Flexbox to ensure the calculator never scrolls and fits perfectly on any screen size, from small phones to tablets.
*   **Scientific Functions**: Includes an expandable "ADVANCED" panel with trigonometry (`sin`, `cos`, `tan`), logarithms (`log`, `ln`), roots (`√`), powers (`xʸ`), factorials (`n!`), and constants (`π`, `e`).
*   **Mobile App Ready**: Pre-configured with **Capacitor** to instantly compile into a native Android APK or iOS App.
*   **PWA Ready**: Includes a Web App Manifest and Service Worker for offline support and "Add to Home Screen" functionality.
*   **Lightning Fast**: Built on **Vite** with Vanilla JavaScript (No heavy frameworks like React or Angular).

## Tech Stack
*   **HTML5 / CSS3** (Vanilla, CSS Grid, Flexbox)
*   **JavaScript** (ES6+)
*   **Vite** (Build Tool & Dev Server)
*   **Capacitor** (Native App Wrapper)

## Building for Android (APK)

This project is pre-configured to be built into a native Android app.

1. **Build the Web Assets**
   ```bash
   npm run build
   ```

2. **Sync with Capacitor**
   ```bash
   npx cap sync
   ```

3. **Open in Android Studio**
   ```bash
   npx cap open android
   ```
   *From Android Studio, you can generate a signed APK or App Bundle to upload to the Google Play Store or Amazon Appstore.*

## Customization

All styling is managed centrally via CSS variables in `src/style.css`.
To change the app's theme, simply edit the variables at the top of the file:
```css
:root {
  --bg-color: #000000;
  --btn-operator: #FF9F0A; /* Change the orange buttons here */
  ...
}
```

## Support the Project

This project is 100% Open Source under the MIT License. If you found this template helpful for learning how to use Vite + Capacitor, or if it saved you time on a freelance project, please consider supporting the developer!

* [Buy me a Coffee](https://www.buymeacoffee.com/) (You can put your link here later!)

---
*If you have any issues, please refer to the Capacitor documentation for mobile build troubleshooting.*
