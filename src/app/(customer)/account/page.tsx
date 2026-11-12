import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>
          Manage your customer account preferences and subscription.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Account Status</span>
          <span className="font-medium text-emerald-600">Active (VIP Member)</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Member Since</span>
          <span className="font-medium">November 2026</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Notification Preferences</span>
          <span className="font-medium">Email & SMS enabled</span>
        </div>
        <div className="pt-2">
          <Button variant="outline" size="sm">Edit Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}
