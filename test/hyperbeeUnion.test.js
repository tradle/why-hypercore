const test = require('tape')
const Hyperbee = require('hyperbee')
const Union = require('sorted-union-stream')
const { LEFT, EQ_LEFT, RIGHT, EQ_RIGHT } = require('sorted-union-stream/constants')
const hypercore = require('hypercore')
const { create } = require('../utils')

test('hyperbee union - simulating index - deduplicating based on "time" (not key)', t => {
  prepare(2)
  .then(([sorted1, sorted2]) => {
    const u = new Union(sorted1, sorted2, compare)
    const values = [
      { a: {id: 1, time: 1070} },
      { a1: {id: 7, time: 1130} },
      { b: {id: 2, time: 1090} },
      { c: {id: 3, time: 1100} },
      { d: {id: 4, time: 1080} },
      { e: {id: 5, time: 1120} },
      { f: {id: 6, time: 1110} },
    ]
    u.on('data', function(data) {
      // console.log(data.value)
      const { key, value } = data
      t.same({[key]: value}, values.shift())
    })
    u.on('end', function() {
      t.same(0, values.length, 'no more data')
      t.end()
    })
  })
})


test('hyperbee union (reverse) - simulating index - deduplicating based on "time" (not key)', t => {
  prepare(2, true)
  .then(([sorted1, sorted2]) => {
    const u = new Union(sorted1, sorted2, compareReverse)

    const values = [
      { f: {id: 6, time: 1110} },
      { e: {id: 5, time: 1120} },
      { d: {id: 4, time: 1080} },
      { c: {id: 3, time: 1100} },
      { b: {id: 2, time: 1090} },
      { a1: {id: 7, time: 1130} },
      { a: {id: 1, time: 1070} },
    ]
    u.on('data', function(data) {
      // console.log(data.value)
      const { key, value } = data
      t.same({[key]: value}, values.shift())
    })
    u.on('end', function() {
      t.same(0, values.length, 'no more data')
      t.end()
    })
  })
})

test('hyperbee union of 3 streams - simulating index - deduplicating based on "time" (not key)', t => {
  prepare(3)
  .then(([sorted1, sorted2, sorted3]) => {
    const u2 = new Union(sorted1, sorted2, compare)
    const u3 = new Union(u2, sorted3, compare)

    const values = [
       { a: {id: 1, time: 1140} },
       { a1: {id: 7, time: 1200} },
       { b: {id: 2, time: 1160} },
       { c: {id: 3, time: 1170} },
       { d: {id: 4, time: 1150} },
       { e: {id: 5, time: 1190} },
       { f: {id: 6, time: 1180} },
       ]

    let times =
    u3.on('data', (data) => {
      // console.log(data)
      const { key, value } = data
      t.same({[key]: value}, values.shift())
    })
    u3.on('end', () => {
      t.same(0, values.length, 'no more data')
      t.end()
    })
  })
})

function compare (a, b) {
  if (a.value.id < b.value.id)
    return LEFT
  if (a.value.id > b.value.id)
    return RIGHT
  if (a.value.time < b.value.time)
    return EQ_RIGHT
  return EQ_LEFT
}

function compareReverse (a, b) {
  if (a.value.id < b.value.id)
    return RIGHT
  if (a.value.id > b.value.id)
    return LEFT
  if (a.value.time < b.value.time)
    return EQ_RIGHT
  return EQ_LEFT
}
async function prepare(count, reverse) {
  let feeds = await create(count)
  let d = 1000
  let cnt = 0
  function getDate(cnt) {
    return d + cnt * 10
  }

  let streams = []

  for (let i=0; i<count; i++) {
    let feed = feeds[i]
    const db = new Hyperbee(feed, {
      keyEncoding: 'utf-8',
      valueEncoding: 'json'
    })
    await db.put('a', {id: 1, time: getDate(cnt++)})
    await db.put('d', {id: 4, time: getDate(cnt++)})
    await db.put('b', {id: 2, time: getDate(cnt++)})
    await db.put('c', {id: 3, time: getDate(cnt++)})
    await db.put('f', {id: 6, time: getDate(cnt++)})
    await db.put('e', {id: 5, time: getDate(cnt++)})
    await db.put('a1', {id: 7, time: getDate(cnt++)})

    const sorted = db.createReadStream({ gte: 'a', lte: 'f', reverse })

    streams.push(sorted)
  }
  return streams
}

