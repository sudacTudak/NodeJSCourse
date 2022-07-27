function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  return factorial(n - 1) * n;
}

function compute(array) {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map(item => factorial(item));
}

module.exports = {
  factorial,
  compute
}
