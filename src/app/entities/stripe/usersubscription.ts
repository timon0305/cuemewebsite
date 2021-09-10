import { Subscriptions } from "../subscription"
import { StripePayment } from "./stripepayment"

export class UserSubscription {
    id: number
    userId: number
    subscriptionId: number
    paymentId: number
    couponId?: number
    couponCode: string
    couponAmount?: number
    subscriptionAmount: number
    subscriptionName: string
    toDate: Date
    payments: StripePayment
    subscriptions: Subscriptions
    fromDate: Date
    subscriptionValidityMeasurement: string
    subscriptionTermsAndCondition: string
    subscriptionDescription: string
    applePrice: string

    constructor() {
        this.subscriptions = new Subscriptions();
        this.payments = new StripePayment();
    }
}