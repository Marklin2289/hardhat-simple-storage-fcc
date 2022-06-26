const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        assert.equal(currentValue.toString(), expectedValue)
        // expect
    })
})
