export interface DataProfileUserIn {
    id: number 
    description: null | string, 
    social_id: null | number, 
    created_at: string, 
    updated_at: string
}

export interface CardProfileIn {
    userId: number,
    image: string,
    name: string,
    lastName: string,
    email : string,
    description: string,
    btnEditProfile: (p: boolean) => void,
    linkFacebook: string,
    linkInstagram: string,
    linkTwitter: string,
    updateInfo: () => void,
    profileId?: number,
    role?: string,
    team?: string,
  }