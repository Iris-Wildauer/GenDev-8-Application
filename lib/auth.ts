import { NextRequest } from 'next/server';
import { getUserById } from '../app/api/bff/user/users';

export async function getAuthenticatedUser(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId') || 'user_1';

    const user = getUserById(userId);

    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    console.log(`[Auth] User: ${user.id} (${user.username})`);
    return user;
}
