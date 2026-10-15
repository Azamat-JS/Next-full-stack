"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
};

type FormState = {
    name: string;
    description: string;
    price: string;
    quantity: string;
};

const emptyForm: FormState = {
    name: "",
    description: "",
    price: "",
    quantity: "0",
};

async function getProducts(): Promise<Product[]> {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const fetchProducts = () =>
        getProducts()
            .then((data) => {
                setProducts(data);
                setError(null);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Failed to fetch products");
            })
            .finally(() => setLoading(false));

    useEffect(() => {
        let ignore = false;

        getProducts()
            .then((data) => {
                if (!ignore) setProducts(data);
            })
            .catch((err) => {
                if (!ignore) setError(err instanceof Error ? err.message : "Failed to fetch products");
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setFormError(null);
        setOpen(true);
    };

    const openEdit = (product: Product) => {
        setEditing(product);
        setForm({
            name: product.name,
            description: product.description ?? "",
            price: String(product.price),
            quantity: String(product.quantity),
        });
        setFormError(null);
        setOpen(true);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            name: form.name.trim(),
            description: form.description,
            price: Number(form.price),
            quantity: Number(form.quantity),
        };

        if (!payload.name) {
            setFormError("Name is required");
            return;
        }
        if (!Number.isFinite(payload.price) || payload.price < 0) {
            setFormError("Price must be a non-negative number");
            return;
        }
        if (!Number.isInteger(payload.quantity) || payload.quantity < 0) {
            setFormError("Quantity must be a non-negative whole number");
            return;
        }

        setSaving(true);
        setFormError(null);

        try {
            const res = await fetch(
                editing ? `/api/products/${editing._id}` : "/api/products",
                {
                    method: editing ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setOpen(false);
            await fetchProducts();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Failed to save product");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Delete "${product.name}"?`)) return;

        const res = await fetch(`/api/products/${product._id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            const data = await res.json();
            alert(data.message ?? "Failed to delete product");
            return;
        }

        setProducts((prev) => prev.filter((p) => p._id !== product._id));
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-10">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Products</h1>
                <Button onClick={openCreate}>
                    <Plus />
                    Add Product
                </Button>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-destructive">
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No products yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="max-w-xs truncate text-muted-foreground">
                                        {product.description || "—"}
                                    </TableCell>
                                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{product.quantity}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Edit product"
                                            onClick={() => openEdit(product)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Delete product"
                                            className="text-destructive"
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
                <DrawerContent>
                    <form onSubmit={handleSubmit} className="flex h-full flex-col">
                        <DrawerHeader>
                            <DrawerTitle>{editing ? "Edit Product" : "New Product"}</DrawerTitle>
                            <DrawerDescription>
                                {editing ? "Update the product details." : "Fill in the details to add a product."}
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.quantity}
                                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                    required
                                />
                            </div>

                            {formError && <p className="text-sm text-destructive">{formError}</p>}
                        </div>

                        <DrawerFooter>
                            <Button type="submit" disabled={saving}>
                                {saving ? "Saving..." : editing ? "Save Changes" : "Create Product"}
                            </Button>
                            <DrawerClose render={<Button type="button" variant="outline" />}>
                                Cancel
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default Products;
