// import
// const { ethers } = require("ethers")
const { ethers } = require("hardhat")
// async main
async function main() {
    // require("hardhat") knows where the contracts dir is and able to pull content from dir
    // require("ethers") does not know
    // therefore, using hardhat is better
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
