import { Group, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const allGroups = async (
  _: any,
  res: {
    json: (arg0: {
      success: boolean;
      payload: Group[];
      message: string;
    }) => void;
  }
) => {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      title: true,
      members: {
        select: {
          id: true,
        },
      },
    },
  });
  res.json({
    success: true,
    payload: groups,
    message: "Operation Successful",
  });
};
