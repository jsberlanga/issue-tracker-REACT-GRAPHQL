const getIssues = async (parent, args, context, info) => {
  const issues = await context.prisma.issues();

  return issues.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
