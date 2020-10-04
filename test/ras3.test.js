// For this test, move one of your hypercore folders to S3

const tape = require('tape')
const ram = require('random-access-memory')
const ras3 = require('random-access-s3')
const hypercore = require('hypercore')

const MESSAGE = 'Usage:  node test/ras3.test.js [S3 bucket] [folder in this bucket with the hypercore]'

var [ cmd, cmd1, bucket, folder ] = process.argv
if (cmd1.endsWith('.bin/tape'))
  ([ bucket, folder] = process.argv.slice(4))
else
  ([ bucket, folder] = process.argv.slice(2))


tape('read from s3', t => {
  if (!folder) {
    t.fail(MESSAGE)
    t.end()
    return
  }
  // console.log(`folder: ${folder}`)
  let expected = ['bitfield', 'data', 'key', 'secret_key', 'signatures', 'tree']
  let actual = []

  let feed = hypercore(filename => {
    // console.log(`file: ${filename}`)
    actual.push(filename)
    return ras3(`${folder}/${filename}`, { bucket })
  })
  feed.ready(() => {
    t.same(expected, actual.sort((a, b) => a > b))
    let length = 0
    feed.createReadStream({ live: false })
    .on('data', (data) => {
      console.log(data.toString())
    })
    .on('end', () => {
      t.end()
    })
    .on('error', (err) => {
      t.fail(err.message)
    })
  })
})
