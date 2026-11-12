"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Edit3, Trash2, Loader2, CheckCircle2 } from "lucide-react";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

type IdType = {
  id: string;
};

export default function ProductId({ id }: IdType) {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/productSwr/${id}`,
    fetcher,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (error) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <p className="text-destructive font-semibold">Error loading product {id}</p>
        <Button variant="outline" render={<Link href="/productSwr" />} nativeButton={false}>
          Back to SWR Products
        </Button>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm">Fetching <code>GET /api/productSwr/{id}</code> via useSWR...</p>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const priceNum = parseFloat(newPrice || String(data.price));
    const titleVal = newTitle.trim() || data.title;

    try {
      const res = await fetch(`/api/productSwr/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleVal,
          price: priceNum,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) throw new Error(resJson.error || "Update failed");

      // Optimistically update SWR cache!
      await mutate({ ...data, title: titleVal, price: priceNum }, false);

      setIsEditing(false);
      setStatusMessage("Updated successfully via PUT /api/productSwr/[id] & SWR mutate()!");
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${data.title}"?`)) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/productSwr/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      alert(`Product ${id} deleted successfully via DELETE /api/productSwr/${id}`);
      router.push("/productSwr");
    } catch (err: any) {
      alert(err.message || "Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" render={<Link href="/productSwr" />} nativeButton={false}>
          <ArrowLeft className="mr-2 size-4" /> Back to SWR Products
        </Button>
        <span className="text-xs bg-primary/10 text-primary font-mono px-3 py-1 rounded-full font-semibold">
          Route: /api/productSwr/{id}
        </span>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <Card className="overflow-hidden shadow-lg border-border">
        {data.thumbnail && (
          <div className="relative w-full h-64 bg-muted">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {data.category || "General"}
            </span>
            <span className="text-2xl font-bold text-foreground">
              ${data.price}
            </span>
          </div>
          <CardTitle className="text-2xl">{data.title}</CardTitle>
          <CardDescription className="text-sm">
            {data.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNewTitle(data.title);
                setNewPrice(String(data.price));
                setIsEditing(true);
              }}
              className="gap-2"
            >
              <Edit3 className="size-4" /> Quick Edit (PUT)
            </Button>

            <Button
              variant="destructive"
              size="sm"
              disabled={deleting}
              onClick={handleDelete}
              className="gap-2"
            >
              {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              {deleting ? "Deleting..." : "Delete (DELETE)"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {isEditing && (
        <Card className="border-primary/30 bg-primary/5 p-6 animate-in fade-in duration-200">
          <h3 className="font-bold text-base mb-1">Edit via PUT /api/productSwr/{id}</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Submits body payload to API handler and revalidates SWR cache using <code>mutate()</code>.
          </p>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={saving}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                disabled={saving}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={saving} className="gap-2">
                {saving && <Loader2 className="size-3.5 animate-spin" />}
                {saving ? "Saving..." : "Save (PUT)"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
