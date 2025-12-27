import { NextRequest, NextResponse } from "next/server";
import { getWidgets } from "./webBff";
import { getCached } from "../../../../lib/cache";
import { getAuthenticatedUser } from "../../../../lib/auth";
import { WidgetCategory } from "../../../../lib/widgetDefinitions";
import { currentUser } from "../user/route";
import { DEFAULT_USER, getUserById } from "../user/users";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  const fullUser = getUserById(user.id) ?? DEFAULT_USER;
  const results = await getWidgets(user.id);

  const widgetOrder = fullUser.widgetOrder ?? [
    "Internet",
    "Versicherung",
    "Urlaub",
  ];

  console.log("widgetOrder", user.widgetOrder);
  console.log(user);
  console.log("fullUser", fullUser);

  const sortedGroups = widgetOrder
    .map((category) => results.find((group) => group.category === category))
    .filter(Boolean);

  const response: Record<string, any> = {};

  sortedGroups.forEach((group) => {
    response[group.category as string] = {
      widgets: group.data,
      design: group.design,
    };
  });
  console.log("BFF Response:", response);
  return NextResponse.json(
    {
      widgets: response,
      categoryOrder: sortedGroups.map((g) => g.category),
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
