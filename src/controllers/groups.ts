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

export const groups = async (req, res) => {
  const { id } = req.params;
  const groups = await prisma.group.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({
    success: true,
    payload: groups,
    message: "Operation Successful",
  });

  // FIXME:  Cannot set headers after they are sent to the client
  if (!groups) {
    return res.status(404).send({
      success: false,
      payload: null,
      message: "Group not found",
    });
  }
};
