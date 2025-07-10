Function.prototype.myBind = function (context, ...bindArgs) {
  const originalFunc = this // 保存原函数

  // 返回一个新函数，闭包保留context和bindArgs
  return function (...callArgs) {
    // 合并绑定时的参数和调用时的参数
    const allArgs = bindArgs.concat(callArgs)

    // 判断是否通过new调用（如果是new，忽略绑定的this）
    if (new.target) {
      return new originalFunc(...allArgs)
    } else {
      return originalFunc.myCall(context, ...allArgs)
    }
  }
}

// 测试用例
function logInfo(age, hobby) {
  console.log(`${this.name}, ${age}, loves ${hobby}`)
}

const obj = { name: 'Bob' }
const boundFunc = logInfo.myBind(obj, 25)
boundFunc('coding') // 输出: Bob, 25, loves coding
