export class StripeCustomer {
    account_balance: number
    address: string
    balance: number
    created: number
    currency: string
    default_source: string
    delinquent: boolean
    description: string
    discount?: number
    email: string
    id: string
    invoice_prefix: string
    invoice_settings: { custom_fields: string, default_payment_method: string, footer: string }
    livemode: boolean
    metadata: { payment_method_id: string }
    name: string
    next_invoice_sequence: number
    object: string
    phone: string
    preferred_locales: []
    shipping: string
    sources: { object: string, data: [], has_more: boolean, total_count: 0, url: "/v1/customers/cus_JLFxTn3Oa6VW7i/sources" }
    subscriptions: { object: "list", data: [], has_more: false, total_count: 1, url: "/v1/customers/cus_JLFxTn3Oa6VW7i/subscriptions" }
    tax_exempt: string
    tax_ids: { object: "list", data: [], has_more: false, total_count: 0, url: "/v1/customers/cus_JLFxTn3Oa6VW7i/tax_ids" }
    tax_info: string
    tax_info_verification: string

    constructor() { }

}