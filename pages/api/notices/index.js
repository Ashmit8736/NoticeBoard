import { prisma } from "../../../lib/prisma";
import { validateNotice } from "../../../lib/validations";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },     // Urgent first
          { publishDate: "desc" },  // latest first
        ],
      });

      return res.status(200).json({
        success: true,
        notices,
      });
    } catch (error) {
      console.error("GET notices error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch notices",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      const errors = validateNotice({
        title,
        body,
        category,
        priority,
        publishDate,
      });

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          errors,
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image?.trim() || null,
        },
      });

      return res.status(201).json({
        success: true,
        notice,
        message: "Notice created successfully",
      });
    } catch (error) {
      console.error("POST notice error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create notice",
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}