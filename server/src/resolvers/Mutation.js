const createIssue = async (parent, args, context, info) => {
  return await context.prisma.createIssue({
    title: args.title,
    description: args.description,
    status: args.status
  });
};
const updateIssue = async (parent, args, context, info) => {
  return await context.prisma.updateIssue({
    where: { id: args.id },
    data: {
      title: args.title,
      description: args.description,
      status: args.status
    }
  });
};
const deleteIssue = async (root, args, context, info) => {
  return await context.prisma.deleteIssue({ id: args.id });
};

module.exports = {
  createIssue,
  updateIssue,
  deleteIssue
};
