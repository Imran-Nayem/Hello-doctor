import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ChatCard = ({ chat, index }) => {
  const report = chat?.report || {};
  const title = report?.title || `Report ${index + 1}`;
  const description = report?.description || 'No description available.';
  const createdAt = report?.createdAt ? new Date(report.createdAt).toLocaleString() : '';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {createdAt && <CardDescription>{createdAt}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ChatCard;


