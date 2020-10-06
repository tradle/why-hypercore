const test = require('tape')
const Corestore = require('corestore')
const MountableHypertrie = require('mountable-hypertrie')
const ram = require('random-access-memory')
const async = require('async')
const { promisifyAndExec, runAll } = require('../utils')

test('mount hypertries - same corestore', async t => {
  const store = new Corestore(ram)
  await store.ready()
  const [ trie1, trie2, trie3 ] = await create(3, store)
  try {
    let results = await runAll([
      cb => trie1.ready(cb),
      cb => trie2.ready(cb),
      cb => trie3.ready(cb),
      cb => trie3.put('/c', 'hello', cb),
      cb => trie3.put('/d', 'world', cb),
      cb => trie2.mount('/b', trie3.key, cb),
      cb => trie1.mount('/a', trie2.key, cb),
    ])
    let a = await promisifyAndExec(trie1, 'get', '/a/b/c')
    let b = await promisifyAndExec(trie1, 'get', '/a/b/d')
    t.same(a.value, Buffer.from('hello'))
    t.same(b.value, Buffer.from('world'))
    t.end()
  } catch (errors) {
    t.fail('Error: ', errors)
  }
})

function create(count, store) {
  let tries = []
  for (let i=0; i<count; i++) {
    let feed = store.get()
    tries.push(new MountableHypertrie(store, null, { feed }))
  }
  return tries
}
