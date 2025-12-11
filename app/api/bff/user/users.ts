const USERS = [
    {
        id: 1,
        username: "A",
        preferences: {
            internet: 10,
            insurance: 20
        }
    },
    {
        id: 2,
        username: "B",
        preferences: {
            internet: 20,
            insurance: 10
        }
    }
] as const;

export function getUser(username: string){
    return USERS.find(u => u.username == username);
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
