
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Product from "@/app/models/product-model";

type Context = {
    params: Promise<{ id: string }>;
};

async function getProductId(context: Context) {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return id;
}

export async function GET(
    _request: Request,
    context: Context
) {
    try {
        const id = await getProductId(context);

        if (!id) {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        await connectDB();

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch {
        return NextResponse.json(
            { message: "Failed to fetch product" },
            { status: 500 }
        );
    }
}


export async function PATCH(
    request: Request,
    context: Context
) {
    try {
        const id = await getProductId(context);

        if (!id) {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const allowedFields = [
            "name",
            "description",
            "price",
            "quantity",
        ];

        const keys = Object.keys(body);

        if (
            keys.length === 0 ||
            keys.some((key) => !allowedFields.includes(key))
        ) {
            return NextResponse.json(
                { message: "Invalid update fields" },
                { status: 400 }
            );
        }

        if (
            ("name" in body &&
                (typeof body.name !== "string" ||
                    !body.name.trim())) ||
            ("description" in body &&
                typeof body.description !== "string") ||
            ("price" in body &&
                (typeof body.price !== "number" ||
                    !Number.isFinite(body.price) ||
                    body.price < 0)) ||
            ("quantity" in body &&
                (!Number.isInteger(body.quantity) ||
                    body.quantity < 0))
        ) {
            return NextResponse.json(
                { message: "Invalid product data" },
                { status: 400 }
            );
        }

        if (typeof body.name === "string") {
            body.name = body.name.trim();
        }

        await connectDB();

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch {
        return NextResponse.json(
            { message: "Failed to update product" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    context: Context
) {
    try {
        const id = await getProductId(context);

        if (!id) {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        await connectDB();

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product deleted successfully",
        });
    } catch {
        return NextResponse.json(
            { message: "Failed to delete product" },
            { status: 500 }
        );
    }
}
