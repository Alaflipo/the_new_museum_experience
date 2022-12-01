export interface UserData {
    id: number, 
    name: string, 
    date: string, 
}

export interface MuseumPhotoData {
    id?: number, 
    name: string, 
    painter: string, 
    img_path: string, 
    tags: string[], 
    description: string, 
}

export interface PhotoData {
    id?: number, 
    museumphoto?: number, 
    dalle?: string, 
    prompt?: string, 
    user: number, 
    photo: string, 
    date: string, 
}