/* eslint-env mocha */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const cbor = require('../')
const cases = require('./fixtures/cases')

function testAll (list) {
  list.forEach(c => {
    expect(
      cbor.diagnose(cases.toBuffer(c))
    ).to.be.eql(
      c[1]
    )
  })
}

function failAll (list) {
  list.forEach(c => {
    expect(
      () => cbor.diagnose(cases.toBuffer(c))
    ).to.throw()
  })
}

describe('Diagnose', () => {
  it('diagnose', () => testAll(cases.good))
  it('decode', () => testAll(cases.decodeGood))
  it('edges', () => failAll(cases.decodeBad))
})
