# Ember Blueprints

Ember blueprints is a command line script for creating [ember.js](http://emberjs.com/) projects with [yaml](http://yaml.org/) blueprints. It uses [ember-cli](http://www.ember-cli.com/) command line interface to create a project, models, controllers etc.. . This means that[ember-cli](http://www.ember-cli.com/) needs to be installed on your system.

### Install
```
npm install -g ember-blueprints
```

### Example
```
ember-blueprints -i project.yaml
```

### Usage

```
ember-blueprints [options]
```

### Options

### -i, --input project.yaml (required)

Input file. It needs to be yaml file with specific content.

### Yaml file example

```yaml
config:
    name: "project-name"
tools:
    - ember-cli-sass
    - ember-cli-compass-compiler
app:
    acceptanceTests:
        - sampleAcceptanceTest
    addapters:
        - application
    adaptersTests:
        - sampleAdapterTest
    addonImports:
        - sampleAddonImport
    components:
        - sampleComponent
    componentAddons:
        - sampleComponentAddon
    componentTests:
        - sampleComponentTest
    controllerTests:
        - sampleControllerTest
    helpers:
        - sampleHelper
    helperAddons:
        - sampleHelperAddon
    helperTests:
        - sampleHelperTest
    models:
        - sampleModel
    routes:
        - sampleRouter
    controllers:
        - sampleController
    templates:
        - application
        - sampleTemplate
    views:
        - sampleView
```
