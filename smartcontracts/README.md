## NFT PASS smartcontracts 


# deploy 
forge script script/DeployToken.s.sol:NFTDeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv

# deploy factory
forge script script/DeployFactory.s.sol:DeployFactory --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv

# set 
forge script script/TypeToken.s.sol:NFTTypeScript --rpc-url $SEPOLIA_RPC_URL --broadcast  -vvvv

# mint
forge script script/MintToken.s.sol:NFTMintScript --rpc-url $SEPOLIA_RPC_URL --broadcast  -vvvv

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
