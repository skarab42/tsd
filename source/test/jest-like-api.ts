import tsd from '..';
import test from 'ava';
import path from 'path';
import {verify} from './fixtures/utils';

test('jest like API parser error', async t => {
	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/parser-error')});

	verify(t, diagnostics, [
		[4, 0, 'error', 'Missing right side method, expected something like `assertType(\'hello\').assignableTo<string>()`.'],
		[5, 0, 'error', 'Missing right side method, expected something like `assertType(\'hello\').not.assignableTo<string>()`.'],
		[8, 0, 'error', 'Missing right side method, expected something like `assertType(\'hello\').assignableTo<string>()`.'],
		[10, 0, 'error', 'Missing right side method, expected something like `assertType(\'hello\').assignableTo<string>()`.'],
		[13, 0, 'error', 'A generic type or an argument value is required.'],
		[14, 0, 'error', 'A generic type or an argument value is required.'],
		[19, 11, 'error', 'Do not provide a generic type and an argument value at the same time.'],
		[20, 33, 'error', 'Do not provide a generic type and an argument value at the same time.'],
		[15, 0, 'error', 'A generic type or an argument value is required.'],
		[16, 0, 'error', 'A generic type or an argument value is required.'],
		[21, 11, 'error', 'Do not provide a generic type and an argument value at the same time.'],
		[22, 37, 'error', 'Do not provide a generic type and an argument value at the same time.'],
	]);
});

test('identical-to', async t => {
	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/identical-to')});

	verify(t, diagnostics, [
		[13, 0, 'error', 'Expected type `string` is not identical to type `number`.'],
		[14, 0, 'error', 'Expected type `number` is not identical to type `string`.'],
		[15, 0, 'error', 'Expected type `string` is not identical to type `number`.'],
		[16, 0, 'error', 'Expected type `string` is not identical to type `number`.'],
		[19, 0, 'error', 'Expected type `"foo"` is not identical to type `string`.'],
		[20, 0, 'error', 'Expected type `"foo"` is not identical to type `string`.'],
		[21, 0, 'error', 'Expected type `"foo"` is not identical to type `string`.'],
		[22, 0, 'error', 'Expected type `"foo"` is not identical to type `string`.'],
		[32, 0, 'error', 'Expected type `string` is not identical to type `"foo"`.'],
		[33, 0, 'error', 'Expected type `"foo"` is not identical to type `string`.'],
	]);
});

test('not-identical-to', async t => {
	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/not-identical-to')});

	verify(t, diagnostics, [
		[13, 0, 'error', 'Expected type `string` is identical to type `string`.'],
		[14, 0, 'error', 'Expected type `string` is identical to type `string`.'],
		[15, 0, 'error', 'Expected type `string` is identical to type `string`.'],
		[16, 0, 'error', 'Expected type `string` is identical to type `string`.'],
		[32, 0, 'error', 'Expected type `"foo"` is identical to type `"foo"`.'],
		[33, 0, 'error', 'Expected type `"foo"` is identical to type `"foo"`.'],
	]);
});

test('assignable-to', async t => {
	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/assignable-to')});

	verify(t, diagnostics, [
		[13, 0, 'error', 'Expected type `string` is not assignable to type `number`.'],
		[14, 0, 'error', 'Expected type `number` is not assignable to type `string`.'],
		[15, 0, 'error', 'Expected type `string` is not assignable to type `number`.'],
		[16, 0, 'error', 'Expected type `string` is not assignable to type `number`.'],
		[25, 0, 'error', 'Expected type `string` is not assignable to type `"foo"`.'],
		[26, 0, 'error', 'Expected type `string` is not assignable to type `"foo"`.'],
		[27, 0, 'error', 'Expected type `string` is not assignable to type `"foo"`.'],
		[28, 0, 'error', 'Expected type `string` is not assignable to type `"foo"`.'],
		[38, 0, 'error', 'Expected type `string` is not assignable to type `"foo"`.'],
		[39, 0, 'error', 'Expected type `"foo"` is not assignable to type `number`.'],
	]);
});

test('not-assignable-to', async t => {
	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/not-assignable-to')});

	verify(t, diagnostics, [
		[13, 0, 'error', 'Expected type `string` is assignable to type `string`.'],
		[14, 0, 'error', 'Expected type `string` is assignable to type `string`.'],
		[15, 0, 'error', 'Expected type `string` is assignable to type `string`.'],
		[16, 0, 'error', 'Expected type `string` is assignable to type `string`.'],
		[25, 0, 'error', 'Expected type `"foo"` is assignable to type `string`.'],
		[26, 0, 'error', 'Expected type `"foo"` is assignable to type `string`.'],
		[27, 0, 'error', 'Expected type `"foo"` is assignable to type `string`.'],
		[28, 0, 'error', 'Expected type `"foo"` is assignable to type `string`.'],
		[38, 0, 'error', 'Expected type `"foo"` is assignable to type `"foo"`.'],
		[39, 0, 'error', 'Expected type `"foo"` is assignable to type `"foo"`.'],
	]);
});

// // Debug
// test('debug', async () => {
// 	const diagnostics = await tsd({cwd: path.join(__dirname, 'fixtures/jest-like-api/identicality')});
// 	console.log(diagnostics);
// });
