
/**
 * In-memory votes repository.
 *
 * When replacing this array with Prisma, use database queries instead
 * of array operations and let the database generate IDs if required.
 * Keep these repository contracts compatible so services stay unchanged.
 */
let store = [];
let nextId = 1;

exports.findAll = async () => [...store];

exports.findById = async (id) =>
  store.find((vote) => vote.id === Number(id)) || null;

exports.create = async (fields) => {
  const vote = {
    id: nextId++,
    postId: fields.postId,
    userId: fields.userId,
    at: Date.now()
  };

  store.push(vote);
  return vote;
};

exports.update = async (id, patch) => {
  const vote = store.find((item) => item.id === Number(id));

  if (!vote) return null;

  Object.assign(vote, patch);
  return vote;
};

exports.remove = async (id) => {
  const index = store.findIndex((vote) => vote.id === Number(id));

  if (index === -1) return false;

  store.splice(index, 1);
  return true;
};

// Extra domain queries used by the votes service.
exports.findByPostAndUser = async (postId, userId) =>
  store.find(
    (vote) =>
      vote.postId === Number(postId) &&
      vote.userId === Number(userId)
  ) || null;

exports.countByPost = async (postId) =>
  store.filter((vote) => vote.postId === Number(postId)).length;
