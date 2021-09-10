export class CardDetails {
    brand: string
    checks: { address_line1_check: string, address_postal_code_check: string, cvc_check: string }
    country: string
    exp_month: number
    exp_year: number
    fingerprint: string
    funding: string
    generated_from: string
    number: string
    cvc: string
    last4: string
    networks: { available: string[], preferred: string }
    three_d_secure_usage: { supported: boolean }
    wallet?: number

    constructor() { }

}