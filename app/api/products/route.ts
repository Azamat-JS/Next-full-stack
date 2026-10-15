
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/app/models/product-model";

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find().sort({
            createdAt: -1,
        });

        return NextResponse.json(products);
    } catch {
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, quantity } = body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0 ||
            (quantity !== undefined &&
                (!Number.isInteger(quantity) || quantity < 0))
        ) {
            return NextResponse.json(
                { message: "Invalid product data" },
                { status: 400 }
            );
        }

        await connectDB();

        const product = await Product.create({
            name,
            description,
            price,
            quantity,
        });

        return NextResponse.json(product, { status: 201 });
    } catch {
        return NextResponse.json(
            { message: "Failed to create product" },
            { status: 500 }
        );
    }
}
