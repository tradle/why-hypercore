// Same as in multi-hyperdrive but without using dat-sdk

const test = require('tape')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-storage')
const multiHyperdrive = require('multi-hyperdrive')
const { createHyperdrives } = require('../utils')

test.skip('Read from primary drive', t => {
  const drive = hyperdrive('example')

  const multi = multiHyperdrive(drive)

  drive.writeFile('example.txt', 'Hello World!', () => {
    multi.readFile('example.txt', 'utf8', (err, data) => {
      t.error(err, 'able to read')
      t.equal(data, 'Hello World!', 'got file contents')

      multi.readdir('/', (err2, files) => {
        t.error(err2, 'able to read dir')
        t.deepEqual(files, ['example.txt'], 'got files from drive')
        multi.readdir('/', { includeStats: true }, (err3, stats) => {
          t.error(err3, 'able to read dir stats')
          t.equal(stats.length, 1, 'got stats from drive')
          const [statData] = stats
          const { name, stat } = statData
          t.equal(name, 'example.txt', 'got expected name')
          t.ok(stat, 'got a stat object')
          t.end()
        })
      })
    })
  })
})

test.skip('Add/Remove drive events', (t) => {
  const drive = hyperdrive('example')

  const multi = multiHyperdrive(drive)

  drive.ready(() => {
    const drive2 = hyperdrive('example2')

    multi.on('drive-add', (somedrive) => {
      t.equal(somedrive, drive2, 'drive emitted on add')
    })

    multi.on('drive-remove', (somedrive) => {
      t.equal(somedrive, drive2, 'drive emitted on remove')
      t.end()
    })

    multi.addDrive(drive2, () => {
      t.pass('Able to add drive')
      multi.removeDrive(drive2.key)
    })
  })
})
test.skip('Write to primary through multi-hyperdrive', (t) => {
  const drive = hyperdrive('example')

  const multi = multiHyperdrive(drive)

  multi.writeFile('/example1.txt', 'Hello world!', (err) => {
    t.error(err, 'able to write file')
    multi.writeFile('/example2.txt', 'Hello, world?', (err) => {
      t.error(err, 'able to write another file')
      multi.readdir('/', (err, files) => {
        t.error(err, 'able to read files from dir')
        t.deepEquals(files, ['example.txt', 'example2.txt', 'example1.txt'], 'got expected files in the dir')
        t.end()
      })
    })
  })
})

test('Read from multiple non-conflicting drives', async (t) => {
  t.plan(4)

  let [drive1, drive2] = await createHyperdrives({ namespace: 'example2', sameNamespace: true, count: 2 })
  let multi = multiHyperdrive(drive1)

  multi.addDrive(drive2)

  await new Promise((resolve, reject) => {
    prepare((e) => {
      if (e) t.error(e)
      verify((e) => {
        if (e) t.error(e)
        cleanup()
        resolve()
      })
    })

    function prepare (cb) {
      drive1.writeFile('example.txt', 'Hello World! I am here!!!', (e) => {
        if (e) return cb(e)
        drive2.writeFile('example2.txt', 'Hello World! Tada', (e) => {
          if (e) return cb(e)
          cb()
        })
      })
    }

    function verify (cb) {
      multi.readFile('example2.txt', 'utf8', (err, data) => {
        t.error(err, 'able to read')
        t.equal(data, 'Hello World! Tada', 'got file contents')

        multi.readdir('/', (err2, files) => {
          t.error(err2, 'able to read dir')
          t.deepEqual(files, ['example.txt', 'example2.txt'], 'got files from drives')
          cb()
        })
      })
    }

    function cleanup () {
      drive1.close()
      drive2.close()
    }
  })
  t.end()
})

