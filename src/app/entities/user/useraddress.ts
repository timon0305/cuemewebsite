export class UserAddress {
    id: number
    isDefault: number
    addressId: boolean
    addressTypeId: number
    addressTypeName: string
    label: string
    contactPersonName: string
    addressLine1: string
    addressLine2: string
    geoPoints: number[]
    areaId: number
    pinCode: string
    area: string
    districtsId: number
    district: string
    stateId: number
    state: string
    countryId: number
    country: string

    constructor() { }

}