export const USERS = [
    {
        id: 1,
        username: "A",
    },
    {
        id: 2,
        username: "B",
    }
] as const;

export function getUser(username: string){
    return USERS.find(u => u.username == username);
}

export function getAllUsers(){
    return USERS.map(user =>({
        username: user.username,
        id: user.id
    }));
}
//prefernces in den einzelnen services!! und bei den services jeweils ein docker image erstellen ganz wichtig