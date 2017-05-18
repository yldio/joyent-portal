const { default: jsonAST, loc } = require('../src/index');
const test = require('ava');

test('should accurately add locations', t => {
  const ast = jsonAST(`{
    "obj": {
      "arr": [{
        "nums": [1, 2, 3],
        "strs1": ["1", "2", "3"],
        "strs: ["1", "2", "3"]
      }],
      "str": "1",
      "num": 1
    }
  }`);

  t.deepEqual(Object.keys(ast), ['obj']);
  t.deepEqual(ast[loc].start.line, 1);
  t.deepEqual(ast[loc].end.line, 11);

  t.deepEqual(Object.keys(ast.obj), ['arr', 'str', 'num']);
  t.deepEqual(ast.obj[loc].start.line, 2);
  t.deepEqual(ast.obj[loc].end.line, 10);

  t.deepEqual(ast.obj.str[loc].start.line, 8);
  t.deepEqual(ast.obj.str[loc].end.line, 8);
  t.deepEqual(ast.obj.num[loc].start.line, 9);
  t.deepEqual(ast.obj.num[loc].end.line, 9);
  t.deepEqual(ast.obj.arr[0][loc].start.line, 3);
  t.deepEqual(ast.obj.arr[0][loc].end.line, 7);

  t.deepEqual(Object.keys(ast.obj.arr[0]), ['nums', 'strs1']);
  t.deepEqual(ast.obj.arr[0].nums[loc].start.line, 4);
  t.deepEqual(ast.obj.arr[0].nums[loc].end.line, 4);
  t.deepEqual(ast.obj.arr[0].strs1[loc].start.line, 5);
  t.deepEqual(ast.obj.arr[0].strs1[loc].end.line, 5);
});
