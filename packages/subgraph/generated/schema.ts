// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Relayer extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Relayer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Relayer must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Relayer", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Relayer | null {
    return changetype<Relayer | null>(
      store.get_in_block("Relayer", id.toHexString()),
    );
  }

  static load(id: Bytes): Relayer | null {
    return changetype<Relayer | null>(store.get("Relayer", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get emailAddress(): string {
    let value = this.get("emailAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set emailAddress(value: string) {
    this.set("emailAddress", Value.fromString(value));
  }

  get hostname(): string {
    let value = this.get("hostname");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set hostname(value: string) {
    this.set("hostname", Value.fromString(value));
  }

  get relayerAccounts(): Array<Bytes> {
    let value = this.get("relayerAccounts");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytesArray();
    }
  }

  set relayerAccounts(value: Array<Bytes>) {
    this.set("relayerAccounts", Value.fromBytesArray(value));
  }

  get createdAt(): string {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set createdAt(value: string) {
    this.set("createdAt", Value.fromString(value));
  }

  get updatedAt(): string {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set updatedAt(value: string) {
    this.set("updatedAt", Value.fromString(value));
  }
}

export class Account extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Account must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Account", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Account | null {
    return changetype<Account | null>(
      store.get_in_block("Account", id.toHexString()),
    );
  }

  static load(id: Bytes): Account | null {
    return changetype<Account | null>(store.get("Account", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get walletSalt(): Bytes {
    let value = this.get("walletSalt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set walletSalt(value: Bytes) {
    this.set("walletSalt", Value.fromBytes(value));
  }

  get psiPoint(): Bytes {
    let value = this.get("psiPoint");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set psiPoint(value: Bytes) {
    this.set("psiPoint", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class UnclaimedFund extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UnclaimedFund entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UnclaimedFund must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UnclaimedFund", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UnclaimedFund | null {
    return changetype<UnclaimedFund | null>(
      store.get_in_block("UnclaimedFund", id),
    );
  }

  static load(id: string): UnclaimedFund | null {
    return changetype<UnclaimedFund | null>(store.get("UnclaimedFund", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenAddr(): Bytes {
    let value = this.get("tokenAddr");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set tokenAddr(value: Bytes) {
    this.set("tokenAddr", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get expiryTime(): BigInt {
    let value = this.get("expiryTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set expiryTime(value: BigInt) {
    this.set("expiryTime", Value.fromBigInt(value));
  }

  get commitmentRandomness(): BigInt | null {
    let value = this.get("commitmentRandomness");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set commitmentRandomness(value: BigInt | null) {
    if (!value) {
      this.unset("commitmentRandomness");
    } else {
      this.set("commitmentRandomness", Value.fromBigInt(<BigInt>value));
    }
  }

  get emailAddr(): string | null {
    let value = this.get("emailAddr");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set emailAddr(value: string | null) {
    if (!value) {
      this.unset("emailAddr");
    } else {
      this.set("emailAddr", Value.fromString(<string>value));
    }
  }

  get recipient(): Bytes | null {
    let value = this.get("recipient");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set recipient(value: Bytes | null) {
    if (!value) {
      this.unset("recipient");
    } else {
      this.set("recipient", Value.fromBytes(<Bytes>value));
    }
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get claimedAt(): BigInt | null {
    let value = this.get("claimedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set claimedAt(value: BigInt | null) {
    if (!value) {
      this.unset("claimedAt");
    } else {
      this.set("claimedAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get voidedAt(): BigInt | null {
    let value = this.get("voidedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set voidedAt(value: BigInt | null) {
    if (!value) {
      this.unset("voidedAt");
    } else {
      this.set("voidedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class UnclaimedState extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UnclaimedState entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UnclaimedState must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("UnclaimedState", id.toString(), this);
    }
  }

  static loadInBlock(id: string): UnclaimedState | null {
    return changetype<UnclaimedState | null>(
      store.get_in_block("UnclaimedState", id),
    );
  }

  static load(id: string): UnclaimedState | null {
    return changetype<UnclaimedState | null>(store.get("UnclaimedState", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get extensionAddr(): Bytes {
    let value = this.get("extensionAddr");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set extensionAddr(value: Bytes) {
    this.set("extensionAddr", Value.fromBytes(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get expiryTime(): BigInt {
    let value = this.get("expiryTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set expiryTime(value: BigInt) {
    this.set("expiryTime", Value.fromBigInt(value));
  }

  get state(): Bytes {
    let value = this.get("state");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set state(value: Bytes) {
    this.set("state", Value.fromBytes(value));
  }

  get commitmentRandomness(): BigInt | null {
    let value = this.get("commitmentRandomness");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set commitmentRandomness(value: BigInt | null) {
    if (!value) {
      this.unset("commitmentRandomness");
    } else {
      this.set("commitmentRandomness", Value.fromBigInt(<BigInt>value));
    }
  }

  get emailAddr(): string | null {
    let value = this.get("emailAddr");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set emailAddr(value: string | null) {
    if (!value) {
      this.unset("emailAddr");
    } else {
      this.set("emailAddr", Value.fromString(<string>value));
    }
  }

  get recipient(): Bytes | null {
    let value = this.get("recipient");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set recipient(value: Bytes | null) {
    if (!value) {
      this.unset("recipient");
    } else {
      this.set("recipient", Value.fromBytes(<Bytes>value));
    }
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get claimedAt(): BigInt | null {
    let value = this.get("claimedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set claimedAt(value: BigInt | null) {
    if (!value) {
      this.unset("claimedAt");
    } else {
      this.set("claimedAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get voidedAt(): BigInt | null {
    let value = this.get("voidedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set voidedAt(value: BigInt | null) {
    if (!value) {
      this.unset("voidedAt");
    } else {
      this.set("voidedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class EmailOp extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EmailOp entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type EmailOp must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("EmailOp", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): EmailOp | null {
    return changetype<EmailOp | null>(
      store.get_in_block("EmailOp", id.toHexString()),
    );
  }

  static load(id: Bytes): EmailOp | null {
    return changetype<EmailOp | null>(store.get("EmailOp", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get success(): boolean {
    let value = this.get("success");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set success(value: boolean) {
    this.set("success", Value.fromBoolean(value));
  }

  get walletSalt(): Bytes {
    let value = this.get("walletSalt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set walletSalt(value: Bytes) {
    this.set("walletSalt", Value.fromBytes(value));
  }

  get hasRecipient(): boolean {
    let value = this.get("hasRecipient");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set hasRecipient(value: boolean) {
    this.set("hasRecipient", Value.fromBoolean(value));
  }

  get hasEmailRecipient(): boolean {
    let value = this.get("hasEmailRecipient");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set hasEmailRecipient(value: boolean) {
    this.set("hasEmailRecipient", Value.fromBoolean(value));
  }

  get registeredUnclaimId(): BigInt {
    let value = this.get("registeredUnclaimId");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set registeredUnclaimId(value: BigInt) {
    this.set("registeredUnclaimId", Value.fromBigInt(value));
  }

  get emailNullifier(): Bytes {
    let value = this.get("emailNullifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set emailNullifier(value: Bytes) {
    this.set("emailNullifier", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class Extension extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Extension entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Extension must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Extension", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Extension | null {
    return changetype<Extension | null>(
      store.get_in_block("Extension", id.toHexString()),
    );
  }

  static load(id: Bytes): Extension | null {
    return changetype<Extension | null>(
      store.get("Extension", id.toHexString()),
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get extensionAddr(): Bytes {
    let value = this.get("extensionAddr");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set extensionAddr(value: Bytes) {
    this.set("extensionAddr", Value.fromBytes(value));
  }

  get subjectTemplates(): Array<Array<string>> {
    let value = this.get("subjectTemplates");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toStringArray();
    }
  }

  set subjectTemplates(value: Array<Array<string>>) {
    this.set("subjectTemplates", Value.fromStringMatrix(value));
  }

  get maxExecutionGas(): BigInt {
    let value = this.get("maxExecutionGas");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set maxExecutionGas(value: BigInt) {
    this.set("maxExecutionGas", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get createdBy(): Bytes {
    let value = this.get("createdBy");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set createdBy(value: Bytes) {
    this.set("createdBy", Value.fromBytes(value));
  }
}
