import { StripePaymentDetail } from "./stripepaymentdetail"

export class StripePayment {
    id: number
    userId: number
    amount: number
    transactionDate: Date
    paymentStatusId: number
    paymentTypeId: number
    remark: string
    isDelete: boolean
    paymentStatusName: string
    paymentTypeName: string
    paymentDetails: StripePaymentDetail[]

    constructor() {
        this.paymentDetails = new Array<StripePaymentDetail>();
    }
}