- Installer android studio
- Ajouter dans le .bashrc:

`export ANDROID_HOME=$HOME/Android/Sdkexport PATH=$PATH:$ANDROID_HOME/emulatorexport PATH=$PATH:$ANDROID_HOME/toolsexport PATH=$PATH:$ANDROID_HOME/tools/binexport PATH=$PATH:$ANDROID_HOME/platform-tools`

- Aller dans le AVD manager pour créer un nouveau téléphone à emuler:

`https://developer.android.com/studio/run/managing-avds#createavd`

- Installer les dépendances:

`cd android; npm install; cd ..`

- A faire à chaque fois pour tester:
    - Aller dans le dossier android situé dans le dossier root
    pour démarrer le serveur react-native:

    `npx react-native start`

    - Ouvrer un autre terminal et toujours dans le dossier android lancer l'emulateur:

    `npx react-native run-android`
