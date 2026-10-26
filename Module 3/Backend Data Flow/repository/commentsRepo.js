
/**
 * In-memory comments repository using a Map.
 *
 * To replace this with Prisma, change the storage operations to database
 * queries and use database-generated IDs. Keep the repository contract
 * compatible so commentsService.js does not need to change.
 */
const store = new Map();
let nextId = 1;

exports.findAll = async () => [...store.values()];

exports.findById = async (id) =>
  store.get(Number(id)) || null;

exports.create = async (fields) => {
  const comment = {
    id: nextId++,
    postId: fields.postId,
    authorId: fields.authorId,
    body: fields.body,
    createdAt: Date.now()
  };

  store.set(comment.id, comment);
  return comment;
};

exports.update = async (id, patch) => {
  const comment = store.get(Number(id));

  if (!comment) return null;

  Object.assign(comment, patch);
  return comment;
};

exports.remove = async (id) =>
  store.delete(Number(id));

// Extra query used by the existing application.
exports.findByPost = async (postId) =>
  [...store.values()].filter(
    (comment) => comment.postId === Number(postId)
  );
