export class StripePaymentDetail {
    id: number
    paymentId: number
    amount: number
    remark: string
    paymentModeId: number
    paymentRefNumber: string
    createdAt: Date
    updatedAt: Date
    isDelete: boolean

    constructor() { }
}