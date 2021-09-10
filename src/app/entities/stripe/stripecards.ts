import { CardDetails } from "./carddetail"

export class StripeCards {
    billing_details: any
    card: CardDetails
    created: number
    customer: string
    id: string
    livemode: boolean
    metadata: any
    object: string
    type: string

    //extended property
    isDefault: boolean

    constructor() {
        this.card = new CardDetails();
    }

}