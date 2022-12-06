# ioc-service-container

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ioc-service-container&metric=alert_status)](https://sonarcloud.io/dashboard?id=ioc-service-container)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ioc-service-container&metric=bugs)](https://sonarcloud.io/dashboard?id=ioc-service-container)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ioc-service-container&metric=code_smells)](https://sonarcloud.io/dashboard?id=ioc-service-container)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ioc-service-container&metric=coverage)](https://sonarcloud.io/dashboard?id=ioc-service-container)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ioc-service-container&metric=security_rating)](https://sonarcloud.io/dashboard?id=ioc-service-container)
![min-size](https://badgen.net/bundlephobia/min/ioc-service-container)
![min-size-g-zip](https://badgen.net/bundlephobia/minzip/ioc-service-container)
![dependency-count](https://badgen.net/bundlephobia/dependency-count/ioc-service-container)
![npm-version](https://badgen.net/npm/v/ioc-service-container)
![ts-types](https://badgen.net/npm/types/ioc-service-container)

<a href="https://www.buymeacoffee.com/Mrcwbr" target="_blank">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
       alt="Buy Me A Coffee"
       style="height: 41px !important;width: 174px !important;box-shadow: 0 3px 2px 0 rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0 3px 2px 0 rgba(190, 190, 190, 0.5) !important;" >
</a>

> This is a lightweight **zero-dependency** library for a service container written in TypeScript.

## Features

* **Fully typed**
* **100% TypeScript written**
* **100% test coverage**
* **0 dependencies**
* **< 2 KB package size**
* **Typescript Decorator support**
* **Simple API**
* **Works beautiful with [jest-mock-extended](https://www.npmjs.com/package/jest-mock-extended)**

## Demo

In this [StackBlitz-Demo](https://stackblitz.com/edit/react-ts-qya4xy?file=App.tsx) you can see a demonstration of
the `ioc-service-container`. In the `App.tsx` you can verify that the `UserService` is fully typed without importing the
class.

![TypeScriptSupport](https://i.ibb.co/stpBrkk/type.jpg)

## Get started

Install the dependency with `npm install ioc-service-container`

## Usage

### 1. Define the Types

If you use the `ioc-service-container` in a TypeScript project, define the types of your services in a `ioc.d.ts` file
otherwise you can skip this step.

```typescript
// Import your services
import { TestApi } from '../your-path/to/TestApi'
import { FooApi } from '../your-path/to/FooApi'
import { TestService } from '../your-path/to/TestService'

// Create the mapping between ServiceId and Service
type IoCTypes = {
  TestApi: TestApi,
  FooApi: FooApi,
  TestService: TestService,
  // ...
};

// Redeclare the scg function to get full Typscript support
declare module 'ioc-service-container' {
  export function scg<T extends keyof IoCTypes, U extends IoCTypes[T]>(id: T): U;
}
```

### 2. Setup your services

According to this you have to pass a factory or a class reference of your required services to the ioc container. So
at the initial script of your application you call a function named e.g. `setupService`:

```typescript
import { ServiceContainer } from 'ioc-service-container';

function setupService() {
  ServiceContainer.set('TestApi', CustomTestApi); // setup by class reference
  ServiceContainer.set('FooApi', () => new CustomFooApi()); // setup by custom factory
  ServiceContainer.set('TestService', TestService, true); // instantieate immediately
}
```

The factory is only instantiated at need. You can pass the `buildInstantly` attribute if the service should be
initialized immediately e.g. for setting up [Sentry](https://sentry.io/welcome/) in a `LoggingService`.

### 3. Inject services

Now you have 2 options to inject the requested service.

#### 3.1 `scg()` Function

The first is the most common one: `const testApi = scg('TestApi);`. (Shortcut for `ServiceContainer.get()`. Because of
the type declaration you have full TypeScript support at this point and no dependency on the file/class `TestApi`. (See
the [Demo](https://stackblitz.com/edit/react-ts-qya4xy?file=App.tsx))

#### 3.2 `@inject` Decorator

> This requires `"experimentalDecorators": true` to be enabled in your `tsconfig.json`
> (See [Typescript Docs](https://www.typescriptlang.org/tsconfig#experimentalDecorators))

```typescript
export class CustomTestService implements TestService {
  @inject
  private readonly customApi!: Api; // Important is the naming of the property, it's mapped to the service id

  @inject('FooApi') // If you don't want to name your property like the service id, pass the id as parameter
  private readonly nameThisHowYouWant!: Api;

  private readonly fooApi = ServiceContainer.get<Api>('FooApi') // Use this syntax if you don't want to use decorators

  private readonly barApi = scg('BarApi') // Shortcut for ServiceContainer.get()
}
 ```

### 4. Other Use-Cases

For Testing or similar use cases you have the option to
use `ServiceContainer.isSet('anId')`, `ServiceContainer.override('anId', () => 123)` or `ServiceContainer.reset()`.

## Background

Structuring your code and avoiding implizit dependencies is two of the most effective ways to avoiding bugs, especially
when code gets extended. To goal of Dependency Injection (DI) is to prevent structures like this:

```javascript
class CustomService {
  constructor() {
    this.api = new CustomApi();
  }
}
```

The `CustomService` has an implizit dependency to the `CustomApi`.

The goal of DI is to encapsulate the dependencies of a class. The CustomService should work without knowing which api it
is using. The following structure should be created.
