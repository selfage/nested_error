# @selfage/nested_error

## Install

`npm install @selfage/nested_error`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides a simple implementation to take an error as the cause and output nested stacks with "Caused by: ".

With ES6, we simply extend native `Error` class, without fixing issues such as [broken prototype chain](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work), and thus could bring compatibility issue to browsers. Use if you don't care.

Also note that we have overridden `stack` property in constructor. Later modification of `name` property doesn't affect `stack`.

## Nested error

Supply an existing error as the cause like the following.

```TypeScript
import { NestedError } from '@selfage/nested_error';

throw new NestedError('more context', new Error('Failure'));
```

It will output the following, omitting some details.

```
NestedError: more context
    at Object.<anonymous> (.../nested_error/temp.js:4:7)
    ...
Caused by: Error: Failure
    at Object.<anonymous> (.../nested_error/temp.js:4:47)
    ...
```

## Standalone error

You can also create `NestedError` without a cause.

```TypeScript
import { NestedError } from '@selfage/nested_error';

throw new NestedError('some issue');
```

## Any cause

When catching an error, it's often of `any` type, which can be passed to `NestedError` without type assertion/casting, i.e., when `stack` property is not available, it calls `toString()` to generate the output.

```TypeScript
import { NestedError } from '@selfage/nested_error';

try {
  throw 'Failed!';
} catch (e) {
  throw new NestedError('some issue', e);
}
```

It will output the following, omitting details.

```
NestedError: some issue
    at Object.<anonymous> (.../nested_error/temp.js:8:11)
    ...
Caused by: Failed!
```

## Subclass

```TypeScript
import { NestedError } from '@selfage/nested_error';

class CustomError extends NestedError {
  public constructor(message?: string, cause?: any) {
    super(message, cause);
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

## Known limitations

Class name might be mangled by minification. There is no easy fix unless you exclude them from being mangled. Setting `name` property in subclasses doesn't help because the constructor of `NestedError` already finalized `stack` property in case of V8 environment.

## Stack trace from TypeScript source file

If you are developing in TypeScript, printing stack trace from TypeScript source file is often desired. One option is to install `source-map-support`.

```TypeScript
import { NestedError } from '@selfage/nested_error';
import 'source-map-support/register';

throw new NestedError('more context', new Error('Failure'));
```

It will output the following, omitting details.

```
NestedError: more context
    at Object.<anonymous> (.../nested_error/temp.ts:4:7)
    ...
Caused by: Error: Failure
    at Object.<anonymous> (.../nested_error/temp.ts:4:39)
    ...
```