const log = console.log
const main = () => {
  const number = '1234567890abcdef'
  const random = (end = 10, start = 0) => {
    const f = Math.random() * (end - start + 1)
    const n = Math.floor(f + start)
    return n
  }
  const n = number.length
  let s = ''
  for (let i = 0; i < 40; i++) {
    const index = random(n - 1)
    log(index)
    s += number[index]
  }
  s = '0x' + s
  return s
}
let i = 0
let a = []
while (i < 20) {
  a.push(main())
  i++
}
log(a)