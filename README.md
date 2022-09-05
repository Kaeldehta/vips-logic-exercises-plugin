# vips-logic-exercises-plugin

A Studip plugin that adds Vips exercises needed for the Intro to Logic course at university Osnabrück.

## Development

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- [Docker](https://www.docker.com/)

### Setting up the environment

1. Fork/Clone the repository
2. Open the repository folder in VS Code
3. Reopen in Remote Container (this will build the container, and start the development stuff)
4. Open new terminal in VS Code and run npm start to start Webpack Watch
5. Go to localhost:1234/studip
6. Login with credentials: root@studip, testing
7. Go to Migration Page and run missing migrations
8. Go to Plugin Management
9. Install Vips Plugin
10. Go to Register Existing Plugins
11. Register LogicExercises Plugin
12. Have fun

## Install

### Plugin Marketplace

TODO

### Manual

1. Download one of the release archives
2. Go to plugin settings of the Studip server
3. Drag and drop plugin archive
4. Profit
