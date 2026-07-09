import { prisma } from "../../../lib/prisma";
import { validateNotice } from "../../../lib/validations";

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = Number(id);

  if (!noticeId) {
    return res.status(400).json({
      success: false,
      message: "Invalid notice id",
    });
  }

  try {
    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({
        where: { id: noticeId },
      });

      if (!notice) {
        return res.status(404).json({
          success: false,
          message: "Notice not found",
        });
      }

      return res.status(200).json({
        success: true,
        notice,
      });
    }

    if (req.method === "PUT") {
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

      const existingNotice = await prisma.notice.findUnique({
        where: { id: noticeId },
      });

      if (!existingNotice) {
        return res.status(404).json({
          success: false,
          message: "Notice not found",
        });
      }

      const updatedNotice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image?.trim() || null,
        },
      });

      return res.status(200).json({
        success: true,
        notice: updatedNotice,
        message: "Notice updated successfully",
      });
    }

    if (req.method === "DELETE") {
      const existingNotice = await prisma.notice.findUnique({
        where: { id: noticeId },
      });

      if (!existingNotice) {
        return res.status(404).json({
          success: false,
          message: "Notice not found",
        });
      }

      await prisma.notice.delete({
        where: { id: noticeId },
      });

      return res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Notice by id API error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}