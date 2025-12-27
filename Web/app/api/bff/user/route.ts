import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getAllUserData,
  DEFAULT_USER,
  setUserWidgets,
  getWidgetsForUser,
} from "./users";
import {
  getUserWidgetPriorities,
  invalidateCache,
  setUserWidgetPriorities,
} from "../../../../lib/cache";
import { Server } from "socket.io";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export let currentUser = DEFAULT_USER;

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      allUsers: getAllUserData(),
      currentUser: currentUser,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("[POST /user] Received:", body);

  if (body.method === "setUser") {
    if (body.username) {
      currentUser = body;
      console.log("[POST /user] Updated currentUser to:", currentUser.username);

      if (globalThis.socketIO) {
        /*
        globalThis.socketIO.to(body.socketId).emit("user-change", currentUser);
        console.log(`[Socket.io] ${body.socketId}`);
      } else if (globalThis.socketIO) {

         */
        // Fallback: Broadcast wenn keine socketId
        globalThis.socketIO.emit("user-change", currentUser);
        console.log(`[Socket.io] (no socketId)`);
      }

      return NextResponse.json(
        {
          success: true,
          user: currentUser,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }
  } else if (body.method === "setWidgetOrder") {
    const { categoryOrder, userId } = body;

    const success: boolean = setUserWidgets(userId, categoryOrder);

    if (success) {
      await invalidateCache(`preferences:${userId}`);
      await invalidateCache(`widgets:${userId}`);

      globalThis.socketIO.emit("widgetOrderUpdated", {
        widgetOrder: categoryOrder,
      });

      return NextResponse.json({
        success: true,
        widgetOrder: categoryOrder,
      });
    }
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
