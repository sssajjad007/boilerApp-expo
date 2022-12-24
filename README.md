1. create project:
expo init MyApp -t expo-template-bare-minimum
2. add typescript
 1. use this command to create tsconfig.json file in root directory for windows 
      ~ ni tsconfig.json
    use this command to create tsconfig.json file in root directory for unix
      ~ touch tsconfig.json
 2. use this command to change the extension of App.js to App.tsx
      ~ mv App.js App.tsx 
      or
      ~ ren App.js App.tsx     
 3. run this command to install (typescript, @types/react, @types/react-native) packages
      ~ npx expo start  ( tsconfig.json file will be created automatically )   
 4. ~ yarn add -D ts-node typescript
 5. ~ expo install @expo/webpack-config
 6. create webpack.config.ts and metro.config.ts files in root directory and copy the code from this repo
 7. add react-navigation v6 react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-redux mmkv axios hook-form 
 8. create react-native.config.js file in root directory and copy the code from this repo
 9. create assets folder in root directory and add fonts or images
 10. add react-dom and react-native-web packages for web support