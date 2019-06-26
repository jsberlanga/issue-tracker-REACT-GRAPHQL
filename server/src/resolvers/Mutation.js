const createIssue = async (parent, args, context, info) => {
  return await context.prisma.createIssue({
    title: args.title,
    description: args.description
    // status: args.status
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
// const completeIssue = async (root, args, context) => {
//   return await context.prisma.updateIssue({
//     where: { id: args.id },
//     data: {
//       status: "COMPLETED"
//     }
//   });
// }

module.exports = {
  createIssue,
  updateIssue
};
