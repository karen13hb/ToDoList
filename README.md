# ToDoList Hybrid App

A cross-platform To-Do List application built with [Ionic](https://ionicframework.com/) + Angular + Cordova.  
Manage your tasks with categories, toggle them complete, and flip on/off an experimental feature via Firebase Remote Config.

---

## 📋 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack & Resources](#tech-stack--resources)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Firebase & Remote Config Setup](#firebase--remote-config-setup)
- [Development Workflow](#development-workflow)
- [Building & Running](#building--running)
  - [Android](#android)
  - [iOS](#ios)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)
- [License](#license)

---

## Description

This Ionic/Cordova hybrid app lets users:

- Create, edit, complete, and delete tasks
- Organize tasks into color-coded categories
- Filter tasks by category
- Toggle an “experimental” feature flag at runtime (via Firebase Remote Config)
- Persist data locally (Ionic Storage / LocalForage)

Delivered as Android APK and iOS IPA, ready for emulators and real devices.

---

## Features

- **Task CRUD**: add, toggle complete, edit, remove  
- **Categories**: assign each task a colored category  
- **Filtering**: view all or only one category’s tasks  
- **Remote Config**: flip a feature on/off without redeploy  
- **Offline storage**: tasks and categories persisted locally  
- **Fluid UI**: Ionic animations, responsive on phones/tablets  

---

## Tech Stack & Resources

- **Framework**: Ionic 6 + Angular  
- **Native bridge**: Cordova  
- **Storage**: Ionic Storage + LocalForage  
- **Firebase**: Remote Config (feature flag)  
- **Animations**: Angular Animations (stagger, fade-in)  
- **Icons & UI**: Ionicons, Ion-components  
- **Version control**: Git (public repo)

Assets live in `src/assets/` and custom SCSS in each component’s folder.

---

## Prerequisites

- Node.js ≥ 16 & npm  
- Ionic CLI (`npm install -g @ionic/cli`)  
- Cordova (`npm install -g cordova`)  
- **Android**: Android Studio + SDK (set `ANDROID_SDK_ROOT`)  
- **iOS** (macOS only): Xcode ≥ 14  
- Git client  

---

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/ToDoList.git
   cd ToDoList
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Add platforms**  
   ```bash
   ionic cordova platform add android
   ionic cordova platform add ios
   ```

---

## Firebase & Remote Config Setup

1. Create a Firebase project in the [Firebase Console].  
2. Under **Remote Config**, add parameter:  
   - **Key**: `feature_flag`  
   - **Default**: `false`  
3. Publish the template.  
4. In `src/environments/environment.ts`, add your Firebase config block:
   ```ts
   export const environment = {
     production: false,
     firebase: {
       apiKey: "…",
       authDomain: "…",
       projectId: "…",
       // …
     }
   };
   ```
5. The app reads `feature_flag` on startup and whenever you open the **Flags** screen. Toggle it in the console to show/hide experimental UI.

---

## Development Workflow

- **Web preview**  
  ```bash
  ionic serve
  ```
- **Android live-reload**  
  ```bash
  ionic cordova run android --livereload --external
  ```
- **iOS live-reload** (macOS)  
  ```bash
  ionic cordova run ios --livereload --external
  ```
- **Inspect WebView**: in Chrome go to `chrome://inspect`.

---

## Building & Running

### Android

1. **Build release APK**  
   ```bash
   ionic cordova build android --release
   ```
   → `platforms/android/app/build/outputs/apk/release/app-release.apk`  
2. **Install on emulator**  
   ```bash
   ionic cordova emulate android --no-native-run
   ```
3. **Install on device**  
   ```bash
   ionic cordova run android --device
   ```

### iOS

> Requires macOS & Xcode

1. **Build release IPA**  
   ```bash
   ionic cordova build ios --release
   ```
2. **Open in Xcode**  
   ```bash
   open platforms/ios/YourApp.xcworkspace
   ```
   → Product → Archive → Export IPA/TestFlight  
3. **Emulate**  
   ```bash
   ionic cordova emulate ios --no-native-run
   ```

---

## Project Structure

```
src/
├── app/
│   ├── tabs/               # TabsPage + FAB menu
│   ├── tasks/              # TasksPage + TaskItem + TaskForm
│   ├── categories/         # CategoriesComponent + CategoryEdit
│   ├── feature-flag/       # Flags page + FeatureToggle
│   └── core/               # Models, services, storage, remote-config
├── assets/                 # Icons, images
├── environments/           # Firebase config
└── theme/                  # Global SCSS variables
```

---

## Performance Optimizations

- **Lazy loading** modules via Angular router  
- **OnPush** change detection in leaf components  
- **Staggered animations** for list rendering  
- **Ionic Storage** backed by IndexedDB/SQLite for fast local reads  
- **Remote Config** interval set to `0ms` in development for instant fetch  

---

[Firebase Console]: https://console.firebase.google.com/  
[MIT License]: https://opensource.org/licenses/MIT  
