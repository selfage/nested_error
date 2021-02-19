# @selfage/nested_error

## Install

`npm install @selfage/nested_error`

## Overview

Written in TypeScript and compiled to ES6. Based on the amazing `ts-custom-error` to extend `Error` class, provides a simple implementation to take existing error as cause and output nested stacks with "Caused by: ".

## Usage

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

You can also create `NestedError` without a cause.

```TypeScript
import { NestedError } from '@selfage/nested_error';

throw new NestedError('some issue');
```

When catching an error, it's often of `any` type, which can be passed to `NestedError` without type assertion/casting.

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

## Known limitations

Please refer to `ts-custom-error`'s [Known limitations](https://www.npmjs.com/package/ts-custom-error#known-limitations). Note that we simply extended `CustomError` class and didn't use `customErrorFactory`.

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