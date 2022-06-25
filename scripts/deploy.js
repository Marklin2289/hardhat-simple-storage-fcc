// import
// const { ethers } = require("ethers")
const { ethers, run, network } = require("hardhat")

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
    // what's the private key?
    // what's the RPC URL ?
    console.log(`Deployed contract to ${simpleStorage.address}`)
    // what happens when we deploy to our hardhat network ? ()
    // console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        // first wait for few blocks
        await simpleStorage.deployTransaction.wait(6)
        // then run verify()
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is : ${updatedValue}`)
}

// auto verify and publish contract on etherscan only using hardhat plugin (nomiclabs/hardhat-etherscan)
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(error)
        }
    }
}
// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
