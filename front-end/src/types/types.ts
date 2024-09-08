enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface Message {
    id: string   
    createdAt: string 
    updatedAt: string 
    content: string
    room: Room     
    roomId: string   
    senderId: string   
    senderName: string
}
export interface Room {
    id?: string    
    createdAt?: string  
    updatedAt?: string  
    roomName: string
    roomType: string
    messages?: Message[]
    authorId?: string    
    userIDs: string[]  
    users?: User[]    
}
export interface User {
    id: string   
    createdAt: string 
    email: string   
    username: string   
    password: string
    isOnline?: boolean
    role: Role     
    roomIDs: string[] 
    rooms: Room[]   
}