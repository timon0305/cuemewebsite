export class SubscriptionParameter {
    searchString: string;
    idList: number[];
    startIndex: number;
    fetchRecord: number;
    isActive: boolean;
    isDelete: boolean;
    roleIdList: number[];

    constructor() {
    }

}

export class Subscriptions {
    amount: number
    appleSubscriptionId: string
    createdAt?: Date
    description: string
    id: number
    isActive: boolean
    isDelete: boolean
    name: string
    roleId: number
    roleName: string
    termsAndCondition: string
    updatedAt?: Date
    validity: number
    validityMeasurement: string

    //Extended Property
    isEdit:boolean
    orgAmount: number

    constructor() { }
}