const USERS = [
    {
        id: "user_1",
        username: "Mia",
        widgetOrder: ["Versicherung", "Internet" , "Urlaub"],
    },
    {
        id: "user_2",
        username: "John",
        widgetOrder: ["Urlaub", "Internet", "Versicherung"],
    }
];

export const DEFAULT_USER = {
    id: 'default',
    username: 'Gast',
    name: 'Guest User',
    widgetOrder: ['Internet', 'Versicherung', 'Urlaub'],
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

export function setUserWidgets(userId: string, widgets: string[]): boolean {
    const userIndex = USERS.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        USERS[userIndex] = {
            ...USERS[userIndex],
            widgetOrder: widgets
        };
        console.log(`Updated user ${userId}:`, widgets);
        return true;
    }

    console.error(`${userId} not found`);
    return false;
}