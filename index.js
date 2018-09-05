#!/usr/bin/env node

const asciichart = require ('asciichart');
const math = require('mathjs');
const parser = math.parser();
const decodeExpr = expr => {
  parser.eval(`f(x) = ${expr}`);
  return parser.get('f');
};

const {
  argv : [ ,, input = "x", _from = 0, _to = 10 ],
  stdout : { columns, rows }
} = process;
const [ from, to ] = [ _from, _to ].map(x => parseInt(x));
const func = decodeExpr(input);
const rangeSize = to - from;
const width = columns - 13;
const height = rows / 1.618;
const step = Math.abs(rangeSize / width);
console.log({ from, to, step });

console.log(asciichart.plot(
  Array(width).fill().map((_, i) => func(from + i * step)),
  { height }
));
