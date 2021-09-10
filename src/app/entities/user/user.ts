import { UserAddress } from './useraddress'
import { UserImage } from './userimage'

export class User {
    id: number
    firstName: string
    middleName: string
    lastName: string
    businessName: string
    code: string
    contactNo1: string
    contactNo2: string
    email: string
    gender: string
    password: string
    birthdate: any
    anniversaryDate: Date
    imageId: number
    isPasswordSet: boolean
    isDisable: number
    isEmailVerified: boolean
    isVerified: boolean
    creditLimit: number
    termsAggrementAt: Date
    isActive: boolean
    isDelete: boolean
    createdAt: Date
    updatedAt: Date
    roleId: number
    roleName: string
    imgData: Blob
    imgId: number
    imgDescription: string
    alt: string
    userAddress: UserAddress[]
    imageData: UserImage;
    toDate?: Date
    subscriptionStatus: string
    userSubscriptionId: number
    isOAuth: boolean

    constructor() {
        this.userAddress = new Array<UserAddress>();
        this.imageData = new UserImage();
    }

}