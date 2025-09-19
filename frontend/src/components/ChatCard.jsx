import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Clock, FileText, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import axios from 'axios';

const ChatCard = ({ chat, index }) => {
  const navigate = useNavigate();

  const report = chat?.report || {};
  const title = report?.title || `Report ${index + 1}`;
  const description = report?.description || '';
  const lastMessage = chat?.lastMessage || '';
  const messageCount = chat?.messageCount || 0;
  const updatedAt = chat?.updatedAt || report?.updatedAt || report?.createdAt;

  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString();
  };

  const reportType = report?.reportType?.replace('_', ' ');

  const handleOpen = () => {
    if (report?._id) {
      navigate(`/user/chat/${report._id}`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!report?._id) return;
    const confirmDelete = window.confirm('Delete this chat and its report?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/chat/report/${report._id}`, { withCredentials: true });
      // Let parent (Profile) refresh via a custom event
      const event = new CustomEvent('chat:deleted', { detail: { reportId: report._id } });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Failed to delete report', err);
      alert('Failed to delete chat. Please try again.');
    }
  };

  return (
    <Card
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      className="hover:shadow-lg transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      title={title}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white grid place-items-center shadow-sm">
                <FileText className="w-4 h-4" />
              </div>
              <CardTitle className="truncate text-base sm:text-lg">{title}</CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] sm:text-xs text-gray-500">
              {reportType && (
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {reportType}
                </span>
              )}
              {updatedAt && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(updatedAt)}
                </span>
              )}
              {report?.fileUrl && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 hidden xs:inline-block sm:inline-block">
                  PDF attached
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="font-medium">{messageCount}</span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleDelete}
              aria-label="Delete chat"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {description && (
          <CardDescription className="line-clamp-2 mt-1 text-xs sm:text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3 flex-1">
            {lastMessage || 'No messages yet. Click to start chatting.'}
          </p>
          <Button
            type="button"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white hidden group-hover:inline-flex"
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatCard;


