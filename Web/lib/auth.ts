import { NextRequest } from 'next/server';
import { currentUser } from '../app/api/bff/user/route';
import { DEFAULT_USER, getUserById } from '../app/api/bff/user/users';

export async function getAuthenticatedUser(request: NextRequest) {
    const userIdParam = request.nextUrl.searchParams.get('userId');

    if (userIdParam) {
        const user = getUserById(userIdParam);
        if (user) {
            console.log(`[Auth] ${user.id} (${user.username})`);
            return user;
        }
    }

    if (currentUser) {
        console.log(`[Auth] ${currentUser.id} (${currentUser.username})`);
        return currentUser;
    }

    console.log(`[Auth] DEFAULT_USER`);
    return DEFAULT_USER;
}
