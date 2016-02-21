System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "typescript",
  typescriptOptions: {
    "target": "es5",
    "module": "system",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "ts"
        }
      }
    }
  },

  map: {
    "socket.io-client": "github:socketio/socket.io-client@1.4.5",
    "three": "github:mrdoob/three.js@master",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "ts": "github:frankwallis/plugin-typescript@2.6.0",
    "typescript": "npm:typescript@1.7.5",
    "github:frankwallis/plugin-typescript@2.6.0": {
      "typescript": "npm:typescript@1.7.5"
    }
  }
});
