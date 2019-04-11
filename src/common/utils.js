// 根据数组索引，移动数组元素，并返回新的数组
export const moveArray = (array, index, type) => {
  // 参数为空
  if (!array) {
    return array
  }
  // 非数组
  if (!Array.isArray(array)) {
    return array
  }
  // type 参数不合法
  if (type !== 'up' && type !== 'down') {
    return array
  }
  // 数组元素小于 1 个
  if (array.length <= 1) {
    return array
  }
  // 向更高索引移动
  if (type === 'down' && index < array.length - 1) {
    array.splice(index, 2, array[index + 1], array[index])
    return array
  }
  // 向更低索引移动
  if (type === 'up' && index > 0) {
    array.splice(index - 1, 2, array[index], array[index - 1])
    return array
  }
}
// 数组求和
export const sumArray = array => {
  if (!array) {
    return 0
  }
  if (array.length === 0) {
    return 0
  }
  return array.reduce((prev, cur) => {
    return prev + cur
  })
}
