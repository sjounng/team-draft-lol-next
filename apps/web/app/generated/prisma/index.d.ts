
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Pool
 * 
 */
export type Pool = $Result.DefaultSelection<Prisma.$PoolPayload>
/**
 * Model GameRecord
 * 
 */
export type GameRecord = $Result.DefaultSelection<Prisma.$GameRecordPayload>
/**
 * Model UserGameRecord
 * 
 */
export type UserGameRecord = $Result.DefaultSelection<Prisma.$UserGameRecordPayload>
/**
 * Model PoolMember
 * 
 */
export type PoolMember = $Result.DefaultSelection<Prisma.$PoolMemberPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pool`: Exposes CRUD operations for the **Pool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pools
    * const pools = await prisma.pool.findMany()
    * ```
    */
  get pool(): Prisma.PoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameRecord`: Exposes CRUD operations for the **GameRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameRecords
    * const gameRecords = await prisma.gameRecord.findMany()
    * ```
    */
  get gameRecord(): Prisma.GameRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGameRecord`: Exposes CRUD operations for the **UserGameRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGameRecords
    * const userGameRecords = await prisma.userGameRecord.findMany()
    * ```
    */
  get userGameRecord(): Prisma.UserGameRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poolMember`: Exposes CRUD operations for the **PoolMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PoolMembers
    * const poolMembers = await prisma.poolMember.findMany()
    * ```
    */
  get poolMember(): Prisma.PoolMemberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Pool: 'Pool',
    GameRecord: 'GameRecord',
    UserGameRecord: 'UserGameRecord',
    PoolMember: 'PoolMember'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "pool" | "gameRecord" | "userGameRecord" | "poolMember"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Pool: {
        payload: Prisma.$PoolPayload<ExtArgs>
        fields: Prisma.PoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          findFirst: {
            args: Prisma.PoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          findMany: {
            args: Prisma.PoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          create: {
            args: Prisma.PoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          createMany: {
            args: Prisma.PoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          delete: {
            args: Prisma.PoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          update: {
            args: Prisma.PoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          deleteMany: {
            args: Prisma.PoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          upsert: {
            args: Prisma.PoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          aggregate: {
            args: Prisma.PoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePool>
          }
          groupBy: {
            args: Prisma.PoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoolCountArgs<ExtArgs>
            result: $Utils.Optional<PoolCountAggregateOutputType> | number
          }
        }
      }
      GameRecord: {
        payload: Prisma.$GameRecordPayload<ExtArgs>
        fields: Prisma.GameRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findFirst: {
            args: Prisma.GameRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findMany: {
            args: Prisma.GameRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          create: {
            args: Prisma.GameRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          createMany: {
            args: Prisma.GameRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          delete: {
            args: Prisma.GameRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          update: {
            args: Prisma.GameRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          deleteMany: {
            args: Prisma.GameRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          upsert: {
            args: Prisma.GameRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          aggregate: {
            args: Prisma.GameRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameRecord>
          }
          groupBy: {
            args: Prisma.GameRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameRecordCountArgs<ExtArgs>
            result: $Utils.Optional<GameRecordCountAggregateOutputType> | number
          }
        }
      }
      UserGameRecord: {
        payload: Prisma.$UserGameRecordPayload<ExtArgs>
        fields: Prisma.UserGameRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGameRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGameRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          findFirst: {
            args: Prisma.UserGameRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGameRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          findMany: {
            args: Prisma.UserGameRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>[]
          }
          create: {
            args: Prisma.UserGameRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          createMany: {
            args: Prisma.UserGameRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGameRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>[]
          }
          delete: {
            args: Prisma.UserGameRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          update: {
            args: Prisma.UserGameRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          deleteMany: {
            args: Prisma.UserGameRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGameRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGameRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>[]
          }
          upsert: {
            args: Prisma.UserGameRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGameRecordPayload>
          }
          aggregate: {
            args: Prisma.UserGameRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGameRecord>
          }
          groupBy: {
            args: Prisma.UserGameRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGameRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGameRecordCountArgs<ExtArgs>
            result: $Utils.Optional<UserGameRecordCountAggregateOutputType> | number
          }
        }
      }
      PoolMember: {
        payload: Prisma.$PoolMemberPayload<ExtArgs>
        fields: Prisma.PoolMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoolMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoolMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          findFirst: {
            args: Prisma.PoolMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoolMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          findMany: {
            args: Prisma.PoolMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>[]
          }
          create: {
            args: Prisma.PoolMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          createMany: {
            args: Prisma.PoolMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoolMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>[]
          }
          delete: {
            args: Prisma.PoolMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          update: {
            args: Prisma.PoolMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          deleteMany: {
            args: Prisma.PoolMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoolMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoolMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>[]
          }
          upsert: {
            args: Prisma.PoolMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolMemberPayload>
          }
          aggregate: {
            args: Prisma.PoolMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoolMember>
          }
          groupBy: {
            args: Prisma.PoolMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoolMemberCountArgs<ExtArgs>
            result: $Utils.Optional<PoolMemberCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    pool?: PoolOmit
    gameRecord?: GameRecordOmit
    userGameRecord?: UserGameRecordOmit
    poolMember?: PoolMemberOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ownedPools: number
    poolMemberships: number
    gameRecords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedPools?: boolean | UserCountOutputTypeCountOwnedPoolsArgs
    poolMemberships?: boolean | UserCountOutputTypeCountPoolMembershipsArgs
    gameRecords?: boolean | UserCountOutputTypeCountGameRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPoolMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameRecordWhereInput
  }


  /**
   * Count Type PoolCountOutputType
   */

  export type PoolCountOutputType = {
    memberships: number
    gameRecords: number
  }

  export type PoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | PoolCountOutputTypeCountMembershipsArgs
    gameRecords?: boolean | PoolCountOutputTypeCountGameRecordsArgs
  }

  // Custom InputTypes
  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolCountOutputType
     */
    select?: PoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolMemberWhereInput
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountGameRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameRecordWhereInput
  }


  /**
   * Count Type GameRecordCountOutputType
   */

  export type GameRecordCountOutputType = {
    userRecords: number
  }

  export type GameRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRecords?: boolean | GameRecordCountOutputTypeCountUserRecordsArgs
  }

  // Custom InputTypes
  /**
   * GameRecordCountOutputType without action
   */
  export type GameRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecordCountOutputType
     */
    select?: GameRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameRecordCountOutputType without action
   */
  export type GameRecordCountOutputTypeCountUserRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    score: number | null
    winLossStreak: number | null
  }

  export type UserSumAggregateOutputType = {
    score: number | null
    winLossStreak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    lolId: string | null
    mainLane: string | null
    subLane: string | null
    score: number | null
    winLossStreak: number | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    lolId: string | null
    mainLane: string | null
    subLane: string | null
    score: number | null
    winLossStreak: number | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    name: number
    lolId: number
    mainLane: number
    subLane: number
    score: number
    winLossStreak: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    score?: true
    winLossStreak?: true
  }

  export type UserSumAggregateInputType = {
    score?: true
    winLossStreak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    lolId?: true
    mainLane?: true
    subLane?: true
    score?: true
    winLossStreak?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    lolId?: true
    mainLane?: true
    subLane?: true
    score?: true
    winLossStreak?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    lolId?: true
    mainLane?: true
    subLane?: true
    score?: true
    winLossStreak?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    name: string | null
    lolId: string | null
    mainLane: string | null
    subLane: string | null
    score: number
    winLossStreak: number
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    lolId?: boolean
    mainLane?: boolean
    subLane?: boolean
    score?: boolean
    winLossStreak?: boolean
    createdAt?: boolean
    ownedPools?: boolean | User$ownedPoolsArgs<ExtArgs>
    poolMemberships?: boolean | User$poolMembershipsArgs<ExtArgs>
    gameRecords?: boolean | User$gameRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    lolId?: boolean
    mainLane?: boolean
    subLane?: boolean
    score?: boolean
    winLossStreak?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    lolId?: boolean
    mainLane?: boolean
    subLane?: boolean
    score?: boolean
    winLossStreak?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    lolId?: boolean
    mainLane?: boolean
    subLane?: boolean
    score?: boolean
    winLossStreak?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "name" | "lolId" | "mainLane" | "subLane" | "score" | "winLossStreak" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedPools?: boolean | User$ownedPoolsArgs<ExtArgs>
    poolMemberships?: boolean | User$poolMembershipsArgs<ExtArgs>
    gameRecords?: boolean | User$gameRecordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ownedPools: Prisma.$PoolPayload<ExtArgs>[]
      poolMemberships: Prisma.$PoolMemberPayload<ExtArgs>[]
      gameRecords: Prisma.$UserGameRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      name: string | null
      lolId: string | null
      mainLane: string | null
      subLane: string | null
      score: number
      winLossStreak: number
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ownedPools<T extends User$ownedPoolsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedPoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    poolMemberships<T extends User$poolMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$poolMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameRecords<T extends User$gameRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly lolId: FieldRef<"User", 'String'>
    readonly mainLane: FieldRef<"User", 'String'>
    readonly subLane: FieldRef<"User", 'String'>
    readonly score: FieldRef<"User", 'Int'>
    readonly winLossStreak: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ownedPools
   */
  export type User$ownedPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    where?: PoolWhereInput
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    cursor?: PoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * User.poolMemberships
   */
  export type User$poolMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    where?: PoolMemberWhereInput
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    cursor?: PoolMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolMemberScalarFieldEnum | PoolMemberScalarFieldEnum[]
  }

  /**
   * User.gameRecords
   */
  export type User$gameRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    where?: UserGameRecordWhereInput
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    cursor?: UserGameRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGameRecordScalarFieldEnum | UserGameRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Pool
   */

  export type AggregatePool = {
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  export type PoolAvgAggregateOutputType = {
    poolId: number | null
  }

  export type PoolSumAggregateOutputType = {
    poolId: bigint | null
  }

  export type PoolMinAggregateOutputType = {
    poolId: bigint | null
    ownerId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type PoolMaxAggregateOutputType = {
    poolId: bigint | null
    ownerId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type PoolCountAggregateOutputType = {
    poolId: number
    ownerId: number
    name: number
    createdAt: number
    _all: number
  }


  export type PoolAvgAggregateInputType = {
    poolId?: true
  }

  export type PoolSumAggregateInputType = {
    poolId?: true
  }

  export type PoolMinAggregateInputType = {
    poolId?: true
    ownerId?: true
    name?: true
    createdAt?: true
  }

  export type PoolMaxAggregateInputType = {
    poolId?: true
    ownerId?: true
    name?: true
    createdAt?: true
  }

  export type PoolCountAggregateInputType = {
    poolId?: true
    ownerId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type PoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pool to aggregate.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pools
    **/
    _count?: true | PoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolMaxAggregateInputType
  }

  export type GetPoolAggregateType<T extends PoolAggregateArgs> = {
        [P in keyof T & keyof AggregatePool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePool[P]>
      : GetScalarType<T[P], AggregatePool[P]>
  }




  export type PoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolWhereInput
    orderBy?: PoolOrderByWithAggregationInput | PoolOrderByWithAggregationInput[]
    by: PoolScalarFieldEnum[] | PoolScalarFieldEnum
    having?: PoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolCountAggregateInputType | true
    _avg?: PoolAvgAggregateInputType
    _sum?: PoolSumAggregateInputType
    _min?: PoolMinAggregateInputType
    _max?: PoolMaxAggregateInputType
  }

  export type PoolGroupByOutputType = {
    poolId: bigint
    ownerId: string
    name: string
    createdAt: Date
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  type GetPoolGroupByPayload<T extends PoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolGroupByOutputType[P]>
            : GetScalarType<T[P], PoolGroupByOutputType[P]>
        }
      >
    >


  export type PoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Pool$membershipsArgs<ExtArgs>
    gameRecords?: boolean | Pool$gameRecordsArgs<ExtArgs>
    _count?: boolean | PoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectScalar = {
    poolId?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type PoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"poolId" | "ownerId" | "name" | "createdAt", ExtArgs["result"]["pool"]>
  export type PoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Pool$membershipsArgs<ExtArgs>
    gameRecords?: boolean | Pool$gameRecordsArgs<ExtArgs>
    _count?: boolean | PoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pool"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      memberships: Prisma.$PoolMemberPayload<ExtArgs>[]
      gameRecords: Prisma.$GameRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      poolId: bigint
      ownerId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["pool"]>
    composites: {}
  }

  type PoolGetPayload<S extends boolean | null | undefined | PoolDefaultArgs> = $Result.GetResult<Prisma.$PoolPayload, S>

  type PoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolCountAggregateInputType | true
    }

  export interface PoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pool'], meta: { name: 'Pool' } }
    /**
     * Find zero or one Pool that matches the filter.
     * @param {PoolFindUniqueArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoolFindUniqueArgs>(args: SelectSubset<T, PoolFindUniqueArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoolFindUniqueOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoolFindUniqueOrThrowArgs>(args: SelectSubset<T, PoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindFirstArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoolFindFirstArgs>(args?: SelectSubset<T, PoolFindFirstArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindFirstOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoolFindFirstOrThrowArgs>(args?: SelectSubset<T, PoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pools
     * const pools = await prisma.pool.findMany()
     * 
     * // Get first 10 Pools
     * const pools = await prisma.pool.findMany({ take: 10 })
     * 
     * // Only select the `poolId`
     * const poolWithPoolIdOnly = await prisma.pool.findMany({ select: { poolId: true } })
     * 
     */
    findMany<T extends PoolFindManyArgs>(args?: SelectSubset<T, PoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pool.
     * @param {PoolCreateArgs} args - Arguments to create a Pool.
     * @example
     * // Create one Pool
     * const Pool = await prisma.pool.create({
     *   data: {
     *     // ... data to create a Pool
     *   }
     * })
     * 
     */
    create<T extends PoolCreateArgs>(args: SelectSubset<T, PoolCreateArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pools.
     * @param {PoolCreateManyArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoolCreateManyArgs>(args?: SelectSubset<T, PoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pools and returns the data saved in the database.
     * @param {PoolCreateManyAndReturnArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pools and only return the `poolId`
     * const poolWithPoolIdOnly = await prisma.pool.createManyAndReturn({
     *   select: { poolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoolCreateManyAndReturnArgs>(args?: SelectSubset<T, PoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pool.
     * @param {PoolDeleteArgs} args - Arguments to delete one Pool.
     * @example
     * // Delete one Pool
     * const Pool = await prisma.pool.delete({
     *   where: {
     *     // ... filter to delete one Pool
     *   }
     * })
     * 
     */
    delete<T extends PoolDeleteArgs>(args: SelectSubset<T, PoolDeleteArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pool.
     * @param {PoolUpdateArgs} args - Arguments to update one Pool.
     * @example
     * // Update one Pool
     * const pool = await prisma.pool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoolUpdateArgs>(args: SelectSubset<T, PoolUpdateArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pools.
     * @param {PoolDeleteManyArgs} args - Arguments to filter Pools to delete.
     * @example
     * // Delete a few Pools
     * const { count } = await prisma.pool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoolDeleteManyArgs>(args?: SelectSubset<T, PoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoolUpdateManyArgs>(args: SelectSubset<T, PoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools and returns the data updated in the database.
     * @param {PoolUpdateManyAndReturnArgs} args - Arguments to update many Pools.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pools and only return the `poolId`
     * const poolWithPoolIdOnly = await prisma.pool.updateManyAndReturn({
     *   select: { poolId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoolUpdateManyAndReturnArgs>(args: SelectSubset<T, PoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pool.
     * @param {PoolUpsertArgs} args - Arguments to update or create a Pool.
     * @example
     * // Update or create a Pool
     * const pool = await prisma.pool.upsert({
     *   create: {
     *     // ... data to create a Pool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pool we want to update
     *   }
     * })
     */
    upsert<T extends PoolUpsertArgs>(args: SelectSubset<T, PoolUpsertArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolCountArgs} args - Arguments to filter Pools to count.
     * @example
     * // Count the number of Pools
     * const count = await prisma.pool.count({
     *   where: {
     *     // ... the filter for the Pools we want to count
     *   }
     * })
    **/
    count<T extends PoolCountArgs>(
      args?: Subset<T, PoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoolAggregateArgs>(args: Subset<T, PoolAggregateArgs>): Prisma.PrismaPromise<GetPoolAggregateType<T>>

    /**
     * Group by Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoolGroupByArgs['orderBy'] }
        : { orderBy?: PoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pool model
   */
  readonly fields: PoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memberships<T extends Pool$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Pool$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameRecords<T extends Pool$gameRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Pool$gameRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pool model
   */
  interface PoolFieldRefs {
    readonly poolId: FieldRef<"Pool", 'BigInt'>
    readonly ownerId: FieldRef<"Pool", 'String'>
    readonly name: FieldRef<"Pool", 'String'>
    readonly createdAt: FieldRef<"Pool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pool findUnique
   */
  export type PoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool findUniqueOrThrow
   */
  export type PoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool findFirst
   */
  export type PoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool findFirstOrThrow
   */
  export type PoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool findMany
   */
  export type PoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pools to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool create
   */
  export type PoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The data needed to create a Pool.
     */
    data: XOR<PoolCreateInput, PoolUncheckedCreateInput>
  }

  /**
   * Pool createMany
   */
  export type PoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pools.
     */
    data: PoolCreateManyInput | PoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pool createManyAndReturn
   */
  export type PoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * The data used to create many Pools.
     */
    data: PoolCreateManyInput | PoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pool update
   */
  export type PoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The data needed to update a Pool.
     */
    data: XOR<PoolUpdateInput, PoolUncheckedUpdateInput>
    /**
     * Choose, which Pool to update.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool updateMany
   */
  export type PoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pools.
     */
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyInput>
    /**
     * Filter which Pools to update
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to update.
     */
    limit?: number
  }

  /**
   * Pool updateManyAndReturn
   */
  export type PoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * The data used to update Pools.
     */
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyInput>
    /**
     * Filter which Pools to update
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pool upsert
   */
  export type PoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The filter to search for the Pool to update in case it exists.
     */
    where: PoolWhereUniqueInput
    /**
     * In case the Pool found by the `where` argument doesn't exist, create a new Pool with this data.
     */
    create: XOR<PoolCreateInput, PoolUncheckedCreateInput>
    /**
     * In case the Pool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoolUpdateInput, PoolUncheckedUpdateInput>
  }

  /**
   * Pool delete
   */
  export type PoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter which Pool to delete.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool deleteMany
   */
  export type PoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pools to delete
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to delete.
     */
    limit?: number
  }

  /**
   * Pool.memberships
   */
  export type Pool$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    where?: PoolMemberWhereInput
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    cursor?: PoolMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolMemberScalarFieldEnum | PoolMemberScalarFieldEnum[]
  }

  /**
   * Pool.gameRecords
   */
  export type Pool$gameRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    where?: GameRecordWhereInput
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    cursor?: GameRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * Pool without action
   */
  export type PoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
  }


  /**
   * Model GameRecord
   */

  export type AggregateGameRecord = {
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  export type GameRecordAvgAggregateOutputType = {
    gameId: number | null
    poolId: number | null
    team1Kills: number | null
    team2Kills: number | null
    team1Gold: number | null
    team2Gold: number | null
  }

  export type GameRecordSumAggregateOutputType = {
    gameId: bigint | null
    poolId: bigint | null
    team1Kills: number | null
    team2Kills: number | null
    team1Gold: number | null
    team2Gold: number | null
  }

  export type GameRecordMinAggregateOutputType = {
    gameId: bigint | null
    creatorId: string | null
    poolId: bigint | null
    team1Won: boolean | null
    team1Kills: number | null
    team2Kills: number | null
    team1Gold: number | null
    team2Gold: number | null
    isApplied: boolean | null
    createdAt: Date | null
  }

  export type GameRecordMaxAggregateOutputType = {
    gameId: bigint | null
    creatorId: string | null
    poolId: bigint | null
    team1Won: boolean | null
    team1Kills: number | null
    team2Kills: number | null
    team1Gold: number | null
    team2Gold: number | null
    isApplied: boolean | null
    createdAt: Date | null
  }

  export type GameRecordCountAggregateOutputType = {
    gameId: number
    creatorId: number
    poolId: number
    team1Won: number
    team1Kills: number
    team2Kills: number
    team1Gold: number
    team2Gold: number
    isApplied: number
    createdAt: number
    _all: number
  }


  export type GameRecordAvgAggregateInputType = {
    gameId?: true
    poolId?: true
    team1Kills?: true
    team2Kills?: true
    team1Gold?: true
    team2Gold?: true
  }

  export type GameRecordSumAggregateInputType = {
    gameId?: true
    poolId?: true
    team1Kills?: true
    team2Kills?: true
    team1Gold?: true
    team2Gold?: true
  }

  export type GameRecordMinAggregateInputType = {
    gameId?: true
    creatorId?: true
    poolId?: true
    team1Won?: true
    team1Kills?: true
    team2Kills?: true
    team1Gold?: true
    team2Gold?: true
    isApplied?: true
    createdAt?: true
  }

  export type GameRecordMaxAggregateInputType = {
    gameId?: true
    creatorId?: true
    poolId?: true
    team1Won?: true
    team1Kills?: true
    team2Kills?: true
    team1Gold?: true
    team2Gold?: true
    isApplied?: true
    createdAt?: true
  }

  export type GameRecordCountAggregateInputType = {
    gameId?: true
    creatorId?: true
    poolId?: true
    team1Won?: true
    team1Kills?: true
    team2Kills?: true
    team1Gold?: true
    team2Gold?: true
    isApplied?: true
    createdAt?: true
    _all?: true
  }

  export type GameRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecord to aggregate.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameRecords
    **/
    _count?: true | GameRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameRecordMaxAggregateInputType
  }

  export type GetGameRecordAggregateType<T extends GameRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateGameRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameRecord[P]>
      : GetScalarType<T[P], AggregateGameRecord[P]>
  }




  export type GameRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameRecordWhereInput
    orderBy?: GameRecordOrderByWithAggregationInput | GameRecordOrderByWithAggregationInput[]
    by: GameRecordScalarFieldEnum[] | GameRecordScalarFieldEnum
    having?: GameRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameRecordCountAggregateInputType | true
    _avg?: GameRecordAvgAggregateInputType
    _sum?: GameRecordSumAggregateInputType
    _min?: GameRecordMinAggregateInputType
    _max?: GameRecordMaxAggregateInputType
  }

  export type GameRecordGroupByOutputType = {
    gameId: bigint
    creatorId: string
    poolId: bigint
    team1Won: boolean
    team1Kills: number
    team2Kills: number
    team1Gold: number
    team2Gold: number
    isApplied: boolean
    createdAt: Date
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  type GetGameRecordGroupByPayload<T extends GameRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
            : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
        }
      >
    >


  export type GameRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gameId?: boolean
    creatorId?: boolean
    poolId?: boolean
    team1Won?: boolean
    team1Kills?: boolean
    team2Kills?: boolean
    team1Gold?: boolean
    team2Gold?: boolean
    isApplied?: boolean
    createdAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    userRecords?: boolean | GameRecord$userRecordsArgs<ExtArgs>
    _count?: boolean | GameRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gameId?: boolean
    creatorId?: boolean
    poolId?: boolean
    team1Won?: boolean
    team1Kills?: boolean
    team2Kills?: boolean
    team1Gold?: boolean
    team2Gold?: boolean
    isApplied?: boolean
    createdAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gameId?: boolean
    creatorId?: boolean
    poolId?: boolean
    team1Won?: boolean
    team1Kills?: boolean
    team2Kills?: boolean
    team1Gold?: boolean
    team2Gold?: boolean
    isApplied?: boolean
    createdAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectScalar = {
    gameId?: boolean
    creatorId?: boolean
    poolId?: boolean
    team1Won?: boolean
    team1Kills?: boolean
    team2Kills?: boolean
    team1Gold?: boolean
    team2Gold?: boolean
    isApplied?: boolean
    createdAt?: boolean
  }

  export type GameRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"gameId" | "creatorId" | "poolId" | "team1Won" | "team1Kills" | "team2Kills" | "team1Gold" | "team2Gold" | "isApplied" | "createdAt", ExtArgs["result"]["gameRecord"]>
  export type GameRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    userRecords?: boolean | GameRecord$userRecordsArgs<ExtArgs>
    _count?: boolean | GameRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type GameRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }

  export type $GameRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameRecord"
    objects: {
      pool: Prisma.$PoolPayload<ExtArgs>
      userRecords: Prisma.$UserGameRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      gameId: bigint
      creatorId: string
      poolId: bigint
      team1Won: boolean
      team1Kills: number
      team2Kills: number
      team1Gold: number
      team2Gold: number
      isApplied: boolean
      createdAt: Date
    }, ExtArgs["result"]["gameRecord"]>
    composites: {}
  }

  type GameRecordGetPayload<S extends boolean | null | undefined | GameRecordDefaultArgs> = $Result.GetResult<Prisma.$GameRecordPayload, S>

  type GameRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameRecordCountAggregateInputType | true
    }

  export interface GameRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameRecord'], meta: { name: 'GameRecord' } }
    /**
     * Find zero or one GameRecord that matches the filter.
     * @param {GameRecordFindUniqueArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameRecordFindUniqueArgs>(args: SelectSubset<T, GameRecordFindUniqueArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameRecordFindUniqueOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, GameRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameRecordFindFirstArgs>(args?: SelectSubset<T, GameRecordFindFirstArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, GameRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameRecords
     * const gameRecords = await prisma.gameRecord.findMany()
     * 
     * // Get first 10 GameRecords
     * const gameRecords = await prisma.gameRecord.findMany({ take: 10 })
     * 
     * // Only select the `gameId`
     * const gameRecordWithGameIdOnly = await prisma.gameRecord.findMany({ select: { gameId: true } })
     * 
     */
    findMany<T extends GameRecordFindManyArgs>(args?: SelectSubset<T, GameRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameRecord.
     * @param {GameRecordCreateArgs} args - Arguments to create a GameRecord.
     * @example
     * // Create one GameRecord
     * const GameRecord = await prisma.gameRecord.create({
     *   data: {
     *     // ... data to create a GameRecord
     *   }
     * })
     * 
     */
    create<T extends GameRecordCreateArgs>(args: SelectSubset<T, GameRecordCreateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameRecords.
     * @param {GameRecordCreateManyArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameRecordCreateManyArgs>(args?: SelectSubset<T, GameRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameRecords and returns the data saved in the database.
     * @param {GameRecordCreateManyAndReturnArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameRecords and only return the `gameId`
     * const gameRecordWithGameIdOnly = await prisma.gameRecord.createManyAndReturn({
     *   select: { gameId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, GameRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameRecord.
     * @param {GameRecordDeleteArgs} args - Arguments to delete one GameRecord.
     * @example
     * // Delete one GameRecord
     * const GameRecord = await prisma.gameRecord.delete({
     *   where: {
     *     // ... filter to delete one GameRecord
     *   }
     * })
     * 
     */
    delete<T extends GameRecordDeleteArgs>(args: SelectSubset<T, GameRecordDeleteArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameRecord.
     * @param {GameRecordUpdateArgs} args - Arguments to update one GameRecord.
     * @example
     * // Update one GameRecord
     * const gameRecord = await prisma.gameRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameRecordUpdateArgs>(args: SelectSubset<T, GameRecordUpdateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameRecords.
     * @param {GameRecordDeleteManyArgs} args - Arguments to filter GameRecords to delete.
     * @example
     * // Delete a few GameRecords
     * const { count } = await prisma.gameRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameRecordDeleteManyArgs>(args?: SelectSubset<T, GameRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameRecords
     * const gameRecord = await prisma.gameRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameRecordUpdateManyArgs>(args: SelectSubset<T, GameRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRecords and returns the data updated in the database.
     * @param {GameRecordUpdateManyAndReturnArgs} args - Arguments to update many GameRecords.
     * @example
     * // Update many GameRecords
     * const gameRecord = await prisma.gameRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameRecords and only return the `gameId`
     * const gameRecordWithGameIdOnly = await prisma.gameRecord.updateManyAndReturn({
     *   select: { gameId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, GameRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameRecord.
     * @param {GameRecordUpsertArgs} args - Arguments to update or create a GameRecord.
     * @example
     * // Update or create a GameRecord
     * const gameRecord = await prisma.gameRecord.upsert({
     *   create: {
     *     // ... data to create a GameRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameRecord we want to update
     *   }
     * })
     */
    upsert<T extends GameRecordUpsertArgs>(args: SelectSubset<T, GameRecordUpsertArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordCountArgs} args - Arguments to filter GameRecords to count.
     * @example
     * // Count the number of GameRecords
     * const count = await prisma.gameRecord.count({
     *   where: {
     *     // ... the filter for the GameRecords we want to count
     *   }
     * })
    **/
    count<T extends GameRecordCountArgs>(
      args?: Subset<T, GameRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameRecordAggregateArgs>(args: Subset<T, GameRecordAggregateArgs>): Prisma.PrismaPromise<GetGameRecordAggregateType<T>>

    /**
     * Group by GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameRecordGroupByArgs['orderBy'] }
        : { orderBy?: GameRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameRecord model
   */
  readonly fields: GameRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pool<T extends PoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoolDefaultArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userRecords<T extends GameRecord$userRecordsArgs<ExtArgs> = {}>(args?: Subset<T, GameRecord$userRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameRecord model
   */
  interface GameRecordFieldRefs {
    readonly gameId: FieldRef<"GameRecord", 'BigInt'>
    readonly creatorId: FieldRef<"GameRecord", 'String'>
    readonly poolId: FieldRef<"GameRecord", 'BigInt'>
    readonly team1Won: FieldRef<"GameRecord", 'Boolean'>
    readonly team1Kills: FieldRef<"GameRecord", 'Int'>
    readonly team2Kills: FieldRef<"GameRecord", 'Int'>
    readonly team1Gold: FieldRef<"GameRecord", 'Int'>
    readonly team2Gold: FieldRef<"GameRecord", 'Int'>
    readonly isApplied: FieldRef<"GameRecord", 'Boolean'>
    readonly createdAt: FieldRef<"GameRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameRecord findUnique
   */
  export type GameRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findUniqueOrThrow
   */
  export type GameRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findFirst
   */
  export type GameRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findFirstOrThrow
   */
  export type GameRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findMany
   */
  export type GameRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter, which GameRecords to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord create
   */
  export type GameRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a GameRecord.
     */
    data: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
  }

  /**
   * GameRecord createMany
   */
  export type GameRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRecord createManyAndReturn
   */
  export type GameRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameRecord update
   */
  export type GameRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a GameRecord.
     */
    data: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
    /**
     * Choose, which GameRecord to update.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord updateMany
   */
  export type GameRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameRecords.
     */
    data: XOR<GameRecordUpdateManyMutationInput, GameRecordUncheckedUpdateManyInput>
    /**
     * Filter which GameRecords to update
     */
    where?: GameRecordWhereInput
    /**
     * Limit how many GameRecords to update.
     */
    limit?: number
  }

  /**
   * GameRecord updateManyAndReturn
   */
  export type GameRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * The data used to update GameRecords.
     */
    data: XOR<GameRecordUpdateManyMutationInput, GameRecordUncheckedUpdateManyInput>
    /**
     * Filter which GameRecords to update
     */
    where?: GameRecordWhereInput
    /**
     * Limit how many GameRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameRecord upsert
   */
  export type GameRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the GameRecord to update in case it exists.
     */
    where: GameRecordWhereUniqueInput
    /**
     * In case the GameRecord found by the `where` argument doesn't exist, create a new GameRecord with this data.
     */
    create: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
    /**
     * In case the GameRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
  }

  /**
   * GameRecord delete
   */
  export type GameRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
    /**
     * Filter which GameRecord to delete.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord deleteMany
   */
  export type GameRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecords to delete
     */
    where?: GameRecordWhereInput
    /**
     * Limit how many GameRecords to delete.
     */
    limit?: number
  }

  /**
   * GameRecord.userRecords
   */
  export type GameRecord$userRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    where?: UserGameRecordWhereInput
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    cursor?: UserGameRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGameRecordScalarFieldEnum | UserGameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord without action
   */
  export type GameRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRecord
     */
    omit?: GameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRecordInclude<ExtArgs> | null
  }


  /**
   * Model UserGameRecord
   */

  export type AggregateUserGameRecord = {
    _count: UserGameRecordCountAggregateOutputType | null
    _avg: UserGameRecordAvgAggregateOutputType | null
    _sum: UserGameRecordSumAggregateOutputType | null
    _min: UserGameRecordMinAggregateOutputType | null
    _max: UserGameRecordMaxAggregateOutputType | null
  }

  export type UserGameRecordAvgAggregateOutputType = {
    recordId: number | null
    gameId: number | null
    teamNumber: number | null
    kills: number | null
    deaths: number | null
    assists: number | null
    cs: number | null
  }

  export type UserGameRecordSumAggregateOutputType = {
    recordId: bigint | null
    gameId: bigint | null
    teamNumber: number | null
    kills: number | null
    deaths: number | null
    assists: number | null
    cs: number | null
  }

  export type UserGameRecordMinAggregateOutputType = {
    recordId: bigint | null
    gameId: bigint | null
    userId: string | null
    teamNumber: number | null
    assignedPosition: string | null
    kills: number | null
    deaths: number | null
    assists: number | null
    cs: number | null
  }

  export type UserGameRecordMaxAggregateOutputType = {
    recordId: bigint | null
    gameId: bigint | null
    userId: string | null
    teamNumber: number | null
    assignedPosition: string | null
    kills: number | null
    deaths: number | null
    assists: number | null
    cs: number | null
  }

  export type UserGameRecordCountAggregateOutputType = {
    recordId: number
    gameId: number
    userId: number
    teamNumber: number
    assignedPosition: number
    kills: number
    deaths: number
    assists: number
    cs: number
    _all: number
  }


  export type UserGameRecordAvgAggregateInputType = {
    recordId?: true
    gameId?: true
    teamNumber?: true
    kills?: true
    deaths?: true
    assists?: true
    cs?: true
  }

  export type UserGameRecordSumAggregateInputType = {
    recordId?: true
    gameId?: true
    teamNumber?: true
    kills?: true
    deaths?: true
    assists?: true
    cs?: true
  }

  export type UserGameRecordMinAggregateInputType = {
    recordId?: true
    gameId?: true
    userId?: true
    teamNumber?: true
    assignedPosition?: true
    kills?: true
    deaths?: true
    assists?: true
    cs?: true
  }

  export type UserGameRecordMaxAggregateInputType = {
    recordId?: true
    gameId?: true
    userId?: true
    teamNumber?: true
    assignedPosition?: true
    kills?: true
    deaths?: true
    assists?: true
    cs?: true
  }

  export type UserGameRecordCountAggregateInputType = {
    recordId?: true
    gameId?: true
    userId?: true
    teamNumber?: true
    assignedPosition?: true
    kills?: true
    deaths?: true
    assists?: true
    cs?: true
    _all?: true
  }

  export type UserGameRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGameRecord to aggregate.
     */
    where?: UserGameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGameRecords to fetch.
     */
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGameRecords
    **/
    _count?: true | UserGameRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserGameRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserGameRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGameRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGameRecordMaxAggregateInputType
  }

  export type GetUserGameRecordAggregateType<T extends UserGameRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGameRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGameRecord[P]>
      : GetScalarType<T[P], AggregateUserGameRecord[P]>
  }




  export type UserGameRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGameRecordWhereInput
    orderBy?: UserGameRecordOrderByWithAggregationInput | UserGameRecordOrderByWithAggregationInput[]
    by: UserGameRecordScalarFieldEnum[] | UserGameRecordScalarFieldEnum
    having?: UserGameRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGameRecordCountAggregateInputType | true
    _avg?: UserGameRecordAvgAggregateInputType
    _sum?: UserGameRecordSumAggregateInputType
    _min?: UserGameRecordMinAggregateInputType
    _max?: UserGameRecordMaxAggregateInputType
  }

  export type UserGameRecordGroupByOutputType = {
    recordId: bigint
    gameId: bigint
    userId: string
    teamNumber: number
    assignedPosition: string
    kills: number
    deaths: number
    assists: number
    cs: number
    _count: UserGameRecordCountAggregateOutputType | null
    _avg: UserGameRecordAvgAggregateOutputType | null
    _sum: UserGameRecordSumAggregateOutputType | null
    _min: UserGameRecordMinAggregateOutputType | null
    _max: UserGameRecordMaxAggregateOutputType | null
  }

  type GetUserGameRecordGroupByPayload<T extends UserGameRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGameRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGameRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGameRecordGroupByOutputType[P]>
            : GetScalarType<T[P], UserGameRecordGroupByOutputType[P]>
        }
      >
    >


  export type UserGameRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recordId?: boolean
    gameId?: boolean
    userId?: boolean
    teamNumber?: boolean
    assignedPosition?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    cs?: boolean
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGameRecord"]>

  export type UserGameRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recordId?: boolean
    gameId?: boolean
    userId?: boolean
    teamNumber?: boolean
    assignedPosition?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    cs?: boolean
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGameRecord"]>

  export type UserGameRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    recordId?: boolean
    gameId?: boolean
    userId?: boolean
    teamNumber?: boolean
    assignedPosition?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    cs?: boolean
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGameRecord"]>

  export type UserGameRecordSelectScalar = {
    recordId?: boolean
    gameId?: boolean
    userId?: boolean
    teamNumber?: boolean
    assignedPosition?: boolean
    kills?: boolean
    deaths?: boolean
    assists?: boolean
    cs?: boolean
  }

  export type UserGameRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"recordId" | "gameId" | "userId" | "teamNumber" | "assignedPosition" | "kills" | "deaths" | "assists" | "cs", ExtArgs["result"]["userGameRecord"]>
  export type UserGameRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGameRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGameRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gameRecord?: boolean | GameRecordDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserGameRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGameRecord"
    objects: {
      gameRecord: Prisma.$GameRecordPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      recordId: bigint
      gameId: bigint
      userId: string
      teamNumber: number
      assignedPosition: string
      kills: number
      deaths: number
      assists: number
      cs: number
    }, ExtArgs["result"]["userGameRecord"]>
    composites: {}
  }

  type UserGameRecordGetPayload<S extends boolean | null | undefined | UserGameRecordDefaultArgs> = $Result.GetResult<Prisma.$UserGameRecordPayload, S>

  type UserGameRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGameRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGameRecordCountAggregateInputType | true
    }

  export interface UserGameRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGameRecord'], meta: { name: 'UserGameRecord' } }
    /**
     * Find zero or one UserGameRecord that matches the filter.
     * @param {UserGameRecordFindUniqueArgs} args - Arguments to find a UserGameRecord
     * @example
     * // Get one UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGameRecordFindUniqueArgs>(args: SelectSubset<T, UserGameRecordFindUniqueArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGameRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGameRecordFindUniqueOrThrowArgs} args - Arguments to find a UserGameRecord
     * @example
     * // Get one UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGameRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGameRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGameRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordFindFirstArgs} args - Arguments to find a UserGameRecord
     * @example
     * // Get one UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGameRecordFindFirstArgs>(args?: SelectSubset<T, UserGameRecordFindFirstArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGameRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordFindFirstOrThrowArgs} args - Arguments to find a UserGameRecord
     * @example
     * // Get one UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGameRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGameRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGameRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGameRecords
     * const userGameRecords = await prisma.userGameRecord.findMany()
     * 
     * // Get first 10 UserGameRecords
     * const userGameRecords = await prisma.userGameRecord.findMany({ take: 10 })
     * 
     * // Only select the `recordId`
     * const userGameRecordWithRecordIdOnly = await prisma.userGameRecord.findMany({ select: { recordId: true } })
     * 
     */
    findMany<T extends UserGameRecordFindManyArgs>(args?: SelectSubset<T, UserGameRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGameRecord.
     * @param {UserGameRecordCreateArgs} args - Arguments to create a UserGameRecord.
     * @example
     * // Create one UserGameRecord
     * const UserGameRecord = await prisma.userGameRecord.create({
     *   data: {
     *     // ... data to create a UserGameRecord
     *   }
     * })
     * 
     */
    create<T extends UserGameRecordCreateArgs>(args: SelectSubset<T, UserGameRecordCreateArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGameRecords.
     * @param {UserGameRecordCreateManyArgs} args - Arguments to create many UserGameRecords.
     * @example
     * // Create many UserGameRecords
     * const userGameRecord = await prisma.userGameRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGameRecordCreateManyArgs>(args?: SelectSubset<T, UserGameRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGameRecords and returns the data saved in the database.
     * @param {UserGameRecordCreateManyAndReturnArgs} args - Arguments to create many UserGameRecords.
     * @example
     * // Create many UserGameRecords
     * const userGameRecord = await prisma.userGameRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGameRecords and only return the `recordId`
     * const userGameRecordWithRecordIdOnly = await prisma.userGameRecord.createManyAndReturn({
     *   select: { recordId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGameRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGameRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGameRecord.
     * @param {UserGameRecordDeleteArgs} args - Arguments to delete one UserGameRecord.
     * @example
     * // Delete one UserGameRecord
     * const UserGameRecord = await prisma.userGameRecord.delete({
     *   where: {
     *     // ... filter to delete one UserGameRecord
     *   }
     * })
     * 
     */
    delete<T extends UserGameRecordDeleteArgs>(args: SelectSubset<T, UserGameRecordDeleteArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGameRecord.
     * @param {UserGameRecordUpdateArgs} args - Arguments to update one UserGameRecord.
     * @example
     * // Update one UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGameRecordUpdateArgs>(args: SelectSubset<T, UserGameRecordUpdateArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGameRecords.
     * @param {UserGameRecordDeleteManyArgs} args - Arguments to filter UserGameRecords to delete.
     * @example
     * // Delete a few UserGameRecords
     * const { count } = await prisma.userGameRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGameRecordDeleteManyArgs>(args?: SelectSubset<T, UserGameRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGameRecords
     * const userGameRecord = await prisma.userGameRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGameRecordUpdateManyArgs>(args: SelectSubset<T, UserGameRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGameRecords and returns the data updated in the database.
     * @param {UserGameRecordUpdateManyAndReturnArgs} args - Arguments to update many UserGameRecords.
     * @example
     * // Update many UserGameRecords
     * const userGameRecord = await prisma.userGameRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGameRecords and only return the `recordId`
     * const userGameRecordWithRecordIdOnly = await prisma.userGameRecord.updateManyAndReturn({
     *   select: { recordId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGameRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGameRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGameRecord.
     * @param {UserGameRecordUpsertArgs} args - Arguments to update or create a UserGameRecord.
     * @example
     * // Update or create a UserGameRecord
     * const userGameRecord = await prisma.userGameRecord.upsert({
     *   create: {
     *     // ... data to create a UserGameRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGameRecord we want to update
     *   }
     * })
     */
    upsert<T extends UserGameRecordUpsertArgs>(args: SelectSubset<T, UserGameRecordUpsertArgs<ExtArgs>>): Prisma__UserGameRecordClient<$Result.GetResult<Prisma.$UserGameRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordCountArgs} args - Arguments to filter UserGameRecords to count.
     * @example
     * // Count the number of UserGameRecords
     * const count = await prisma.userGameRecord.count({
     *   where: {
     *     // ... the filter for the UserGameRecords we want to count
     *   }
     * })
    **/
    count<T extends UserGameRecordCountArgs>(
      args?: Subset<T, UserGameRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGameRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGameRecordAggregateArgs>(args: Subset<T, UserGameRecordAggregateArgs>): Prisma.PrismaPromise<GetUserGameRecordAggregateType<T>>

    /**
     * Group by UserGameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGameRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGameRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGameRecordGroupByArgs['orderBy'] }
        : { orderBy?: UserGameRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGameRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGameRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGameRecord model
   */
  readonly fields: UserGameRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGameRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGameRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gameRecord<T extends GameRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameRecordDefaultArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGameRecord model
   */
  interface UserGameRecordFieldRefs {
    readonly recordId: FieldRef<"UserGameRecord", 'BigInt'>
    readonly gameId: FieldRef<"UserGameRecord", 'BigInt'>
    readonly userId: FieldRef<"UserGameRecord", 'String'>
    readonly teamNumber: FieldRef<"UserGameRecord", 'Int'>
    readonly assignedPosition: FieldRef<"UserGameRecord", 'String'>
    readonly kills: FieldRef<"UserGameRecord", 'Int'>
    readonly deaths: FieldRef<"UserGameRecord", 'Int'>
    readonly assists: FieldRef<"UserGameRecord", 'Int'>
    readonly cs: FieldRef<"UserGameRecord", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserGameRecord findUnique
   */
  export type UserGameRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter, which UserGameRecord to fetch.
     */
    where: UserGameRecordWhereUniqueInput
  }

  /**
   * UserGameRecord findUniqueOrThrow
   */
  export type UserGameRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter, which UserGameRecord to fetch.
     */
    where: UserGameRecordWhereUniqueInput
  }

  /**
   * UserGameRecord findFirst
   */
  export type UserGameRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter, which UserGameRecord to fetch.
     */
    where?: UserGameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGameRecords to fetch.
     */
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGameRecords.
     */
    cursor?: UserGameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGameRecords.
     */
    distinct?: UserGameRecordScalarFieldEnum | UserGameRecordScalarFieldEnum[]
  }

  /**
   * UserGameRecord findFirstOrThrow
   */
  export type UserGameRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter, which UserGameRecord to fetch.
     */
    where?: UserGameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGameRecords to fetch.
     */
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGameRecords.
     */
    cursor?: UserGameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGameRecords.
     */
    distinct?: UserGameRecordScalarFieldEnum | UserGameRecordScalarFieldEnum[]
  }

  /**
   * UserGameRecord findMany
   */
  export type UserGameRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter, which UserGameRecords to fetch.
     */
    where?: UserGameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGameRecords to fetch.
     */
    orderBy?: UserGameRecordOrderByWithRelationInput | UserGameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGameRecords.
     */
    cursor?: UserGameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGameRecords.
     */
    skip?: number
    distinct?: UserGameRecordScalarFieldEnum | UserGameRecordScalarFieldEnum[]
  }

  /**
   * UserGameRecord create
   */
  export type UserGameRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGameRecord.
     */
    data: XOR<UserGameRecordCreateInput, UserGameRecordUncheckedCreateInput>
  }

  /**
   * UserGameRecord createMany
   */
  export type UserGameRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGameRecords.
     */
    data: UserGameRecordCreateManyInput | UserGameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGameRecord createManyAndReturn
   */
  export type UserGameRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * The data used to create many UserGameRecords.
     */
    data: UserGameRecordCreateManyInput | UserGameRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGameRecord update
   */
  export type UserGameRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGameRecord.
     */
    data: XOR<UserGameRecordUpdateInput, UserGameRecordUncheckedUpdateInput>
    /**
     * Choose, which UserGameRecord to update.
     */
    where: UserGameRecordWhereUniqueInput
  }

  /**
   * UserGameRecord updateMany
   */
  export type UserGameRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGameRecords.
     */
    data: XOR<UserGameRecordUpdateManyMutationInput, UserGameRecordUncheckedUpdateManyInput>
    /**
     * Filter which UserGameRecords to update
     */
    where?: UserGameRecordWhereInput
    /**
     * Limit how many UserGameRecords to update.
     */
    limit?: number
  }

  /**
   * UserGameRecord updateManyAndReturn
   */
  export type UserGameRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * The data used to update UserGameRecords.
     */
    data: XOR<UserGameRecordUpdateManyMutationInput, UserGameRecordUncheckedUpdateManyInput>
    /**
     * Filter which UserGameRecords to update
     */
    where?: UserGameRecordWhereInput
    /**
     * Limit how many UserGameRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGameRecord upsert
   */
  export type UserGameRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGameRecord to update in case it exists.
     */
    where: UserGameRecordWhereUniqueInput
    /**
     * In case the UserGameRecord found by the `where` argument doesn't exist, create a new UserGameRecord with this data.
     */
    create: XOR<UserGameRecordCreateInput, UserGameRecordUncheckedCreateInput>
    /**
     * In case the UserGameRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGameRecordUpdateInput, UserGameRecordUncheckedUpdateInput>
  }

  /**
   * UserGameRecord delete
   */
  export type UserGameRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
    /**
     * Filter which UserGameRecord to delete.
     */
    where: UserGameRecordWhereUniqueInput
  }

  /**
   * UserGameRecord deleteMany
   */
  export type UserGameRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGameRecords to delete
     */
    where?: UserGameRecordWhereInput
    /**
     * Limit how many UserGameRecords to delete.
     */
    limit?: number
  }

  /**
   * UserGameRecord without action
   */
  export type UserGameRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGameRecord
     */
    select?: UserGameRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGameRecord
     */
    omit?: UserGameRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGameRecordInclude<ExtArgs> | null
  }


  /**
   * Model PoolMember
   */

  export type AggregatePoolMember = {
    _count: PoolMemberCountAggregateOutputType | null
    _avg: PoolMemberAvgAggregateOutputType | null
    _sum: PoolMemberSumAggregateOutputType | null
    _min: PoolMemberMinAggregateOutputType | null
    _max: PoolMemberMaxAggregateOutputType | null
  }

  export type PoolMemberAvgAggregateOutputType = {
    poolId: number | null
  }

  export type PoolMemberSumAggregateOutputType = {
    poolId: bigint | null
  }

  export type PoolMemberMinAggregateOutputType = {
    poolId: bigint | null
    userId: string | null
  }

  export type PoolMemberMaxAggregateOutputType = {
    poolId: bigint | null
    userId: string | null
  }

  export type PoolMemberCountAggregateOutputType = {
    poolId: number
    userId: number
    _all: number
  }


  export type PoolMemberAvgAggregateInputType = {
    poolId?: true
  }

  export type PoolMemberSumAggregateInputType = {
    poolId?: true
  }

  export type PoolMemberMinAggregateInputType = {
    poolId?: true
    userId?: true
  }

  export type PoolMemberMaxAggregateInputType = {
    poolId?: true
    userId?: true
  }

  export type PoolMemberCountAggregateInputType = {
    poolId?: true
    userId?: true
    _all?: true
  }

  export type PoolMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoolMember to aggregate.
     */
    where?: PoolMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoolMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PoolMembers
    **/
    _count?: true | PoolMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolMemberMaxAggregateInputType
  }

  export type GetPoolMemberAggregateType<T extends PoolMemberAggregateArgs> = {
        [P in keyof T & keyof AggregatePoolMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoolMember[P]>
      : GetScalarType<T[P], AggregatePoolMember[P]>
  }




  export type PoolMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolMemberWhereInput
    orderBy?: PoolMemberOrderByWithAggregationInput | PoolMemberOrderByWithAggregationInput[]
    by: PoolMemberScalarFieldEnum[] | PoolMemberScalarFieldEnum
    having?: PoolMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolMemberCountAggregateInputType | true
    _avg?: PoolMemberAvgAggregateInputType
    _sum?: PoolMemberSumAggregateInputType
    _min?: PoolMemberMinAggregateInputType
    _max?: PoolMemberMaxAggregateInputType
  }

  export type PoolMemberGroupByOutputType = {
    poolId: bigint
    userId: string
    _count: PoolMemberCountAggregateOutputType | null
    _avg: PoolMemberAvgAggregateOutputType | null
    _sum: PoolMemberSumAggregateOutputType | null
    _min: PoolMemberMinAggregateOutputType | null
    _max: PoolMemberMaxAggregateOutputType | null
  }

  type GetPoolMemberGroupByPayload<T extends PoolMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolMemberGroupByOutputType[P]>
            : GetScalarType<T[P], PoolMemberGroupByOutputType[P]>
        }
      >
    >


  export type PoolMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    userId?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolMember"]>

  export type PoolMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    userId?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolMember"]>

  export type PoolMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    poolId?: boolean
    userId?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolMember"]>

  export type PoolMemberSelectScalar = {
    poolId?: boolean
    userId?: boolean
  }

  export type PoolMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"poolId" | "userId", ExtArgs["result"]["poolMember"]>
  export type PoolMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PoolMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PoolMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PoolMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PoolMember"
    objects: {
      pool: Prisma.$PoolPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      poolId: bigint
      userId: string
    }, ExtArgs["result"]["poolMember"]>
    composites: {}
  }

  type PoolMemberGetPayload<S extends boolean | null | undefined | PoolMemberDefaultArgs> = $Result.GetResult<Prisma.$PoolMemberPayload, S>

  type PoolMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoolMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolMemberCountAggregateInputType | true
    }

  export interface PoolMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PoolMember'], meta: { name: 'PoolMember' } }
    /**
     * Find zero or one PoolMember that matches the filter.
     * @param {PoolMemberFindUniqueArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoolMemberFindUniqueArgs>(args: SelectSubset<T, PoolMemberFindUniqueArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PoolMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoolMemberFindUniqueOrThrowArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoolMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, PoolMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindFirstArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoolMemberFindFirstArgs>(args?: SelectSubset<T, PoolMemberFindFirstArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindFirstOrThrowArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoolMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, PoolMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PoolMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PoolMembers
     * const poolMembers = await prisma.poolMember.findMany()
     * 
     * // Get first 10 PoolMembers
     * const poolMembers = await prisma.poolMember.findMany({ take: 10 })
     * 
     * // Only select the `poolId`
     * const poolMemberWithPoolIdOnly = await prisma.poolMember.findMany({ select: { poolId: true } })
     * 
     */
    findMany<T extends PoolMemberFindManyArgs>(args?: SelectSubset<T, PoolMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PoolMember.
     * @param {PoolMemberCreateArgs} args - Arguments to create a PoolMember.
     * @example
     * // Create one PoolMember
     * const PoolMember = await prisma.poolMember.create({
     *   data: {
     *     // ... data to create a PoolMember
     *   }
     * })
     * 
     */
    create<T extends PoolMemberCreateArgs>(args: SelectSubset<T, PoolMemberCreateArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PoolMembers.
     * @param {PoolMemberCreateManyArgs} args - Arguments to create many PoolMembers.
     * @example
     * // Create many PoolMembers
     * const poolMember = await prisma.poolMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoolMemberCreateManyArgs>(args?: SelectSubset<T, PoolMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PoolMembers and returns the data saved in the database.
     * @param {PoolMemberCreateManyAndReturnArgs} args - Arguments to create many PoolMembers.
     * @example
     * // Create many PoolMembers
     * const poolMember = await prisma.poolMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PoolMembers and only return the `poolId`
     * const poolMemberWithPoolIdOnly = await prisma.poolMember.createManyAndReturn({
     *   select: { poolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoolMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, PoolMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PoolMember.
     * @param {PoolMemberDeleteArgs} args - Arguments to delete one PoolMember.
     * @example
     * // Delete one PoolMember
     * const PoolMember = await prisma.poolMember.delete({
     *   where: {
     *     // ... filter to delete one PoolMember
     *   }
     * })
     * 
     */
    delete<T extends PoolMemberDeleteArgs>(args: SelectSubset<T, PoolMemberDeleteArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PoolMember.
     * @param {PoolMemberUpdateArgs} args - Arguments to update one PoolMember.
     * @example
     * // Update one PoolMember
     * const poolMember = await prisma.poolMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoolMemberUpdateArgs>(args: SelectSubset<T, PoolMemberUpdateArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PoolMembers.
     * @param {PoolMemberDeleteManyArgs} args - Arguments to filter PoolMembers to delete.
     * @example
     * // Delete a few PoolMembers
     * const { count } = await prisma.poolMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoolMemberDeleteManyArgs>(args?: SelectSubset<T, PoolMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PoolMembers
     * const poolMember = await prisma.poolMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoolMemberUpdateManyArgs>(args: SelectSubset<T, PoolMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolMembers and returns the data updated in the database.
     * @param {PoolMemberUpdateManyAndReturnArgs} args - Arguments to update many PoolMembers.
     * @example
     * // Update many PoolMembers
     * const poolMember = await prisma.poolMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PoolMembers and only return the `poolId`
     * const poolMemberWithPoolIdOnly = await prisma.poolMember.updateManyAndReturn({
     *   select: { poolId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoolMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, PoolMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PoolMember.
     * @param {PoolMemberUpsertArgs} args - Arguments to update or create a PoolMember.
     * @example
     * // Update or create a PoolMember
     * const poolMember = await prisma.poolMember.upsert({
     *   create: {
     *     // ... data to create a PoolMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PoolMember we want to update
     *   }
     * })
     */
    upsert<T extends PoolMemberUpsertArgs>(args: SelectSubset<T, PoolMemberUpsertArgs<ExtArgs>>): Prisma__PoolMemberClient<$Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PoolMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberCountArgs} args - Arguments to filter PoolMembers to count.
     * @example
     * // Count the number of PoolMembers
     * const count = await prisma.poolMember.count({
     *   where: {
     *     // ... the filter for the PoolMembers we want to count
     *   }
     * })
    **/
    count<T extends PoolMemberCountArgs>(
      args?: Subset<T, PoolMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PoolMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoolMemberAggregateArgs>(args: Subset<T, PoolMemberAggregateArgs>): Prisma.PrismaPromise<GetPoolMemberAggregateType<T>>

    /**
     * Group by PoolMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoolMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoolMemberGroupByArgs['orderBy'] }
        : { orderBy?: PoolMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoolMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PoolMember model
   */
  readonly fields: PoolMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PoolMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoolMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pool<T extends PoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoolDefaultArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PoolMember model
   */
  interface PoolMemberFieldRefs {
    readonly poolId: FieldRef<"PoolMember", 'BigInt'>
    readonly userId: FieldRef<"PoolMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PoolMember findUnique
   */
  export type PoolMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter, which PoolMember to fetch.
     */
    where: PoolMemberWhereUniqueInput
  }

  /**
   * PoolMember findUniqueOrThrow
   */
  export type PoolMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter, which PoolMember to fetch.
     */
    where: PoolMemberWhereUniqueInput
  }

  /**
   * PoolMember findFirst
   */
  export type PoolMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter, which PoolMember to fetch.
     */
    where?: PoolMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoolMembers.
     */
    cursor?: PoolMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoolMembers.
     */
    distinct?: PoolMemberScalarFieldEnum | PoolMemberScalarFieldEnum[]
  }

  /**
   * PoolMember findFirstOrThrow
   */
  export type PoolMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter, which PoolMember to fetch.
     */
    where?: PoolMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoolMembers.
     */
    cursor?: PoolMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoolMembers.
     */
    distinct?: PoolMemberScalarFieldEnum | PoolMemberScalarFieldEnum[]
  }

  /**
   * PoolMember findMany
   */
  export type PoolMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter, which PoolMembers to fetch.
     */
    where?: PoolMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: PoolMemberOrderByWithRelationInput | PoolMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PoolMembers.
     */
    cursor?: PoolMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolMembers.
     */
    skip?: number
    distinct?: PoolMemberScalarFieldEnum | PoolMemberScalarFieldEnum[]
  }

  /**
   * PoolMember create
   */
  export type PoolMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a PoolMember.
     */
    data: XOR<PoolMemberCreateInput, PoolMemberUncheckedCreateInput>
  }

  /**
   * PoolMember createMany
   */
  export type PoolMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PoolMembers.
     */
    data: PoolMemberCreateManyInput | PoolMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PoolMember createManyAndReturn
   */
  export type PoolMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * The data used to create many PoolMembers.
     */
    data: PoolMemberCreateManyInput | PoolMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PoolMember update
   */
  export type PoolMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a PoolMember.
     */
    data: XOR<PoolMemberUpdateInput, PoolMemberUncheckedUpdateInput>
    /**
     * Choose, which PoolMember to update.
     */
    where: PoolMemberWhereUniqueInput
  }

  /**
   * PoolMember updateMany
   */
  export type PoolMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PoolMembers.
     */
    data: XOR<PoolMemberUpdateManyMutationInput, PoolMemberUncheckedUpdateManyInput>
    /**
     * Filter which PoolMembers to update
     */
    where?: PoolMemberWhereInput
    /**
     * Limit how many PoolMembers to update.
     */
    limit?: number
  }

  /**
   * PoolMember updateManyAndReturn
   */
  export type PoolMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * The data used to update PoolMembers.
     */
    data: XOR<PoolMemberUpdateManyMutationInput, PoolMemberUncheckedUpdateManyInput>
    /**
     * Filter which PoolMembers to update
     */
    where?: PoolMemberWhereInput
    /**
     * Limit how many PoolMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PoolMember upsert
   */
  export type PoolMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the PoolMember to update in case it exists.
     */
    where: PoolMemberWhereUniqueInput
    /**
     * In case the PoolMember found by the `where` argument doesn't exist, create a new PoolMember with this data.
     */
    create: XOR<PoolMemberCreateInput, PoolMemberUncheckedCreateInput>
    /**
     * In case the PoolMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoolMemberUpdateInput, PoolMemberUncheckedUpdateInput>
  }

  /**
   * PoolMember delete
   */
  export type PoolMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
    /**
     * Filter which PoolMember to delete.
     */
    where: PoolMemberWhereUniqueInput
  }

  /**
   * PoolMember deleteMany
   */
  export type PoolMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoolMembers to delete
     */
    where?: PoolMemberWhereInput
    /**
     * Limit how many PoolMembers to delete.
     */
    limit?: number
  }

  /**
   * PoolMember without action
   */
  export type PoolMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: PoolMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: PoolMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolMemberInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    name: 'name',
    lolId: 'lolId',
    mainLane: 'mainLane',
    subLane: 'subLane',
    score: 'score',
    winLossStreak: 'winLossStreak',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PoolScalarFieldEnum: {
    poolId: 'poolId',
    ownerId: 'ownerId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type PoolScalarFieldEnum = (typeof PoolScalarFieldEnum)[keyof typeof PoolScalarFieldEnum]


  export const GameRecordScalarFieldEnum: {
    gameId: 'gameId',
    creatorId: 'creatorId',
    poolId: 'poolId',
    team1Won: 'team1Won',
    team1Kills: 'team1Kills',
    team2Kills: 'team2Kills',
    team1Gold: 'team1Gold',
    team2Gold: 'team2Gold',
    isApplied: 'isApplied',
    createdAt: 'createdAt'
  };

  export type GameRecordScalarFieldEnum = (typeof GameRecordScalarFieldEnum)[keyof typeof GameRecordScalarFieldEnum]


  export const UserGameRecordScalarFieldEnum: {
    recordId: 'recordId',
    gameId: 'gameId',
    userId: 'userId',
    teamNumber: 'teamNumber',
    assignedPosition: 'assignedPosition',
    kills: 'kills',
    deaths: 'deaths',
    assists: 'assists',
    cs: 'cs'
  };

  export type UserGameRecordScalarFieldEnum = (typeof UserGameRecordScalarFieldEnum)[keyof typeof UserGameRecordScalarFieldEnum]


  export const PoolMemberScalarFieldEnum: {
    poolId: 'poolId',
    userId: 'userId'
  };

  export type PoolMemberScalarFieldEnum = (typeof PoolMemberScalarFieldEnum)[keyof typeof PoolMemberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    lolId?: StringNullableFilter<"User"> | string | null
    mainLane?: StringNullableFilter<"User"> | string | null
    subLane?: StringNullableFilter<"User"> | string | null
    score?: IntFilter<"User"> | number
    winLossStreak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    ownedPools?: PoolListRelationFilter
    poolMemberships?: PoolMemberListRelationFilter
    gameRecords?: UserGameRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    lolId?: SortOrderInput | SortOrder
    mainLane?: SortOrderInput | SortOrder
    subLane?: SortOrderInput | SortOrder
    score?: SortOrder
    winLossStreak?: SortOrder
    createdAt?: SortOrder
    ownedPools?: PoolOrderByRelationAggregateInput
    poolMemberships?: PoolMemberOrderByRelationAggregateInput
    gameRecords?: UserGameRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    lolId?: StringNullableFilter<"User"> | string | null
    mainLane?: StringNullableFilter<"User"> | string | null
    subLane?: StringNullableFilter<"User"> | string | null
    score?: IntFilter<"User"> | number
    winLossStreak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    ownedPools?: PoolListRelationFilter
    poolMemberships?: PoolMemberListRelationFilter
    gameRecords?: UserGameRecordListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    lolId?: SortOrderInput | SortOrder
    mainLane?: SortOrderInput | SortOrder
    subLane?: SortOrderInput | SortOrder
    score?: SortOrder
    winLossStreak?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    lolId?: StringNullableWithAggregatesFilter<"User"> | string | null
    mainLane?: StringNullableWithAggregatesFilter<"User"> | string | null
    subLane?: StringNullableWithAggregatesFilter<"User"> | string | null
    score?: IntWithAggregatesFilter<"User"> | number
    winLossStreak?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PoolWhereInput = {
    AND?: PoolWhereInput | PoolWhereInput[]
    OR?: PoolWhereInput[]
    NOT?: PoolWhereInput | PoolWhereInput[]
    poolId?: BigIntFilter<"Pool"> | bigint | number
    ownerId?: UuidFilter<"Pool"> | string
    name?: StringFilter<"Pool"> | string
    createdAt?: DateTimeFilter<"Pool"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: PoolMemberListRelationFilter
    gameRecords?: GameRecordListRelationFilter
  }

  export type PoolOrderByWithRelationInput = {
    poolId?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    memberships?: PoolMemberOrderByRelationAggregateInput
    gameRecords?: GameRecordOrderByRelationAggregateInput
  }

  export type PoolWhereUniqueInput = Prisma.AtLeast<{
    poolId?: bigint | number
    AND?: PoolWhereInput | PoolWhereInput[]
    OR?: PoolWhereInput[]
    NOT?: PoolWhereInput | PoolWhereInput[]
    ownerId?: UuidFilter<"Pool"> | string
    name?: StringFilter<"Pool"> | string
    createdAt?: DateTimeFilter<"Pool"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: PoolMemberListRelationFilter
    gameRecords?: GameRecordListRelationFilter
  }, "poolId">

  export type PoolOrderByWithAggregationInput = {
    poolId?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: PoolCountOrderByAggregateInput
    _avg?: PoolAvgOrderByAggregateInput
    _max?: PoolMaxOrderByAggregateInput
    _min?: PoolMinOrderByAggregateInput
    _sum?: PoolSumOrderByAggregateInput
  }

  export type PoolScalarWhereWithAggregatesInput = {
    AND?: PoolScalarWhereWithAggregatesInput | PoolScalarWhereWithAggregatesInput[]
    OR?: PoolScalarWhereWithAggregatesInput[]
    NOT?: PoolScalarWhereWithAggregatesInput | PoolScalarWhereWithAggregatesInput[]
    poolId?: BigIntWithAggregatesFilter<"Pool"> | bigint | number
    ownerId?: UuidWithAggregatesFilter<"Pool"> | string
    name?: StringWithAggregatesFilter<"Pool"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pool"> | Date | string
  }

  export type GameRecordWhereInput = {
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    gameId?: BigIntFilter<"GameRecord"> | bigint | number
    creatorId?: UuidFilter<"GameRecord"> | string
    poolId?: BigIntFilter<"GameRecord"> | bigint | number
    team1Won?: BoolFilter<"GameRecord"> | boolean
    team1Kills?: IntFilter<"GameRecord"> | number
    team2Kills?: IntFilter<"GameRecord"> | number
    team1Gold?: IntFilter<"GameRecord"> | number
    team2Gold?: IntFilter<"GameRecord"> | number
    isApplied?: BoolFilter<"GameRecord"> | boolean
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
    userRecords?: UserGameRecordListRelationFilter
  }

  export type GameRecordOrderByWithRelationInput = {
    gameId?: SortOrder
    creatorId?: SortOrder
    poolId?: SortOrder
    team1Won?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
    isApplied?: SortOrder
    createdAt?: SortOrder
    pool?: PoolOrderByWithRelationInput
    userRecords?: UserGameRecordOrderByRelationAggregateInput
  }

  export type GameRecordWhereUniqueInput = Prisma.AtLeast<{
    gameId?: bigint | number
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    creatorId?: UuidFilter<"GameRecord"> | string
    poolId?: BigIntFilter<"GameRecord"> | bigint | number
    team1Won?: BoolFilter<"GameRecord"> | boolean
    team1Kills?: IntFilter<"GameRecord"> | number
    team2Kills?: IntFilter<"GameRecord"> | number
    team1Gold?: IntFilter<"GameRecord"> | number
    team2Gold?: IntFilter<"GameRecord"> | number
    isApplied?: BoolFilter<"GameRecord"> | boolean
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
    userRecords?: UserGameRecordListRelationFilter
  }, "gameId">

  export type GameRecordOrderByWithAggregationInput = {
    gameId?: SortOrder
    creatorId?: SortOrder
    poolId?: SortOrder
    team1Won?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
    isApplied?: SortOrder
    createdAt?: SortOrder
    _count?: GameRecordCountOrderByAggregateInput
    _avg?: GameRecordAvgOrderByAggregateInput
    _max?: GameRecordMaxOrderByAggregateInput
    _min?: GameRecordMinOrderByAggregateInput
    _sum?: GameRecordSumOrderByAggregateInput
  }

  export type GameRecordScalarWhereWithAggregatesInput = {
    AND?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    OR?: GameRecordScalarWhereWithAggregatesInput[]
    NOT?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    gameId?: BigIntWithAggregatesFilter<"GameRecord"> | bigint | number
    creatorId?: UuidWithAggregatesFilter<"GameRecord"> | string
    poolId?: BigIntWithAggregatesFilter<"GameRecord"> | bigint | number
    team1Won?: BoolWithAggregatesFilter<"GameRecord"> | boolean
    team1Kills?: IntWithAggregatesFilter<"GameRecord"> | number
    team2Kills?: IntWithAggregatesFilter<"GameRecord"> | number
    team1Gold?: IntWithAggregatesFilter<"GameRecord"> | number
    team2Gold?: IntWithAggregatesFilter<"GameRecord"> | number
    isApplied?: BoolWithAggregatesFilter<"GameRecord"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"GameRecord"> | Date | string
  }

  export type UserGameRecordWhereInput = {
    AND?: UserGameRecordWhereInput | UserGameRecordWhereInput[]
    OR?: UserGameRecordWhereInput[]
    NOT?: UserGameRecordWhereInput | UserGameRecordWhereInput[]
    recordId?: BigIntFilter<"UserGameRecord"> | bigint | number
    gameId?: BigIntFilter<"UserGameRecord"> | bigint | number
    userId?: UuidFilter<"UserGameRecord"> | string
    teamNumber?: IntFilter<"UserGameRecord"> | number
    assignedPosition?: StringFilter<"UserGameRecord"> | string
    kills?: IntFilter<"UserGameRecord"> | number
    deaths?: IntFilter<"UserGameRecord"> | number
    assists?: IntFilter<"UserGameRecord"> | number
    cs?: IntFilter<"UserGameRecord"> | number
    gameRecord?: XOR<GameRecordScalarRelationFilter, GameRecordWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserGameRecordOrderByWithRelationInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    teamNumber?: SortOrder
    assignedPosition?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
    gameRecord?: GameRecordOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserGameRecordWhereUniqueInput = Prisma.AtLeast<{
    recordId?: bigint | number
    AND?: UserGameRecordWhereInput | UserGameRecordWhereInput[]
    OR?: UserGameRecordWhereInput[]
    NOT?: UserGameRecordWhereInput | UserGameRecordWhereInput[]
    gameId?: BigIntFilter<"UserGameRecord"> | bigint | number
    userId?: UuidFilter<"UserGameRecord"> | string
    teamNumber?: IntFilter<"UserGameRecord"> | number
    assignedPosition?: StringFilter<"UserGameRecord"> | string
    kills?: IntFilter<"UserGameRecord"> | number
    deaths?: IntFilter<"UserGameRecord"> | number
    assists?: IntFilter<"UserGameRecord"> | number
    cs?: IntFilter<"UserGameRecord"> | number
    gameRecord?: XOR<GameRecordScalarRelationFilter, GameRecordWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "recordId">

  export type UserGameRecordOrderByWithAggregationInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    teamNumber?: SortOrder
    assignedPosition?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
    _count?: UserGameRecordCountOrderByAggregateInput
    _avg?: UserGameRecordAvgOrderByAggregateInput
    _max?: UserGameRecordMaxOrderByAggregateInput
    _min?: UserGameRecordMinOrderByAggregateInput
    _sum?: UserGameRecordSumOrderByAggregateInput
  }

  export type UserGameRecordScalarWhereWithAggregatesInput = {
    AND?: UserGameRecordScalarWhereWithAggregatesInput | UserGameRecordScalarWhereWithAggregatesInput[]
    OR?: UserGameRecordScalarWhereWithAggregatesInput[]
    NOT?: UserGameRecordScalarWhereWithAggregatesInput | UserGameRecordScalarWhereWithAggregatesInput[]
    recordId?: BigIntWithAggregatesFilter<"UserGameRecord"> | bigint | number
    gameId?: BigIntWithAggregatesFilter<"UserGameRecord"> | bigint | number
    userId?: UuidWithAggregatesFilter<"UserGameRecord"> | string
    teamNumber?: IntWithAggregatesFilter<"UserGameRecord"> | number
    assignedPosition?: StringWithAggregatesFilter<"UserGameRecord"> | string
    kills?: IntWithAggregatesFilter<"UserGameRecord"> | number
    deaths?: IntWithAggregatesFilter<"UserGameRecord"> | number
    assists?: IntWithAggregatesFilter<"UserGameRecord"> | number
    cs?: IntWithAggregatesFilter<"UserGameRecord"> | number
  }

  export type PoolMemberWhereInput = {
    AND?: PoolMemberWhereInput | PoolMemberWhereInput[]
    OR?: PoolMemberWhereInput[]
    NOT?: PoolMemberWhereInput | PoolMemberWhereInput[]
    poolId?: BigIntFilter<"PoolMember"> | bigint | number
    userId?: UuidFilter<"PoolMember"> | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PoolMemberOrderByWithRelationInput = {
    poolId?: SortOrder
    userId?: SortOrder
    pool?: PoolOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PoolMemberWhereUniqueInput = Prisma.AtLeast<{
    poolId_userId?: PoolMemberPoolIdUserIdCompoundUniqueInput
    AND?: PoolMemberWhereInput | PoolMemberWhereInput[]
    OR?: PoolMemberWhereInput[]
    NOT?: PoolMemberWhereInput | PoolMemberWhereInput[]
    poolId?: BigIntFilter<"PoolMember"> | bigint | number
    userId?: UuidFilter<"PoolMember"> | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "poolId_userId">

  export type PoolMemberOrderByWithAggregationInput = {
    poolId?: SortOrder
    userId?: SortOrder
    _count?: PoolMemberCountOrderByAggregateInput
    _avg?: PoolMemberAvgOrderByAggregateInput
    _max?: PoolMemberMaxOrderByAggregateInput
    _min?: PoolMemberMinOrderByAggregateInput
    _sum?: PoolMemberSumOrderByAggregateInput
  }

  export type PoolMemberScalarWhereWithAggregatesInput = {
    AND?: PoolMemberScalarWhereWithAggregatesInput | PoolMemberScalarWhereWithAggregatesInput[]
    OR?: PoolMemberScalarWhereWithAggregatesInput[]
    NOT?: PoolMemberScalarWhereWithAggregatesInput | PoolMemberScalarWhereWithAggregatesInput[]
    poolId?: BigIntWithAggregatesFilter<"PoolMember"> | bigint | number
    userId?: UuidWithAggregatesFilter<"PoolMember"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolCreateNestedManyWithoutOwnerInput
    poolMemberships?: PoolMemberCreateNestedManyWithoutUserInput
    gameRecords?: UserGameRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolUncheckedCreateNestedManyWithoutOwnerInput
    poolMemberships?: PoolMemberUncheckedCreateNestedManyWithoutUserInput
    gameRecords?: UserGameRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUpdateManyWithoutOwnerNestedInput
    poolMemberships?: PoolMemberUpdateManyWithoutUserNestedInput
    gameRecords?: UserGameRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUncheckedUpdateManyWithoutOwnerNestedInput
    poolMemberships?: PoolMemberUncheckedUpdateManyWithoutUserNestedInput
    gameRecords?: UserGameRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolCreateInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedPoolsInput
    memberships?: PoolMemberCreateNestedManyWithoutPoolInput
    gameRecords?: GameRecordCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateInput = {
    poolId?: bigint | number
    ownerId: string
    name: string
    createdAt?: Date | string
    memberships?: PoolMemberUncheckedCreateNestedManyWithoutPoolInput
    gameRecords?: GameRecordUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolUpdateInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedPoolsNestedInput
    memberships?: PoolMemberUpdateManyWithoutPoolNestedInput
    gameRecords?: GameRecordUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: PoolMemberUncheckedUpdateManyWithoutPoolNestedInput
    gameRecords?: GameRecordUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type PoolCreateManyInput = {
    poolId?: bigint | number
    ownerId: string
    name: string
    createdAt?: Date | string
  }

  export type PoolUpdateManyMutationInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolUncheckedUpdateManyInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordCreateInput = {
    gameId?: bigint | number
    creatorId: string
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
    pool: PoolCreateNestedOneWithoutGameRecordsInput
    userRecords?: UserGameRecordCreateNestedManyWithoutGameRecordInput
  }

  export type GameRecordUncheckedCreateInput = {
    gameId?: bigint | number
    creatorId: string
    poolId: bigint | number
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
    userRecords?: UserGameRecordUncheckedCreateNestedManyWithoutGameRecordInput
  }

  export type GameRecordUpdateInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pool?: PoolUpdateOneRequiredWithoutGameRecordsNestedInput
    userRecords?: UserGameRecordUpdateManyWithoutGameRecordNestedInput
  }

  export type GameRecordUncheckedUpdateInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRecords?: UserGameRecordUncheckedUpdateManyWithoutGameRecordNestedInput
  }

  export type GameRecordCreateManyInput = {
    gameId?: bigint | number
    creatorId: string
    poolId: bigint | number
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
  }

  export type GameRecordUpdateManyMutationInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordUncheckedUpdateManyInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameRecordCreateInput = {
    recordId?: bigint | number
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
    gameRecord: GameRecordCreateNestedOneWithoutUserRecordsInput
    user: UserCreateNestedOneWithoutGameRecordsInput
  }

  export type UserGameRecordUncheckedCreateInput = {
    recordId?: bigint | number
    gameId: bigint | number
    userId: string
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type UserGameRecordUpdateInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
    gameRecord?: GameRecordUpdateOneRequiredWithoutUserRecordsNestedInput
    user?: UserUpdateOneRequiredWithoutGameRecordsNestedInput
  }

  export type UserGameRecordUncheckedUpdateInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type UserGameRecordCreateManyInput = {
    recordId?: bigint | number
    gameId: bigint | number
    userId: string
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type UserGameRecordUpdateManyMutationInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type UserGameRecordUncheckedUpdateManyInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type PoolMemberCreateInput = {
    pool: PoolCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutPoolMembershipsInput
  }

  export type PoolMemberUncheckedCreateInput = {
    poolId: bigint | number
    userId: string
  }

  export type PoolMemberUpdateInput = {
    pool?: PoolUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutPoolMembershipsNestedInput
  }

  export type PoolMemberUncheckedUpdateInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PoolMemberCreateManyInput = {
    poolId: bigint | number
    userId: string
  }

  export type PoolMemberUpdateManyMutationInput = {

  }

  export type PoolMemberUncheckedUpdateManyInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PoolListRelationFilter = {
    every?: PoolWhereInput
    some?: PoolWhereInput
    none?: PoolWhereInput
  }

  export type PoolMemberListRelationFilter = {
    every?: PoolMemberWhereInput
    some?: PoolMemberWhereInput
    none?: PoolMemberWhereInput
  }

  export type UserGameRecordListRelationFilter = {
    every?: UserGameRecordWhereInput
    some?: UserGameRecordWhereInput
    none?: UserGameRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoolMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGameRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    lolId?: SortOrder
    mainLane?: SortOrder
    subLane?: SortOrder
    score?: SortOrder
    winLossStreak?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    score?: SortOrder
    winLossStreak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    lolId?: SortOrder
    mainLane?: SortOrder
    subLane?: SortOrder
    score?: SortOrder
    winLossStreak?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    lolId?: SortOrder
    mainLane?: SortOrder
    subLane?: SortOrder
    score?: SortOrder
    winLossStreak?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    score?: SortOrder
    winLossStreak?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GameRecordListRelationFilter = {
    every?: GameRecordWhereInput
    some?: GameRecordWhereInput
    none?: GameRecordWhereInput
  }

  export type GameRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoolCountOrderByAggregateInput = {
    poolId?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PoolAvgOrderByAggregateInput = {
    poolId?: SortOrder
  }

  export type PoolMaxOrderByAggregateInput = {
    poolId?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PoolMinOrderByAggregateInput = {
    poolId?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PoolSumOrderByAggregateInput = {
    poolId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PoolScalarRelationFilter = {
    is?: PoolWhereInput
    isNot?: PoolWhereInput
  }

  export type GameRecordCountOrderByAggregateInput = {
    gameId?: SortOrder
    creatorId?: SortOrder
    poolId?: SortOrder
    team1Won?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
    isApplied?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordAvgOrderByAggregateInput = {
    gameId?: SortOrder
    poolId?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
  }

  export type GameRecordMaxOrderByAggregateInput = {
    gameId?: SortOrder
    creatorId?: SortOrder
    poolId?: SortOrder
    team1Won?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
    isApplied?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordMinOrderByAggregateInput = {
    gameId?: SortOrder
    creatorId?: SortOrder
    poolId?: SortOrder
    team1Won?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
    isApplied?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordSumOrderByAggregateInput = {
    gameId?: SortOrder
    poolId?: SortOrder
    team1Kills?: SortOrder
    team2Kills?: SortOrder
    team1Gold?: SortOrder
    team2Gold?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GameRecordScalarRelationFilter = {
    is?: GameRecordWhereInput
    isNot?: GameRecordWhereInput
  }

  export type UserGameRecordCountOrderByAggregateInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    teamNumber?: SortOrder
    assignedPosition?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
  }

  export type UserGameRecordAvgOrderByAggregateInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    teamNumber?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
  }

  export type UserGameRecordMaxOrderByAggregateInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    teamNumber?: SortOrder
    assignedPosition?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
  }

  export type UserGameRecordMinOrderByAggregateInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    teamNumber?: SortOrder
    assignedPosition?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
  }

  export type UserGameRecordSumOrderByAggregateInput = {
    recordId?: SortOrder
    gameId?: SortOrder
    teamNumber?: SortOrder
    kills?: SortOrder
    deaths?: SortOrder
    assists?: SortOrder
    cs?: SortOrder
  }

  export type PoolMemberPoolIdUserIdCompoundUniqueInput = {
    poolId: bigint | number
    userId: string
  }

  export type PoolMemberCountOrderByAggregateInput = {
    poolId?: SortOrder
    userId?: SortOrder
  }

  export type PoolMemberAvgOrderByAggregateInput = {
    poolId?: SortOrder
  }

  export type PoolMemberMaxOrderByAggregateInput = {
    poolId?: SortOrder
    userId?: SortOrder
  }

  export type PoolMemberMinOrderByAggregateInput = {
    poolId?: SortOrder
    userId?: SortOrder
  }

  export type PoolMemberSumOrderByAggregateInput = {
    poolId?: SortOrder
  }

  export type PoolCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput> | PoolCreateWithoutOwnerInput[] | PoolUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutOwnerInput | PoolCreateOrConnectWithoutOwnerInput[]
    createMany?: PoolCreateManyOwnerInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type PoolMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput> | PoolMemberCreateWithoutUserInput[] | PoolMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutUserInput | PoolMemberCreateOrConnectWithoutUserInput[]
    createMany?: PoolMemberCreateManyUserInputEnvelope
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
  }

  export type UserGameRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput> | UserGameRecordCreateWithoutUserInput[] | UserGameRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutUserInput | UserGameRecordCreateOrConnectWithoutUserInput[]
    createMany?: UserGameRecordCreateManyUserInputEnvelope
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
  }

  export type PoolUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput> | PoolCreateWithoutOwnerInput[] | PoolUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutOwnerInput | PoolCreateOrConnectWithoutOwnerInput[]
    createMany?: PoolCreateManyOwnerInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type PoolMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput> | PoolMemberCreateWithoutUserInput[] | PoolMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutUserInput | PoolMemberCreateOrConnectWithoutUserInput[]
    createMany?: PoolMemberCreateManyUserInputEnvelope
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
  }

  export type UserGameRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput> | UserGameRecordCreateWithoutUserInput[] | UserGameRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutUserInput | UserGameRecordCreateOrConnectWithoutUserInput[]
    createMany?: UserGameRecordCreateManyUserInputEnvelope
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PoolUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput> | PoolCreateWithoutOwnerInput[] | PoolUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutOwnerInput | PoolCreateOrConnectWithoutOwnerInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutOwnerInput | PoolUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PoolCreateManyOwnerInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutOwnerInput | PoolUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutOwnerInput | PoolUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type PoolMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput> | PoolMemberCreateWithoutUserInput[] | PoolMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutUserInput | PoolMemberCreateOrConnectWithoutUserInput[]
    upsert?: PoolMemberUpsertWithWhereUniqueWithoutUserInput | PoolMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PoolMemberCreateManyUserInputEnvelope
    set?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    disconnect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    delete?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    update?: PoolMemberUpdateWithWhereUniqueWithoutUserInput | PoolMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PoolMemberUpdateManyWithWhereWithoutUserInput | PoolMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
  }

  export type UserGameRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput> | UserGameRecordCreateWithoutUserInput[] | UserGameRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutUserInput | UserGameRecordCreateOrConnectWithoutUserInput[]
    upsert?: UserGameRecordUpsertWithWhereUniqueWithoutUserInput | UserGameRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGameRecordCreateManyUserInputEnvelope
    set?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    disconnect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    delete?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    update?: UserGameRecordUpdateWithWhereUniqueWithoutUserInput | UserGameRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGameRecordUpdateManyWithWhereWithoutUserInput | UserGameRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
  }

  export type PoolUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput> | PoolCreateWithoutOwnerInput[] | PoolUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutOwnerInput | PoolCreateOrConnectWithoutOwnerInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutOwnerInput | PoolUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PoolCreateManyOwnerInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutOwnerInput | PoolUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutOwnerInput | PoolUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type PoolMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput> | PoolMemberCreateWithoutUserInput[] | PoolMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutUserInput | PoolMemberCreateOrConnectWithoutUserInput[]
    upsert?: PoolMemberUpsertWithWhereUniqueWithoutUserInput | PoolMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PoolMemberCreateManyUserInputEnvelope
    set?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    disconnect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    delete?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    update?: PoolMemberUpdateWithWhereUniqueWithoutUserInput | PoolMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PoolMemberUpdateManyWithWhereWithoutUserInput | PoolMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
  }

  export type UserGameRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput> | UserGameRecordCreateWithoutUserInput[] | UserGameRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutUserInput | UserGameRecordCreateOrConnectWithoutUserInput[]
    upsert?: UserGameRecordUpsertWithWhereUniqueWithoutUserInput | UserGameRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGameRecordCreateManyUserInputEnvelope
    set?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    disconnect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    delete?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    update?: UserGameRecordUpdateWithWhereUniqueWithoutUserInput | UserGameRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGameRecordUpdateManyWithWhereWithoutUserInput | UserGameRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedPoolsInput = {
    create?: XOR<UserCreateWithoutOwnedPoolsInput, UserUncheckedCreateWithoutOwnedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedPoolsInput
    connect?: UserWhereUniqueInput
  }

  export type PoolMemberCreateNestedManyWithoutPoolInput = {
    create?: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput> | PoolMemberCreateWithoutPoolInput[] | PoolMemberUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutPoolInput | PoolMemberCreateOrConnectWithoutPoolInput[]
    createMany?: PoolMemberCreateManyPoolInputEnvelope
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
  }

  export type GameRecordCreateNestedManyWithoutPoolInput = {
    create?: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput> | GameRecordCreateWithoutPoolInput[] | GameRecordUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: GameRecordCreateOrConnectWithoutPoolInput | GameRecordCreateOrConnectWithoutPoolInput[]
    createMany?: GameRecordCreateManyPoolInputEnvelope
    connect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
  }

  export type PoolMemberUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput> | PoolMemberCreateWithoutPoolInput[] | PoolMemberUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutPoolInput | PoolMemberCreateOrConnectWithoutPoolInput[]
    createMany?: PoolMemberCreateManyPoolInputEnvelope
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
  }

  export type GameRecordUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput> | GameRecordCreateWithoutPoolInput[] | GameRecordUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: GameRecordCreateOrConnectWithoutPoolInput | GameRecordCreateOrConnectWithoutPoolInput[]
    createMany?: GameRecordCreateManyPoolInputEnvelope
    connect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutOwnedPoolsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedPoolsInput, UserUncheckedCreateWithoutOwnedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedPoolsInput
    upsert?: UserUpsertWithoutOwnedPoolsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedPoolsInput, UserUpdateWithoutOwnedPoolsInput>, UserUncheckedUpdateWithoutOwnedPoolsInput>
  }

  export type PoolMemberUpdateManyWithoutPoolNestedInput = {
    create?: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput> | PoolMemberCreateWithoutPoolInput[] | PoolMemberUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutPoolInput | PoolMemberCreateOrConnectWithoutPoolInput[]
    upsert?: PoolMemberUpsertWithWhereUniqueWithoutPoolInput | PoolMemberUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: PoolMemberCreateManyPoolInputEnvelope
    set?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    disconnect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    delete?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    update?: PoolMemberUpdateWithWhereUniqueWithoutPoolInput | PoolMemberUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: PoolMemberUpdateManyWithWhereWithoutPoolInput | PoolMemberUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
  }

  export type GameRecordUpdateManyWithoutPoolNestedInput = {
    create?: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput> | GameRecordCreateWithoutPoolInput[] | GameRecordUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: GameRecordCreateOrConnectWithoutPoolInput | GameRecordCreateOrConnectWithoutPoolInput[]
    upsert?: GameRecordUpsertWithWhereUniqueWithoutPoolInput | GameRecordUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: GameRecordCreateManyPoolInputEnvelope
    set?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    disconnect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    delete?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    connect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    update?: GameRecordUpdateWithWhereUniqueWithoutPoolInput | GameRecordUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: GameRecordUpdateManyWithWhereWithoutPoolInput | GameRecordUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: GameRecordScalarWhereInput | GameRecordScalarWhereInput[]
  }

  export type PoolMemberUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput> | PoolMemberCreateWithoutPoolInput[] | PoolMemberUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolMemberCreateOrConnectWithoutPoolInput | PoolMemberCreateOrConnectWithoutPoolInput[]
    upsert?: PoolMemberUpsertWithWhereUniqueWithoutPoolInput | PoolMemberUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: PoolMemberCreateManyPoolInputEnvelope
    set?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    disconnect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    delete?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    connect?: PoolMemberWhereUniqueInput | PoolMemberWhereUniqueInput[]
    update?: PoolMemberUpdateWithWhereUniqueWithoutPoolInput | PoolMemberUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: PoolMemberUpdateManyWithWhereWithoutPoolInput | PoolMemberUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
  }

  export type GameRecordUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput> | GameRecordCreateWithoutPoolInput[] | GameRecordUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: GameRecordCreateOrConnectWithoutPoolInput | GameRecordCreateOrConnectWithoutPoolInput[]
    upsert?: GameRecordUpsertWithWhereUniqueWithoutPoolInput | GameRecordUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: GameRecordCreateManyPoolInputEnvelope
    set?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    disconnect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    delete?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    connect?: GameRecordWhereUniqueInput | GameRecordWhereUniqueInput[]
    update?: GameRecordUpdateWithWhereUniqueWithoutPoolInput | GameRecordUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: GameRecordUpdateManyWithWhereWithoutPoolInput | GameRecordUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: GameRecordScalarWhereInput | GameRecordScalarWhereInput[]
  }

  export type PoolCreateNestedOneWithoutGameRecordsInput = {
    create?: XOR<PoolCreateWithoutGameRecordsInput, PoolUncheckedCreateWithoutGameRecordsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutGameRecordsInput
    connect?: PoolWhereUniqueInput
  }

  export type UserGameRecordCreateNestedManyWithoutGameRecordInput = {
    create?: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput> | UserGameRecordCreateWithoutGameRecordInput[] | UserGameRecordUncheckedCreateWithoutGameRecordInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutGameRecordInput | UserGameRecordCreateOrConnectWithoutGameRecordInput[]
    createMany?: UserGameRecordCreateManyGameRecordInputEnvelope
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
  }

  export type UserGameRecordUncheckedCreateNestedManyWithoutGameRecordInput = {
    create?: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput> | UserGameRecordCreateWithoutGameRecordInput[] | UserGameRecordUncheckedCreateWithoutGameRecordInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutGameRecordInput | UserGameRecordCreateOrConnectWithoutGameRecordInput[]
    createMany?: UserGameRecordCreateManyGameRecordInputEnvelope
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PoolUpdateOneRequiredWithoutGameRecordsNestedInput = {
    create?: XOR<PoolCreateWithoutGameRecordsInput, PoolUncheckedCreateWithoutGameRecordsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutGameRecordsInput
    upsert?: PoolUpsertWithoutGameRecordsInput
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutGameRecordsInput, PoolUpdateWithoutGameRecordsInput>, PoolUncheckedUpdateWithoutGameRecordsInput>
  }

  export type UserGameRecordUpdateManyWithoutGameRecordNestedInput = {
    create?: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput> | UserGameRecordCreateWithoutGameRecordInput[] | UserGameRecordUncheckedCreateWithoutGameRecordInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutGameRecordInput | UserGameRecordCreateOrConnectWithoutGameRecordInput[]
    upsert?: UserGameRecordUpsertWithWhereUniqueWithoutGameRecordInput | UserGameRecordUpsertWithWhereUniqueWithoutGameRecordInput[]
    createMany?: UserGameRecordCreateManyGameRecordInputEnvelope
    set?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    disconnect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    delete?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    update?: UserGameRecordUpdateWithWhereUniqueWithoutGameRecordInput | UserGameRecordUpdateWithWhereUniqueWithoutGameRecordInput[]
    updateMany?: UserGameRecordUpdateManyWithWhereWithoutGameRecordInput | UserGameRecordUpdateManyWithWhereWithoutGameRecordInput[]
    deleteMany?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
  }

  export type UserGameRecordUncheckedUpdateManyWithoutGameRecordNestedInput = {
    create?: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput> | UserGameRecordCreateWithoutGameRecordInput[] | UserGameRecordUncheckedCreateWithoutGameRecordInput[]
    connectOrCreate?: UserGameRecordCreateOrConnectWithoutGameRecordInput | UserGameRecordCreateOrConnectWithoutGameRecordInput[]
    upsert?: UserGameRecordUpsertWithWhereUniqueWithoutGameRecordInput | UserGameRecordUpsertWithWhereUniqueWithoutGameRecordInput[]
    createMany?: UserGameRecordCreateManyGameRecordInputEnvelope
    set?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    disconnect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    delete?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    connect?: UserGameRecordWhereUniqueInput | UserGameRecordWhereUniqueInput[]
    update?: UserGameRecordUpdateWithWhereUniqueWithoutGameRecordInput | UserGameRecordUpdateWithWhereUniqueWithoutGameRecordInput[]
    updateMany?: UserGameRecordUpdateManyWithWhereWithoutGameRecordInput | UserGameRecordUpdateManyWithWhereWithoutGameRecordInput[]
    deleteMany?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
  }

  export type GameRecordCreateNestedOneWithoutUserRecordsInput = {
    create?: XOR<GameRecordCreateWithoutUserRecordsInput, GameRecordUncheckedCreateWithoutUserRecordsInput>
    connectOrCreate?: GameRecordCreateOrConnectWithoutUserRecordsInput
    connect?: GameRecordWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGameRecordsInput = {
    create?: XOR<UserCreateWithoutGameRecordsInput, UserUncheckedCreateWithoutGameRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type GameRecordUpdateOneRequiredWithoutUserRecordsNestedInput = {
    create?: XOR<GameRecordCreateWithoutUserRecordsInput, GameRecordUncheckedCreateWithoutUserRecordsInput>
    connectOrCreate?: GameRecordCreateOrConnectWithoutUserRecordsInput
    upsert?: GameRecordUpsertWithoutUserRecordsInput
    connect?: GameRecordWhereUniqueInput
    update?: XOR<XOR<GameRecordUpdateToOneWithWhereWithoutUserRecordsInput, GameRecordUpdateWithoutUserRecordsInput>, GameRecordUncheckedUpdateWithoutUserRecordsInput>
  }

  export type UserUpdateOneRequiredWithoutGameRecordsNestedInput = {
    create?: XOR<UserCreateWithoutGameRecordsInput, UserUncheckedCreateWithoutGameRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameRecordsInput
    upsert?: UserUpsertWithoutGameRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameRecordsInput, UserUpdateWithoutGameRecordsInput>, UserUncheckedUpdateWithoutGameRecordsInput>
  }

  export type PoolCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<PoolCreateWithoutMembershipsInput, PoolUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutMembershipsInput
    connect?: PoolWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPoolMembershipsInput = {
    create?: XOR<UserCreateWithoutPoolMembershipsInput, UserUncheckedCreateWithoutPoolMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPoolMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type PoolUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<PoolCreateWithoutMembershipsInput, PoolUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutMembershipsInput
    upsert?: PoolUpsertWithoutMembershipsInput
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutMembershipsInput, PoolUpdateWithoutMembershipsInput>, PoolUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateOneRequiredWithoutPoolMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutPoolMembershipsInput, UserUncheckedCreateWithoutPoolMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPoolMembershipsInput
    upsert?: UserUpsertWithoutPoolMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPoolMembershipsInput, UserUpdateWithoutPoolMembershipsInput>, UserUncheckedUpdateWithoutPoolMembershipsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PoolCreateWithoutOwnerInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
    memberships?: PoolMemberCreateNestedManyWithoutPoolInput
    gameRecords?: GameRecordCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutOwnerInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
    memberships?: PoolMemberUncheckedCreateNestedManyWithoutPoolInput
    gameRecords?: GameRecordUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutOwnerInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput>
  }

  export type PoolCreateManyOwnerInputEnvelope = {
    data: PoolCreateManyOwnerInput | PoolCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type PoolMemberCreateWithoutUserInput = {
    pool: PoolCreateNestedOneWithoutMembershipsInput
  }

  export type PoolMemberUncheckedCreateWithoutUserInput = {
    poolId: bigint | number
  }

  export type PoolMemberCreateOrConnectWithoutUserInput = {
    where: PoolMemberWhereUniqueInput
    create: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput>
  }

  export type PoolMemberCreateManyUserInputEnvelope = {
    data: PoolMemberCreateManyUserInput | PoolMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserGameRecordCreateWithoutUserInput = {
    recordId?: bigint | number
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
    gameRecord: GameRecordCreateNestedOneWithoutUserRecordsInput
  }

  export type UserGameRecordUncheckedCreateWithoutUserInput = {
    recordId?: bigint | number
    gameId: bigint | number
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type UserGameRecordCreateOrConnectWithoutUserInput = {
    where: UserGameRecordWhereUniqueInput
    create: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput>
  }

  export type UserGameRecordCreateManyUserInputEnvelope = {
    data: UserGameRecordCreateManyUserInput | UserGameRecordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PoolUpsertWithWhereUniqueWithoutOwnerInput = {
    where: PoolWhereUniqueInput
    update: XOR<PoolUpdateWithoutOwnerInput, PoolUncheckedUpdateWithoutOwnerInput>
    create: XOR<PoolCreateWithoutOwnerInput, PoolUncheckedCreateWithoutOwnerInput>
  }

  export type PoolUpdateWithWhereUniqueWithoutOwnerInput = {
    where: PoolWhereUniqueInput
    data: XOR<PoolUpdateWithoutOwnerInput, PoolUncheckedUpdateWithoutOwnerInput>
  }

  export type PoolUpdateManyWithWhereWithoutOwnerInput = {
    where: PoolScalarWhereInput
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyWithoutOwnerInput>
  }

  export type PoolScalarWhereInput = {
    AND?: PoolScalarWhereInput | PoolScalarWhereInput[]
    OR?: PoolScalarWhereInput[]
    NOT?: PoolScalarWhereInput | PoolScalarWhereInput[]
    poolId?: BigIntFilter<"Pool"> | bigint | number
    ownerId?: UuidFilter<"Pool"> | string
    name?: StringFilter<"Pool"> | string
    createdAt?: DateTimeFilter<"Pool"> | Date | string
  }

  export type PoolMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: PoolMemberWhereUniqueInput
    update: XOR<PoolMemberUpdateWithoutUserInput, PoolMemberUncheckedUpdateWithoutUserInput>
    create: XOR<PoolMemberCreateWithoutUserInput, PoolMemberUncheckedCreateWithoutUserInput>
  }

  export type PoolMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: PoolMemberWhereUniqueInput
    data: XOR<PoolMemberUpdateWithoutUserInput, PoolMemberUncheckedUpdateWithoutUserInput>
  }

  export type PoolMemberUpdateManyWithWhereWithoutUserInput = {
    where: PoolMemberScalarWhereInput
    data: XOR<PoolMemberUpdateManyMutationInput, PoolMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type PoolMemberScalarWhereInput = {
    AND?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
    OR?: PoolMemberScalarWhereInput[]
    NOT?: PoolMemberScalarWhereInput | PoolMemberScalarWhereInput[]
    poolId?: BigIntFilter<"PoolMember"> | bigint | number
    userId?: UuidFilter<"PoolMember"> | string
  }

  export type UserGameRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGameRecordWhereUniqueInput
    update: XOR<UserGameRecordUpdateWithoutUserInput, UserGameRecordUncheckedUpdateWithoutUserInput>
    create: XOR<UserGameRecordCreateWithoutUserInput, UserGameRecordUncheckedCreateWithoutUserInput>
  }

  export type UserGameRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGameRecordWhereUniqueInput
    data: XOR<UserGameRecordUpdateWithoutUserInput, UserGameRecordUncheckedUpdateWithoutUserInput>
  }

  export type UserGameRecordUpdateManyWithWhereWithoutUserInput = {
    where: UserGameRecordScalarWhereInput
    data: XOR<UserGameRecordUpdateManyMutationInput, UserGameRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGameRecordScalarWhereInput = {
    AND?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
    OR?: UserGameRecordScalarWhereInput[]
    NOT?: UserGameRecordScalarWhereInput | UserGameRecordScalarWhereInput[]
    recordId?: BigIntFilter<"UserGameRecord"> | bigint | number
    gameId?: BigIntFilter<"UserGameRecord"> | bigint | number
    userId?: UuidFilter<"UserGameRecord"> | string
    teamNumber?: IntFilter<"UserGameRecord"> | number
    assignedPosition?: StringFilter<"UserGameRecord"> | string
    kills?: IntFilter<"UserGameRecord"> | number
    deaths?: IntFilter<"UserGameRecord"> | number
    assists?: IntFilter<"UserGameRecord"> | number
    cs?: IntFilter<"UserGameRecord"> | number
  }

  export type UserCreateWithoutOwnedPoolsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    poolMemberships?: PoolMemberCreateNestedManyWithoutUserInput
    gameRecords?: UserGameRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedPoolsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    poolMemberships?: PoolMemberUncheckedCreateNestedManyWithoutUserInput
    gameRecords?: UserGameRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedPoolsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedPoolsInput, UserUncheckedCreateWithoutOwnedPoolsInput>
  }

  export type PoolMemberCreateWithoutPoolInput = {
    user: UserCreateNestedOneWithoutPoolMembershipsInput
  }

  export type PoolMemberUncheckedCreateWithoutPoolInput = {
    userId: string
  }

  export type PoolMemberCreateOrConnectWithoutPoolInput = {
    where: PoolMemberWhereUniqueInput
    create: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput>
  }

  export type PoolMemberCreateManyPoolInputEnvelope = {
    data: PoolMemberCreateManyPoolInput | PoolMemberCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type GameRecordCreateWithoutPoolInput = {
    gameId?: bigint | number
    creatorId: string
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
    userRecords?: UserGameRecordCreateNestedManyWithoutGameRecordInput
  }

  export type GameRecordUncheckedCreateWithoutPoolInput = {
    gameId?: bigint | number
    creatorId: string
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
    userRecords?: UserGameRecordUncheckedCreateNestedManyWithoutGameRecordInput
  }

  export type GameRecordCreateOrConnectWithoutPoolInput = {
    where: GameRecordWhereUniqueInput
    create: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput>
  }

  export type GameRecordCreateManyPoolInputEnvelope = {
    data: GameRecordCreateManyPoolInput | GameRecordCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedPoolsInput = {
    update: XOR<UserUpdateWithoutOwnedPoolsInput, UserUncheckedUpdateWithoutOwnedPoolsInput>
    create: XOR<UserCreateWithoutOwnedPoolsInput, UserUncheckedCreateWithoutOwnedPoolsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedPoolsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedPoolsInput, UserUncheckedUpdateWithoutOwnedPoolsInput>
  }

  export type UserUpdateWithoutOwnedPoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poolMemberships?: PoolMemberUpdateManyWithoutUserNestedInput
    gameRecords?: UserGameRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedPoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poolMemberships?: PoolMemberUncheckedUpdateManyWithoutUserNestedInput
    gameRecords?: UserGameRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolMemberUpsertWithWhereUniqueWithoutPoolInput = {
    where: PoolMemberWhereUniqueInput
    update: XOR<PoolMemberUpdateWithoutPoolInput, PoolMemberUncheckedUpdateWithoutPoolInput>
    create: XOR<PoolMemberCreateWithoutPoolInput, PoolMemberUncheckedCreateWithoutPoolInput>
  }

  export type PoolMemberUpdateWithWhereUniqueWithoutPoolInput = {
    where: PoolMemberWhereUniqueInput
    data: XOR<PoolMemberUpdateWithoutPoolInput, PoolMemberUncheckedUpdateWithoutPoolInput>
  }

  export type PoolMemberUpdateManyWithWhereWithoutPoolInput = {
    where: PoolMemberScalarWhereInput
    data: XOR<PoolMemberUpdateManyMutationInput, PoolMemberUncheckedUpdateManyWithoutPoolInput>
  }

  export type GameRecordUpsertWithWhereUniqueWithoutPoolInput = {
    where: GameRecordWhereUniqueInput
    update: XOR<GameRecordUpdateWithoutPoolInput, GameRecordUncheckedUpdateWithoutPoolInput>
    create: XOR<GameRecordCreateWithoutPoolInput, GameRecordUncheckedCreateWithoutPoolInput>
  }

  export type GameRecordUpdateWithWhereUniqueWithoutPoolInput = {
    where: GameRecordWhereUniqueInput
    data: XOR<GameRecordUpdateWithoutPoolInput, GameRecordUncheckedUpdateWithoutPoolInput>
  }

  export type GameRecordUpdateManyWithWhereWithoutPoolInput = {
    where: GameRecordScalarWhereInput
    data: XOR<GameRecordUpdateManyMutationInput, GameRecordUncheckedUpdateManyWithoutPoolInput>
  }

  export type GameRecordScalarWhereInput = {
    AND?: GameRecordScalarWhereInput | GameRecordScalarWhereInput[]
    OR?: GameRecordScalarWhereInput[]
    NOT?: GameRecordScalarWhereInput | GameRecordScalarWhereInput[]
    gameId?: BigIntFilter<"GameRecord"> | bigint | number
    creatorId?: UuidFilter<"GameRecord"> | string
    poolId?: BigIntFilter<"GameRecord"> | bigint | number
    team1Won?: BoolFilter<"GameRecord"> | boolean
    team1Kills?: IntFilter<"GameRecord"> | number
    team2Kills?: IntFilter<"GameRecord"> | number
    team1Gold?: IntFilter<"GameRecord"> | number
    team2Gold?: IntFilter<"GameRecord"> | number
    isApplied?: BoolFilter<"GameRecord"> | boolean
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
  }

  export type PoolCreateWithoutGameRecordsInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedPoolsInput
    memberships?: PoolMemberCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutGameRecordsInput = {
    poolId?: bigint | number
    ownerId: string
    name: string
    createdAt?: Date | string
    memberships?: PoolMemberUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutGameRecordsInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutGameRecordsInput, PoolUncheckedCreateWithoutGameRecordsInput>
  }

  export type UserGameRecordCreateWithoutGameRecordInput = {
    recordId?: bigint | number
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
    user: UserCreateNestedOneWithoutGameRecordsInput
  }

  export type UserGameRecordUncheckedCreateWithoutGameRecordInput = {
    recordId?: bigint | number
    userId: string
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type UserGameRecordCreateOrConnectWithoutGameRecordInput = {
    where: UserGameRecordWhereUniqueInput
    create: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput>
  }

  export type UserGameRecordCreateManyGameRecordInputEnvelope = {
    data: UserGameRecordCreateManyGameRecordInput | UserGameRecordCreateManyGameRecordInput[]
    skipDuplicates?: boolean
  }

  export type PoolUpsertWithoutGameRecordsInput = {
    update: XOR<PoolUpdateWithoutGameRecordsInput, PoolUncheckedUpdateWithoutGameRecordsInput>
    create: XOR<PoolCreateWithoutGameRecordsInput, PoolUncheckedCreateWithoutGameRecordsInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutGameRecordsInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutGameRecordsInput, PoolUncheckedUpdateWithoutGameRecordsInput>
  }

  export type PoolUpdateWithoutGameRecordsInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedPoolsNestedInput
    memberships?: PoolMemberUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutGameRecordsInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: PoolMemberUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserGameRecordUpsertWithWhereUniqueWithoutGameRecordInput = {
    where: UserGameRecordWhereUniqueInput
    update: XOR<UserGameRecordUpdateWithoutGameRecordInput, UserGameRecordUncheckedUpdateWithoutGameRecordInput>
    create: XOR<UserGameRecordCreateWithoutGameRecordInput, UserGameRecordUncheckedCreateWithoutGameRecordInput>
  }

  export type UserGameRecordUpdateWithWhereUniqueWithoutGameRecordInput = {
    where: UserGameRecordWhereUniqueInput
    data: XOR<UserGameRecordUpdateWithoutGameRecordInput, UserGameRecordUncheckedUpdateWithoutGameRecordInput>
  }

  export type UserGameRecordUpdateManyWithWhereWithoutGameRecordInput = {
    where: UserGameRecordScalarWhereInput
    data: XOR<UserGameRecordUpdateManyMutationInput, UserGameRecordUncheckedUpdateManyWithoutGameRecordInput>
  }

  export type GameRecordCreateWithoutUserRecordsInput = {
    gameId?: bigint | number
    creatorId: string
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
    pool: PoolCreateNestedOneWithoutGameRecordsInput
  }

  export type GameRecordUncheckedCreateWithoutUserRecordsInput = {
    gameId?: bigint | number
    creatorId: string
    poolId: bigint | number
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
  }

  export type GameRecordCreateOrConnectWithoutUserRecordsInput = {
    where: GameRecordWhereUniqueInput
    create: XOR<GameRecordCreateWithoutUserRecordsInput, GameRecordUncheckedCreateWithoutUserRecordsInput>
  }

  export type UserCreateWithoutGameRecordsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolCreateNestedManyWithoutOwnerInput
    poolMemberships?: PoolMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGameRecordsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolUncheckedCreateNestedManyWithoutOwnerInput
    poolMemberships?: PoolMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGameRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameRecordsInput, UserUncheckedCreateWithoutGameRecordsInput>
  }

  export type GameRecordUpsertWithoutUserRecordsInput = {
    update: XOR<GameRecordUpdateWithoutUserRecordsInput, GameRecordUncheckedUpdateWithoutUserRecordsInput>
    create: XOR<GameRecordCreateWithoutUserRecordsInput, GameRecordUncheckedCreateWithoutUserRecordsInput>
    where?: GameRecordWhereInput
  }

  export type GameRecordUpdateToOneWithWhereWithoutUserRecordsInput = {
    where?: GameRecordWhereInput
    data: XOR<GameRecordUpdateWithoutUserRecordsInput, GameRecordUncheckedUpdateWithoutUserRecordsInput>
  }

  export type GameRecordUpdateWithoutUserRecordsInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pool?: PoolUpdateOneRequiredWithoutGameRecordsNestedInput
  }

  export type GameRecordUncheckedUpdateWithoutUserRecordsInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutGameRecordsInput = {
    update: XOR<UserUpdateWithoutGameRecordsInput, UserUncheckedUpdateWithoutGameRecordsInput>
    create: XOR<UserCreateWithoutGameRecordsInput, UserUncheckedCreateWithoutGameRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameRecordsInput, UserUncheckedUpdateWithoutGameRecordsInput>
  }

  export type UserUpdateWithoutGameRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUpdateManyWithoutOwnerNestedInput
    poolMemberships?: PoolMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGameRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUncheckedUpdateManyWithoutOwnerNestedInput
    poolMemberships?: PoolMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolCreateWithoutMembershipsInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedPoolsInput
    gameRecords?: GameRecordCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutMembershipsInput = {
    poolId?: bigint | number
    ownerId: string
    name: string
    createdAt?: Date | string
    gameRecords?: GameRecordUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutMembershipsInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutMembershipsInput, PoolUncheckedCreateWithoutMembershipsInput>
  }

  export type UserCreateWithoutPoolMembershipsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolCreateNestedManyWithoutOwnerInput
    gameRecords?: UserGameRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPoolMembershipsInput = {
    id?: string
    username: string
    email: string
    password: string
    name?: string | null
    lolId?: string | null
    mainLane?: string | null
    subLane?: string | null
    score?: number
    winLossStreak?: number
    createdAt?: Date | string
    ownedPools?: PoolUncheckedCreateNestedManyWithoutOwnerInput
    gameRecords?: UserGameRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPoolMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPoolMembershipsInput, UserUncheckedCreateWithoutPoolMembershipsInput>
  }

  export type PoolUpsertWithoutMembershipsInput = {
    update: XOR<PoolUpdateWithoutMembershipsInput, PoolUncheckedUpdateWithoutMembershipsInput>
    create: XOR<PoolCreateWithoutMembershipsInput, PoolUncheckedCreateWithoutMembershipsInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutMembershipsInput, PoolUncheckedUpdateWithoutMembershipsInput>
  }

  export type PoolUpdateWithoutMembershipsInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedPoolsNestedInput
    gameRecords?: GameRecordUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutMembershipsInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameRecords?: GameRecordUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserUpsertWithoutPoolMembershipsInput = {
    update: XOR<UserUpdateWithoutPoolMembershipsInput, UserUncheckedUpdateWithoutPoolMembershipsInput>
    create: XOR<UserCreateWithoutPoolMembershipsInput, UserUncheckedCreateWithoutPoolMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPoolMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPoolMembershipsInput, UserUncheckedUpdateWithoutPoolMembershipsInput>
  }

  export type UserUpdateWithoutPoolMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUpdateManyWithoutOwnerNestedInput
    gameRecords?: UserGameRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPoolMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lolId?: NullableStringFieldUpdateOperationsInput | string | null
    mainLane?: NullableStringFieldUpdateOperationsInput | string | null
    subLane?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    winLossStreak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPools?: PoolUncheckedUpdateManyWithoutOwnerNestedInput
    gameRecords?: UserGameRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolCreateManyOwnerInput = {
    poolId?: bigint | number
    name: string
    createdAt?: Date | string
  }

  export type PoolMemberCreateManyUserInput = {
    poolId: bigint | number
  }

  export type UserGameRecordCreateManyUserInput = {
    recordId?: bigint | number
    gameId: bigint | number
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type PoolUpdateWithoutOwnerInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: PoolMemberUpdateManyWithoutPoolNestedInput
    gameRecords?: GameRecordUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutOwnerInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: PoolMemberUncheckedUpdateManyWithoutPoolNestedInput
    gameRecords?: GameRecordUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateManyWithoutOwnerInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolMemberUpdateWithoutUserInput = {
    pool?: PoolUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type PoolMemberUncheckedUpdateWithoutUserInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PoolMemberUncheckedUpdateManyWithoutUserInput = {
    poolId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UserGameRecordUpdateWithoutUserInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
    gameRecord?: GameRecordUpdateOneRequiredWithoutUserRecordsNestedInput
  }

  export type UserGameRecordUncheckedUpdateWithoutUserInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type UserGameRecordUncheckedUpdateManyWithoutUserInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type PoolMemberCreateManyPoolInput = {
    userId: string
  }

  export type GameRecordCreateManyPoolInput = {
    gameId?: bigint | number
    creatorId: string
    team1Won: boolean
    team1Kills?: number
    team2Kills?: number
    team1Gold?: number
    team2Gold?: number
    isApplied?: boolean
    createdAt?: Date | string
  }

  export type PoolMemberUpdateWithoutPoolInput = {
    user?: UserUpdateOneRequiredWithoutPoolMembershipsNestedInput
  }

  export type PoolMemberUncheckedUpdateWithoutPoolInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PoolMemberUncheckedUpdateManyWithoutPoolInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type GameRecordUpdateWithoutPoolInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRecords?: UserGameRecordUpdateManyWithoutGameRecordNestedInput
  }

  export type GameRecordUncheckedUpdateWithoutPoolInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRecords?: UserGameRecordUncheckedUpdateManyWithoutGameRecordNestedInput
  }

  export type GameRecordUncheckedUpdateManyWithoutPoolInput = {
    gameId?: BigIntFieldUpdateOperationsInput | bigint | number
    creatorId?: StringFieldUpdateOperationsInput | string
    team1Won?: BoolFieldUpdateOperationsInput | boolean
    team1Kills?: IntFieldUpdateOperationsInput | number
    team2Kills?: IntFieldUpdateOperationsInput | number
    team1Gold?: IntFieldUpdateOperationsInput | number
    team2Gold?: IntFieldUpdateOperationsInput | number
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGameRecordCreateManyGameRecordInput = {
    recordId?: bigint | number
    userId: string
    teamNumber: number
    assignedPosition: string
    kills?: number
    deaths?: number
    assists?: number
    cs?: number
  }

  export type UserGameRecordUpdateWithoutGameRecordInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutGameRecordsNestedInput
  }

  export type UserGameRecordUncheckedUpdateWithoutGameRecordInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }

  export type UserGameRecordUncheckedUpdateManyWithoutGameRecordInput = {
    recordId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    teamNumber?: IntFieldUpdateOperationsInput | number
    assignedPosition?: StringFieldUpdateOperationsInput | string
    kills?: IntFieldUpdateOperationsInput | number
    deaths?: IntFieldUpdateOperationsInput | number
    assists?: IntFieldUpdateOperationsInput | number
    cs?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}