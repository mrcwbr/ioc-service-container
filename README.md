# ioc-service-container

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mrcwbr_ioc-service-container&metric=code_smells)](https://sonarcloud.io/dashboard?id=mrcwbr_ioc-service-container)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=mrcwbr_ioc-service-container&metric=bugs)](https://sonarcloud.io/dashboard?id=mrcwbr_ioc-service-container)

This is a lightweight library for a service container written in TypeScript.

## Get started

Install the dependency with `npm install ioc-service-container
`

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
