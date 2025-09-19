const express = require("express");
const { createReportAndChat, sendMessage, getChatHistory, getUserReports, deleteReportAndChats } = require("../controllers/chat.controller");
const { protect, upload } = require("../middleware/auth.middleware");
const router = express.Router();


router.post("/create-report", protect, upload.single('file'), createReportAndChat);
router.post("/send-message", protect, sendMessage);
router.get("/history/:reportId", protect, getChatHistory);
router.get("/reports", protect, getUserReports);
router.delete("/report/:reportId", protect, deleteReportAndChats);

module.exports = router;