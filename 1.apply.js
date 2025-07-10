Function.prototype.myApply = function (context, argsArray) {
  // 1. 处理未传入context或argsArray的情况
  context = context || window
  argsArray = argsArray || []

  // 2. 绑定函数到context
  const fnKey = Symbol('fnKey')
  context[fnKey] = this

  // 3. 执行函数（注意apply接收的是数组参数）
  const result = context[fnKey](...argsArray)

  // 4. 清理临时属性
  delete context[fnKey]

  return result
}

// 测试用例
function sum(a, b) {
  console.log(this.prefix + (a + b))
}

const obj = { prefix: 'Result: ' }
sum.myApply(obj, [3, 5]) // 输出: Result: 8
