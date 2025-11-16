export async function GET() {
    await new Promise(res => setTimeout(res, 1500));

    return Response.json({
        destination: "Mallorca",
        price: "49€"
    });
}
