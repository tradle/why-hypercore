const hypercore = require('hypercore')
const hyperdrive = require('hyperdrive')
const Corestore = require('corestore')
const { promisify } = require('util')
const ram = require('random-access-memory')

const utils = {
  loudAsync(asyncFn) {
    return async (...args) => {
      try {
        return await asyncFn(...args)
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err)
        throw err
      }
    }
  },
  async create(count) {
    if (!count)
      count = 1
    let feeds = []
    for (let i=0; i<count; i++) {
      const feed = hypercore(ram, { keyEncoding: 'utf-8', valueEncoding: 'utf-8' })
      await utils.promisifyAndExec(feed, 'ready')
      feeds.push(feed)
    }
    return feeds
  },
  async promisifyAndExec(module, method, params) {
    if (params)
      return await(promisify(module[method].bind(module)))(params)
    else
      return await(promisify(module[method].bind(module)))()
  },
  async createHyperdrives({ namespace, sameNamespace, count }) {
    let ret = []
    if (!count)
      count = 1
    if (!namespace)
      namespace = 'example'
    let drivePromises = []
    let storePromises = []
    for (let i=0; i<count; i++) {
      let store = new Corestore('./example' + i, {sparse: true})
      debugger
      await store.ready()
      // ret.push(store)
      let driveNamespace = sameNamespace && namespace || namespace + i
      let drive = hyperdrive(store, {persist: false, namespace: driveNamespace})
      await utils.promisifyAndExec(drive, 'ready')
      ret.push(drive)
    }
    return ret
  },
  runAll (ops) {
    return new Promise((resolve, reject) => {
      runNext(ops.shift())
      function runNext (op) {
        op(err => {
          if (err) return reject(err)
          const next = ops.shift()
          if (!next) return resolve()
          return runNext(next)
        })
      }
    })
  }
}
module.exports = utils