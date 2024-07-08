import { PassThrough } from 'node:stream';

import { expect, test } from 'vitest';

import { Icons, Output } from './Output';

type ParseStreamArgs = PassThrough;

const mockStream = new PassThrough();
const parseStream = (stream: ParseStreamArgs) =>
  Buffer.from(stream.read()).toString('utf-8');

test('real life use case #1', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.log('Check out our new stuff:');

  output.table([
    {
      Name: 'test',
      Value: 'value',
    },
    {
      Name: 'another column',
      Value: 'second value',
    },
  ]);

  output.log('Thanks for your attention');
  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "> Check out our new stuff:

    Name            Value       
    ----------------------------
    test            value       
    another column  second value

    > Thanks for your attention
    "
  `);
});

test('print without prefix', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.print('This is my test without prefix');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(
    '"This is my test without prefix"',
  );
});

test('print with prefix', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.print('This is my test with prefix', {
    prefix: { message: 'YOLO', color: 'red' },
  });

  expect(parseStream(mockStream)).toMatchInlineSnapshot(
    '"YOLO This is my test with prefix"',
  );
});

test('print 1 new line between logs', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.log('This is my test message #1');
  output.printNewLine();
  output.log('This is my test message #2');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "> This is my test message #1

    > This is my test message #2
    "
  `);
});

test('print 2 lines between logs', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.log('This is my test message #1');
  output.printNewLine(2);
  output.log('This is my test message #2');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "> This is my test message #1


    > This is my test message #2
    "
  `);
});

test('log', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.log('This is my test message');
  output.log('This is my test message #2');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "> This is my test message
    > This is my test message #2
    "
  `);
});

test('warn', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.warn('This is my warn message');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "${Icons.Warning} Warning! This is my warn message
    "
  `);
});

test('error', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.error('This is my error message');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
   "${Icons.Cross} Error: This is my error message
   "
  `);
});

test('ready', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.ready('This is my ready message');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "${Icons.ChequeredFlag} Ready! This is my ready message
    "
  `);
});

test('success', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.success('This is my success message');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "${Icons.Checkmark} Success! This is my success message
    "
  `);
});

test('link', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.link('https://example.com');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "${Icons.Chain} https://example.com
    "
  `);
});

// TODO: Why would an output `link` be used for quotes? Is there such case?
// investigate such use-cases and refactor, should not use `link`
test('quoted in log', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.link(`Example of ${output.quoted('content')}`);

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "${Icons.Chain} Example of "content"
    "
  `);
});

test('simple table', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.table([
    {
      Name: 'test',
      Value: 'value',
    },
    {
      Name: 'another column',
      Value: 'second value',
    },
  ]);

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "
    Name            Value       
    ----------------------------
    test            value       
    another column  second value

    "
  `);
});

test('debug', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.debug('Test of debug message');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "Debug: Test of debug message
    "
  `);
});

test('spinner start', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.spinner('Example spinner');

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "Debug: Spinner invoked (Example spinner) with a 300ms delay
    "
  `);
});

test('spinner stop', () => {
  const output = new Output({ stream: mockStream, debug: true });

  output.spinner('Example spinner');
  output.stopSpinner();

  expect(parseStream(mockStream)).toMatchInlineSnapshot(`
    "Debug: Spinner invoked (Example spinner) with a 300ms delay
    "
  `);
});
