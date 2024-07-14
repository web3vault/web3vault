import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewVault } from "../generated/W3Vault/W3Vault"

export function createNewVaultEvent(
  addr: Address,
  pointer: string,
  timestamp: BigInt
): NewVault {
  let newVaultEvent = changetype<NewVault>(newMockEvent())

  newVaultEvent.parameters = new Array()

  newVaultEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  newVaultEvent.parameters.push(
    new ethereum.EventParam("pointer", ethereum.Value.fromString(pointer))
  )
  newVaultEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return newVaultEvent
}
