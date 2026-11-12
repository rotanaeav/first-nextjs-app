import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InfoPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          View your registered personal identity and shipping addresses.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Full Name</span>
          <span className="font-medium">Rotana Dev</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Email Address</span>
          <span className="font-medium">rotana@example.com</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">Default Shipping</span>
          <span className="font-medium">Phnom Penh, Cambodia</span>
        </div>
      </CardContent>
    </Card>
  );
}
