import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewVault } from "../generated/schema"
import { NewVault as NewVaultEvent } from "../generated/W3Vault/W3Vault"
import { handleNewVault } from "../src/w-3-vault"
import { createNewVaultEvent } from "./w-3-vault-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let pointer = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let newNewVaultEvent = createNewVaultEvent(addr, pointer, timestamp)
    handleNewVault(newNewVaultEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewVault created and stored", () => {
    assert.entityCount("NewVault", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pointer",
      "Example string value"
    )
    assert.fieldEquals(
      "NewVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
