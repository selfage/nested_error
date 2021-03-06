# @selfage/nested_error

## Install

`npm install @selfage/nested_error`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides a simple implementation to take an error as the cause and output nested stacks with "Caused by: ".

## Constructor

Supply an existing error as the cause like the following.

```TypeScript
import { StdError } from '@selfage/nested_error';

throw new StdError('more context', new Error('Failure'));
```

It will output the following, omitting some details.

```
StdError: more context
    at Object.<anonymous> (.../nested_error/temp.js:4:7)
    ...
Caused by: Error: Failure
    at Object.<anonymous> (.../nested_error/temp.js:4:47)
    ...
```

And of course, it's optional to supply an existing error.

## Any cause

When catching an error, it's often of `any` type, which can be passed to `StdError` without type assertion/casting, i.e., when `stack` property is not available, it calls `toString()` to generate the output.

```TypeScript
import { StdError } from '@selfage/nested_error';

try {
  throw 'Failed!';
} catch (e) {
  throw new StdError('some issue', e);
}
```

It will output the following, omitting details.

```
StdError: some issue
    at Object.<anonymous> (.../nested_error/temp.js:8:11)
    ...
Caused by: Failed!
```

## Subclass

To define subclasses, you should extend `NestedError` instead.

```TypeScript
import { NestedError } from '@selfage/nested_error';

class CustomError extends NestedError {
  public constructor(message?: string, cause?: any) {
    super('CustomError', message, cause);
  }
}

throw new CustomError('more context', new Error('Failure'));
```

```
CustomError: more context
    at Object.<anonymous> (.../nested_error/temp.js:9:7)
    ...
Caused by: Error: Failure
    at Object.<anonymous> (.../nested_error/temp.js:9:39)
    ...
```

Note that you need to pass the class name to `super()` because of minification.

## Minification

`StdError` is the simplest subclass of `NestedError`. All subclasses of `NestedError` require their names to be explicitly passed into `super()`, such that even if class names are minified/mangled, stacks still show the right error names.

## Caveats

With ES6, we can simply extend native `Error` class, without the need to fix issues such as [broken prototype chain](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work).

```TypeScript
new StdError('failure') instanceof Error; // true
```

However, it could bring compatibility issue to old browsers.

## Stack trace from TypeScript source file

If you are developing in TypeScript, printing stack trace from TypeScript source file is often desired. One option is to install `source-map-support`.

```TypeScript
import { StdError } from '@selfage/nested_error';
import 'source-map-support/register';

throw new StdError('more context', new Error('Failure'));
```

It will output the following, omitting details.

```
StdError: more context
    at Object.<anonymous> (.../nested_error/temp.ts:4:7)
    ...
Caused by: Error: Failure
    at Object.<anonymous> (.../nested_error/temp.ts:4:39)
    ...
```
