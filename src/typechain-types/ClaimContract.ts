/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface ClaimContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "LEAP_YEAR_IN_SECONDS"
      | "YEAR_IN_SECONDS"
      | "addBalance"
      | "balances"
      | "calcHash256"
      | "calculateAddressString"
      | "claim"
      | "claimMessageMatchesSignature"
      | "createClaimMessage"
      | "deploymentTimestamp"
      | "dilute1"
      | "dilute2"
      | "dilute3"
      | "dilute_s1_75_timestamp"
      | "dilute_s2_50_timestamp"
      | "dilute_s3_0_timestamp"
      | "dilution_s1_75_executed"
      | "dilution_s2_50_executed"
      | "dilution_s3_0_executed"
      | "fill"
      | "getCurrentDilutedClaimFactor"
      | "getDilutionTimestamp1"
      | "getDilutionTimestamp2"
      | "getDilutionTimestamp3"
      | "getEthAddressFromSignature"
      | "getHashForClaimMessage"
      | "lateClaimBeneficorAddressDAO"
      | "lateClaimBeneficorAddressReinsertPot"
      | "prefixStr"
      | "pubKeyToEthAddress"
      | "publicKeyToBitcoinAddress"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;

  encodeFunctionData(
    functionFragment: "LEAP_YEAR_IN_SECONDS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "YEAR_IN_SECONDS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addBalance",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "balances", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "calcHash256",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateAddressString",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [
      AddressLike,
      boolean,
      BytesLike,
      BytesLike,
      BytesLike,
      BigNumberish,
      BytesLike,
      BytesLike,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "claimMessageMatchesSignature",
    values: [
      AddressLike,
      boolean,
      BytesLike,
      BytesLike,
      BytesLike,
      BigNumberish,
      BytesLike,
      BytesLike,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createClaimMessage",
    values: [AddressLike, boolean, BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "deploymentTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "dilute1", values?: undefined): string;
  encodeFunctionData(functionFragment: "dilute2", values?: undefined): string;
  encodeFunctionData(functionFragment: "dilute3", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "dilute_s1_75_timestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dilute_s2_50_timestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dilute_s3_0_timestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dilution_s1_75_executed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dilution_s2_50_executed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "dilution_s3_0_executed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fill",
    values: [BytesLike[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentDilutedClaimFactor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDilutionTimestamp1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDilutionTimestamp2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDilutionTimestamp3",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEthAddressFromSignature",
    values: [
      AddressLike,
      boolean,
      BytesLike,
      BigNumberish,
      BytesLike,
      BytesLike,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getHashForClaimMessage",
    values: [AddressLike, boolean, BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "lateClaimBeneficorAddressDAO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lateClaimBeneficorAddressReinsertPot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "prefixStr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pubKeyToEthAddress",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "publicKeyToBitcoinAddress",
    values: [BytesLike, BytesLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "LEAP_YEAR_IN_SECONDS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "YEAR_IN_SECONDS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcHash256",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateAddressString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimMessageMatchesSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createClaimMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deploymentTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dilute1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dilute2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dilute3", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "dilute_s1_75_timestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dilute_s2_50_timestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dilute_s3_0_timestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dilution_s1_75_executed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dilution_s2_50_executed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dilution_s3_0_executed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fill", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentDilutedClaimFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDilutionTimestamp1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDilutionTimestamp2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDilutionTimestamp3",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthAddressFromSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHashForClaimMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lateClaimBeneficorAddressDAO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lateClaimBeneficorAddressReinsertPot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "prefixStr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pubKeyToEthAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publicKeyToBitcoinAddress",
    data: BytesLike
  ): Result;
}

export namespace ClaimEvent {
  export type InputTuple = [
    _from: BytesLike,
    _to: AddressLike,
    amount: BigNumberish,
    _nominator: BigNumberish,
    _denominator: BigNumberish
  ];
  export type OutputTuple = [
    _from: string,
    _to: string,
    amount: bigint,
    _nominator: bigint,
    _denominator: bigint
  ];
  export interface OutputObject {
    _from: string;
    _to: string;
    amount: bigint;
    _nominator: bigint;
    _denominator: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ClaimContract extends BaseContract {
  connect(runner?: ContractRunner | null): ClaimContract;
  waitForDeployment(): Promise<this>;

  interface: ClaimContractInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  LEAP_YEAR_IN_SECONDS: TypedContractMethod<[], [bigint], "view">;

  YEAR_IN_SECONDS: TypedContractMethod<[], [bigint], "view">;

  addBalance: TypedContractMethod<[oldAddress: BytesLike], [void], "payable">;

  balances: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;

  calcHash256: TypedContractMethod<[data: BytesLike], [string], "view">;

  calculateAddressString: TypedContractMethod<
    [_addr: AddressLike, _includeAddrChecksum: boolean],
    [string],
    "view"
  >;

  claim: TypedContractMethod<
    [
      _targetAdress: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _pubKeyX: BytesLike,
      _pubKeyY: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [void],
    "nonpayable"
  >;

  claimMessageMatchesSignature: TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postFix: BytesLike,
      _pubKeyX: BytesLike,
      _pubKeyY: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [boolean],
    "view"
  >;

  createClaimMessage: TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;

  deploymentTimestamp: TypedContractMethod<[], [bigint], "view">;

  dilute1: TypedContractMethod<[], [bigint], "nonpayable">;

  dilute2: TypedContractMethod<[], [bigint], "nonpayable">;

  dilute3: TypedContractMethod<[], [bigint], "nonpayable">;

  dilute_s1_75_timestamp: TypedContractMethod<[], [bigint], "view">;

  dilute_s2_50_timestamp: TypedContractMethod<[], [bigint], "view">;

  dilute_s3_0_timestamp: TypedContractMethod<[], [bigint], "view">;

  dilution_s1_75_executed: TypedContractMethod<[], [boolean], "view">;

  dilution_s2_50_executed: TypedContractMethod<[], [boolean], "view">;

  dilution_s3_0_executed: TypedContractMethod<[], [boolean], "view">;

  fill: TypedContractMethod<
    [_accounts: BytesLike[], _balances: BigNumberish[]],
    [void],
    "payable"
  >;

  getCurrentDilutedClaimFactor: TypedContractMethod<
    [],
    [[bigint, bigint] & { nominator: bigint; denominator: bigint }],
    "view"
  >;

  getDilutionTimestamp1: TypedContractMethod<[], [bigint], "view">;

  getDilutionTimestamp2: TypedContractMethod<[], [bigint], "view">;

  getDilutionTimestamp3: TypedContractMethod<[], [bigint], "view">;

  getEthAddressFromSignature: TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;

  getHashForClaimMessage: TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;

  lateClaimBeneficorAddressDAO: TypedContractMethod<[], [string], "view">;

  lateClaimBeneficorAddressReinsertPot: TypedContractMethod<
    [],
    [string],
    "view"
  >;

  prefixStr: TypedContractMethod<[], [string], "view">;

  pubKeyToEthAddress: TypedContractMethod<
    [pubKeyX: BytesLike, pubKeyY: BytesLike],
    [string],
    "view"
  >;

  publicKeyToBitcoinAddress: TypedContractMethod<
    [
      _publicKeyX: BytesLike,
      _publicKeyY: BytesLike,
      _addressType: BigNumberish
    ],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "LEAP_YEAR_IN_SECONDS"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "YEAR_IN_SECONDS"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "addBalance"
  ): TypedContractMethod<[oldAddress: BytesLike], [void], "payable">;
  getFunction(
    nameOrSignature: "balances"
  ): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "calcHash256"
  ): TypedContractMethod<[data: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "calculateAddressString"
  ): TypedContractMethod<
    [_addr: AddressLike, _includeAddrChecksum: boolean],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [
      _targetAdress: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _pubKeyX: BytesLike,
      _pubKeyY: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimMessageMatchesSignature"
  ): TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postFix: BytesLike,
      _pubKeyX: BytesLike,
      _pubKeyY: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "createClaimMessage"
  ): TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "deploymentTimestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "dilute1"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "dilute2"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "dilute3"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "dilute_s1_75_timestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "dilute_s2_50_timestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "dilute_s3_0_timestamp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "dilution_s1_75_executed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "dilution_s2_50_executed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "dilution_s3_0_executed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "fill"
  ): TypedContractMethod<
    [_accounts: BytesLike[], _balances: BigNumberish[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getCurrentDilutedClaimFactor"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { nominator: bigint; denominator: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDilutionTimestamp1"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getDilutionTimestamp2"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getDilutionTimestamp3"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getEthAddressFromSignature"
  ): TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getHashForClaimMessage"
  ): TypedContractMethod<
    [
      _claimToAddr: AddressLike,
      _claimAddrChecksum: boolean,
      _postfix: BytesLike,
      _dmdSignature: boolean
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "lateClaimBeneficorAddressDAO"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "lateClaimBeneficorAddressReinsertPot"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "prefixStr"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pubKeyToEthAddress"
  ): TypedContractMethod<
    [pubKeyX: BytesLike, pubKeyY: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "publicKeyToBitcoinAddress"
  ): TypedContractMethod<
    [
      _publicKeyX: BytesLike,
      _publicKeyY: BytesLike,
      _addressType: BigNumberish
    ],
    [string],
    "view"
  >;

  getEvent(
    key: "Claim"
  ): TypedContractEvent<
    ClaimEvent.InputTuple,
    ClaimEvent.OutputTuple,
    ClaimEvent.OutputObject
  >;

  filters: {
    "Claim(bytes20,address,uint256,uint256,uint256)": TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;
    Claim: TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;
  };
}