<h1><img src="img/256x256.png" alt="drawing" width="64"/> Multidice</h1>

**Play 7th Sea RPG with your friends remotely with Multidice**

#### **To use this software, you will need "Mutltidice-Server" on a server reachable from the web**

## Overview

![](screenshots/launch.png) ![](screenshots/dice.png) ![](screenshots/characterSheet.png) ![](screenshots/notes.png)

## Features

### Dice rolling

Multidice allows to roll dice by choosing the number of dices and the number of their faces.
The rolls can be public to all the players of the server, private or shared only with the GM.

A history of the last 6 rolls is displayed on the screen.

### Character sheet managing

With Multidice, you can fill in, access and modify your character sheet. You can also see the character sheet from the other connecter players in a read-only mode. 

### Notes

Notes are also available with Multidice. That way you can enter all the useful information given by the GM

### Game master (GM)

At the current stage of development of Multidice, a player entering the server with the name "MJ" (GM in french) is considered to be the game master.

## Build

You will need [Electron Builder](https://www.electron.build/) to build Multidice.

To install it, run the following from the root folder :

```
yarn add electron-builder --dev
```

### Windows

```
yarn build -w
```

or

```
yarn build:win
```

### Linux

By default the "package.json" configuration for linux build a .pacman file and a .AppImage file.
It is up to you to add another type of Linux package.

```
yarn build -l
```

or

```
yarn build:linux
```

## License

[MIT](LICENSE.md)
