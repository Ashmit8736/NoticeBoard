import { prisma } from "../../../lib/prisma";
import { validateNotice } from "../../../lib/validations";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { search, page = 1, limit = 6 } = req.query;
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const skip = (pageNumber - 1) * limitNumber;

      const whereClause = search
        ? {
            OR: [
              { title: { contains: search } },
              { body: { contains: search } },
            ],
          }
        : {};

      const [notices, totalCount] = await Promise.all([
        prisma.notice.findMany({
          where: whereClause,
          orderBy: [
            { priority: "desc" },     // Urgent first
            { publishDate: "desc" },  // latest first
          ],
          skip,
          take: limitNumber,
        }),
        prisma.notice.count({ where: whereClause }),
      ]);

      const totalPages = Math.ceil(totalCount / limitNumber);

      return res.status(200).json({
        success: true,
        notices,
        pagination: {
          totalCount,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber,
          hasMore: pageNumber < totalPages,
        }
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