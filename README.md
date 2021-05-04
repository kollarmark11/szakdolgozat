Cross-platform edzői alkalmazásfejlesztés Ionic és Angular keretrendszerekkel című dolgozat programjához szolgáló elindítási útmutató
1. Telepítsük számítógépünkre a Node.js-t, a technológia hivatalos oldaláról. (https://nodejs.org/en/)
 
2. Számítógépünk termináljában telepítsük az Ionic package-et a következő paranccsal: npm install -g @ionic/cli
3. Alkalmazás elindítása:
      3.1. Webes tesztelés: A terminálban be kell lépnünk a kicsomagolt projekt mappába. Itt egy ionic serve parancs után elindul az alkalmazásunk a böngészőben. (https://ionicframework.com/docs/developing/previewing)

      3.2. iOS tesztelés (csak MacOS rendszereken): A terminálban be kell lépnünk a kicsomagolt projekt mappába. Itt egy ionic capacitor run ios parancs után elindul az alkalmazásunk az Xcode-ban (Ezt le kell töltenünk Mac számítógépeken az App Store-ból). Szükség van még egy virtuális eszköz létrehozására az Xcode-on belül, majd ezen kell emulálnunk programunkat. (https://ionicframework.com/docs/developing/ios)
          Vannak bizonyos esetek, amikor valami hiba lép fel és nem tudja az Xcode elindítani a projektet. Ez sajnos a technológia ismert hibája, de szerencsére orvosolható. A gyökérkönyvtár/ios/App mappában egy pod install megjavítja a gondot. Ehhez le kell tölteni a CocoaPods-ot a hivatalos oldaláról. (https://cocoapods.org/)

  
      3.3. Android tesztelés: Le kell töltenünk először is az Android Studio-t a hivatalos oldaláról (https://developer.android.com/studio). A terminálban be kell lépnünk a kicsomagolt projekt mappába. Itt egy ionic capacitor run android parancs után elindul az alkalmazásunk az Android Stuido-ban. Szükség van még egy virtuális eszköz létrehozására az Android Studio-n belül, majd ezen kell emulálnunk programunkat. (https://ionicframework.com/docs/developing/android)
      
      3.4. Ezenkívül nyilvánosan is fent van a program, a következő url-el elérhető és megtekinthető: https://szakdolgozat-72420.web.app/


Kollár Márk – A39QMC
