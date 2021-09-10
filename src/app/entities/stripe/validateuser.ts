// import { SystemFlags } from "../administrator/systemflags"
// import { ImageData } from "../ecommerce/saleorder/imagedata"
import { AuthDataList } from "./authdatalist"
import { Role } from "./role"
import { userAddress } from "./useraddress"

export class ValidateUser {
    id: number
    firstName: string
    middleName: string
    lastName: string
    businessName: string
    contactNo1: string
    contactNo2: string
    email: string
    birthdate?: Date
    anniversaryDate?: Date
    imageId?: number
    isPasswordSet: boolean
    isEmailVerified: boolean
    isVerified: boolean
    location: string
    geoPoints: string
    creditLimit?: number
    sessionToken: string
    userAddress: userAddress
    oAuthData: AuthDataList[]
    imageData: ImageData
    roleId: number
    role: Role
    // systemFlag: SystemFlags
    cartProductList: any
    favouriteProductList: any
    totalFollowers: number
    totalFollowing: number
    totalFriends: number
    totalUnReadNotification: number
    customerId: string
    userSubscriptions: any
    userChips: number
    userRankInPerson: number
    userRankAnywhere: number
    zoomNumber: string
    createdAt?: Date

    constructor() {
        this.userAddress = new userAddress();
        this.oAuthData = new Array<AuthDataList>();
        // this.imageData = new ImageData();
        this.role = new Role();
        // this.systemFlag = new SystemFlags();
    }
}