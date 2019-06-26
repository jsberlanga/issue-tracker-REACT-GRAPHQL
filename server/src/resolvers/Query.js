const getIssues = async (parent, args, context, info) => {
  return await context.prisma.issues();
};

const getIssue = async (parent, args, context, info) => {
  return await context.prisma.issue({
    id: args.id
  });
};

module.exports = {
  getIssues,
  getIssue
};
