Function.prototype.myCall = function (context, ...args) {
  // 1. 如果未传入context（或传入null/undefined），默认绑定到全局对象（浏览器中是window）
  context = context || window

  // 2. 将当前函数（this）作为context的一个临时方法
  const fnKey = Symbol('fnKey') // 使用Symbol避免属性名冲突
  context[fnKey] = this // this指向调用myCall的函数

  // 3. 执行函数，并传入参数
  const result = context[fnKey](...args)

  // 4. 删除临时方法，避免污染context
  delete context[fnKey]

  // 5. 返回结果
  return result
}

// 测试用例
function greet(name) {
  console.log(`Hello, ${name}! I'm ${this.title}`)
}

const obj = { title: 'Kathy' }
greet.myCall(obj, 'Alice') // 输出: Hello, Alice! I'm Captain
