# ioc-service-container

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mrcwbr_ioc-service-container&metric=code_smells)](https://sonarcloud.io/dashboard?id=mrcwbr_ioc-service-container)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=mrcwbr_ioc-service-container&metric=bugs)](https://sonarcloud.io/dashboard?id=mrcwbr_ioc-service-container)

This is a lightweight library for a service container written in TypeScript.

## Get started

Install the dependency with `npm install ioc-service-container
`

## Usage

First set up an Enum for preventing typos or redefinition of service ids:

```typescript
export enum ServiceId {
  TestApi = 'TestApi',
  TestService = 'TestService',
  FooApi = 'FooApi',
}
```

According to this you have to pass a factory of your required services to the ioc container. So at the initial script of
your application you call a function named e.g. `setupServiced`:

```typescript
function setupServiced() {
  ServiceContainer.set(ServiceId.TestApi, () => new CustomTestApi());
  ServiceContainer.set(ServiceId.FooApi, () => new CustomFooApi());
  ServiceContainer.set(ServiceId.TestService, () => new CustomTestService());
}
```

Now you have two options to inject the requested service. The first one is without the usage of TypeScript annotations.
This can be used anywhere in your code:

```typescript
import { ServiceId } from './ServiceId';
import { ServiceContainer } from 'ioc-service-container';

const testService = ServiceContainer.get<TestService>(ServiceId.TestApi);
const testApi = ServiceContainer.get<TestService>(ServiceId.TestService);
```

The second option is to use the `@inject` decorator inside a class:

```typescript
export class CustomTestService implements TestService {
  @inject
  private readonly testApi!: TestApi; // Important is the naming of the property, its mapped to the sericeId

  @injectViaId(ServiceId.FooApi)
  private readonly nameThisHowYouWant!: FooApi // If you don't want to name your property like the service id, use this decorator
}
```

Your can see a demo in the `./example` folder. To run this type in `npm run example`.

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

## Goal

The goal of DI is to encapsulate the dependencies of a class. The CustomService should work without knowing which api it
is using. Following structure should be created:

```
+----------+    +-------------------+
|          |    |                   |
| Consumer +--->+ interface Service |
|          |    |                   |
+----------+    +---------+---------+
                          ^
                          |
                          |
                +---------+-----------+     +----------------+
                |                     |     |                |
                | class CustomService +---->+  interface Api |
                | implements Service  |     |                |
                |                     |     +--------+-------+
                +---------------------+              ^
                                                     |
                                                     |
                                            +--------+--------+
                                            |                 |
                                            | class CustomApi |
                                            | implements Api  |
                                            |                 |
                                            +-----------------+

```

(Btw [asciiflow.com](http://asciiflow.com/) is a great tool for creating small charts for e.g. Readme.md)
