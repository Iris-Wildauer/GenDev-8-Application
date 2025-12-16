const USERS = [
    {
        id: "user_1",
        username: "A",
        preferences: {
            internet: 10,
            insurance: 20
        }
    },
    {
        id: "user_2",
        username: "B",
        preferences: {
            internet: 20,
            insurance: 10
        }
    }
] as const;

export const DEFAULT_USER = {
    id: 'default',
    username: 'guest',
    name: 'Guest User',
    preferences: {
        internet: 10,
        insurance: 10
    }
};

export function getUserById(id: string){
    return USERS.find(u => u.id == id);
}

export function getAllUsersNames(){
    return USERS.map(user =>({
        username: user.username,
        id: user.id
    }));
}

export function getAllUserData(){
    return USERS;
}
