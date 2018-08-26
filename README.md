# config

```

brew tap caskroom/fonts
brew cask install font-fira-code

code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension DSKWRK.vscode-generate-getter-setter
code --install-extension MariusAlchimavicius.json-to-ts
code --install-extension PeterJausovec.vscode-docker
code --install-extension eg2.tslint
code --install-extension esbenp.prettier-vscode
code --install-extension joelday.docthis
code --install-extension k--kato.intellij-idea-keybindings
code --install-extension mathiasfrohlich.Kotlin
code --install-extension mikey.vscode-fileheader
code --install-extension mohsen1.react-javascript-to-typescript-transform-vscode
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension mtxr.sqltools
code --install-extension redhat.java
code --install-extension richie5um2.vscode-sort-json
code --install-extension robinbentley.sass-indented
code --install-extension shanoor.vscode-nginx
code --install-extension vscjava.vscode-java-debug
code --install-extension vscjava.vscode-java-pack
code --install-extension vscjava.vscode-java-test
code --install-extension vscjava.vscode-maven
code --install-extension vsmobile.vscode-react-native
code --install-extension xabikos.ReactSnippets

yarn add global node-sass

npm install -g ts-node

yarn global add react-devtools

yarn

react-native run-ios


```

# baseApp

*   TypeScript React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

## :arrow_forward: How to Run App

1.  cd to the repo
2.  Run `npm run compile`
3.  Run Build for either OS

*   for iOS
    *   run `react-native run-ios`
*   for Android
    *   Run Genymotion
    *   run `react-native run-android`

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React
Native. You can store API keys and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:

1.  Copy .env.example to .env
2.  Add your config variables
3.  Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4.  Done!
