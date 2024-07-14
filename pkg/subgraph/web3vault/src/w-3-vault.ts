import { NewVault as NewVaultEvent } from "../generated/W3Vault/W3Vault"
import { NewVault } from "../generated/schema"

export function handleNewVault(event: NewVaultEvent): void {
  let entity = new NewVault(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.pointer = event.params.pointer
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
