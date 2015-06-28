# Ember Blueprints

Ember blueprints is a command line script for creating [ember.js](http://emberjs.com/) projects with [yaml](http://yaml.org/) blueprints. It uses [ember-cli](http://www.ember-cli.com/) command line interface to create a project, models, controllers etc.. . This means that [ember-cli](http://www.ember-cli.com/) needs to be installed on your system.

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
    name: "ember-blueprints-demo-app"
tools:
    - ember-cli-coffeescript
    - ember-cli-stylus
    - ember-cli-emblem-hbs-printer
app:
    acceptanceTests:
        - sampleAcceptanceTest
    addapters:
        - application
    adaptersTests:
        - sampleAdapterTest
    components:
        -   name: sample-Component
            options:
                - --pod
    componentTests:
        - additionalSampleComponentTest
    controllerTests:
        - additionalSampleControllerTest
    helpers:
        - sampleHelper
    helperTests:
        - additionalSampleHelperTest
    models:
        -   name: sampleModel
            options:
            - --pod
        - secondSampleModel
        - thirdSampleModel
        - fifthSampleModel
        - sixthSampleModel
        - seventhSampleModel
        - eigthSampleModel
    routes:
        - sampleRouter
    controllers:
        - samleController
    templates:
        - sampleTemplate
        - sampleNextTemplate
    views:
        - sampleView
        - anotherSampleView


```
