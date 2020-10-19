export type ILoginUserArgs = {
  code: string
  serverState: string
  clientState: string
}
interface ILoginUserResponseError {
  readonly ok: false
  readonly error: string
  readonly error_description: string
}
interface ILoginUserResponseSuccess {
  readonly ok: true
}
export type ILoginUserResponse =
  | ILoginUserResponseSuccess
  | ILoginUserResponseError

interface ILogoutResponseSuccess {
  ok: true
}
interface ILogoutResponseError {
  ok: false
}
export type ILogoutResponse = ILogoutResponseSuccess | ILogoutResponseError

export type ISyncAccountsResponse =
  | {
      ok: true
    }
  | { ok: false }

export interface IUsageBillingPageArgs {
  readonly teamId: string
}
export interface IUsageBillingPageApiResponse {
  readonly accountCanSubscribe: boolean
  readonly subscription: {
    readonly seats: number
    readonly nextBillingDate: string
    readonly expired: boolean
    readonly cancelAt?: string
    readonly canceledAt?: string
    readonly cost: {
      readonly totalCents: number
      readonly subTotalCents: number
      readonly perSeatCents: number
      readonly planProductName: string
      readonly planInterval: "month" | "year"
      readonly discount?: {
        readonly name: string
        readonly discountCents: number
      }
    }
    readonly billingEmail: string
    readonly customerName?: string
    readonly customerAddress?: {
      readonly line1?: string
      readonly city?: string
      readonly country?: string
      readonly line2?: string
      readonly postalCode?: string
      readonly state?: string
    }
    readonly viewerIsOrgOwner: boolean
    readonly viewerCanModify: boolean
    readonly limitBillingAccessToOwners: boolean
  } | null
  readonly trial: {
    readonly startDate: string
    readonly endDate: string
    readonly expired: boolean
    readonly startedBy: {
      readonly id: string
      readonly name: string
      readonly profileImgUrl: string
    }
  } | null
  readonly activeUsers: ReadonlyArray<{
    readonly id: string
    readonly name: string
    readonly profileImgUrl: string
    readonly interactions: number
    readonly lastActiveDate: string
    readonly firstActiveDate?: string
    readonly hasSeatLicense?: boolean
  }>
  readonly subscriptionExemption: {
    readonly message: string | null
  } | null
}

export interface IActivityArgs {
  readonly teamId: string
}
export interface ICurrentAccountArgs {
  readonly teamId: string
}

interface IKodiakChart {
  readonly labels: Array<string>
  readonly datasets: {
    readonly approved: Array<number>
    readonly merged: Array<number>
    readonly updated: Array<number>
  }
}
interface ITotalChart {
  readonly labels: Array<string>
  readonly datasets: {
    readonly opened: Array<number>
    readonly merged: Array<number>
    readonly closed: Array<number>
  }
}
export interface IActivityApiResponse {
  readonly kodiakActivity: IKodiakChart
  readonly pullRequestActivity: ITotalChart
}

export interface IAccountsApiResponse
  extends ReadonlyArray<{
    readonly id: string
    readonly name: string
    readonly profileImgUrl: string
  }> {}

export interface ICurrentAccountApiResponse {
  readonly org: {
    readonly id: string
    readonly name: string
    readonly profileImgUrl: string
  }
  readonly user: {
    readonly id: string
    readonly name: string
    readonly profileImgUrl: string
  }
  readonly accounts: ReadonlyArray<{
    readonly id: string
    readonly name: string
    readonly profileImgUrl: string
  }>
}

export interface IStartTrialArgs {
  readonly teamId: string
  readonly billingEmail: string
}
export interface IFetchSubscriptionInfoArgs {
  readonly teamId: string
}

export interface IStartCheckoutArgs {
  readonly teamId: string
  readonly seatCount: number
  readonly planPeriod: "month" | "year"
}
export interface IStartCheckoutResponse {
  readonly stripeCheckoutSessionId: string
  readonly stripePublishableApiKey: string
}

export type GetSubscriptionInfoArgs = {
  readonly teamId: string
}

export type SubscriptionInfoResponse =
  | {
      // personal user, subscription valid, or trial account
      readonly type: "VALID_SUBSCRIPTION"
    }
  | { readonly type: "TRIAL_EXPIRED" }
  | { readonly type: "SUBSCRIPTION_EXPIRED" }
  | {
      readonly type: "SUBSCRIPTION_OVERAGE"
      readonly activeUserCount: number

      readonly licenseCount: number
    }

export type UpdateStripeCustomerInfoArgs = {
  readonly teamId: string
  readonly email?: string
  readonly name?: string
  readonly address?: {
    readonly line1?: string
    readonly city?: string
    readonly country?: string
    readonly line2?: string
    readonly postalCode?: string
    readonly state?: string
  }
  readonly limitBillingAccessToOwners?: boolean
  readonly contactEmails?: string
}

export interface Api {
  loginUser: (args: ILoginUserArgs) => Promise<ILoginUserResponse>
  logoutUser: () => Promise<ILogoutResponse>
  syncAccounts: () => Promise<ISyncAccountsResponse>
  getUsageBilling: (
    args: IUsageBillingPageArgs,
  ) => Promise<IUsageBillingPageApiResponse>
  getActivity: (args: IActivityArgs) => Promise<IActivityApiResponse>
  getAccounts: () => Promise<IAccountsApiResponse>
  getCurrentAccount: (
    args: ICurrentAccountArgs,
  ) => Promise<ICurrentAccountApiResponse>
  startTrial: (args: IStartTrialArgs) => Promise<unknown>
  startCheckout: (args: IStartCheckoutArgs) => Promise<IStartCheckoutResponse>
  getSubscriptionInfo: (
    args: GetSubscriptionInfoArgs,
  ) => Promise<SubscriptionInfoResponse>
  updateStripeCustomerInfo: (
    args: UpdateStripeCustomerInfoArgs,
  ) => Promise<unknown>
}
