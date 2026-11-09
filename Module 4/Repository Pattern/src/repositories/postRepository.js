/**
 * Post Repository (Map-backed in-memory store)
 *
 * Future Prisma-backed implementation analysis:
 *
 * WHAT WILL CHANGE:
 * - The private storage mechanism: the in-memory Map (`posts`) will be replaced by PrismaClient (`prisma.post`).
 * - Data access methods will become asynchronous (`async / await`) to handle database I/O.
 * - ID generation: `nextId++` will be removed as the database handles auto-incrementing primary keys.
 * - Query operations will use Prisma query methods (e.g., `prisma.post.findMany()`, `prisma.post.findUnique()`, `prisma.post.create()`, `prisma.post.update()`, `prisma.post.delete()`).
 *
 * WHAT WILL REMAIN UNCHANGED:
 * - The repository interface and method contract: `findAll`, `findById`, `create`, `update`, and `remove`.
 * - Method signatures and input parameter shapes.
 * - Return value semantics:
 *   - `findAll` returns an array of records.
 *   - `findById` returns the record or `null`.
 *   - `create` returns the complete created record with its ID.
 *   - `update` returns the updated record or `null` if not found.
 *   - `remove` returns a boolean indicating whether the record was deleted.
 * - Higher layers (services, controllers, routes): No business logic, controller code, or route handlers need to change.
 */

const posts = new Map([
  [1, { id: 1, title: 'First post', body: 'Repository boundaries protect change.', authorId: 7 }],
  [2, { id: 2, title: 'Second post', body: 'Services should speak in domain language.', authorId: 8 }],
]);

let nextId = 3;

function findAll() {
  return Array.from(posts.values(), (post) => ({ ...post }));
}

function findById(id) {
  const post = posts.get(Number(id));
  return post ? { ...post } : null;
}

function create(fields) {
  const post = { id: nextId++, ...fields };
  posts.set(post.id, post);
  return { ...post };
}

function update(id, patch) {
  const post = posts.get(Number(id));
  if (!post) return null;

  const updated = { ...post, ...patch, id: post.id };
  posts.set(post.id, updated);
  return { ...updated };
}

function remove(id) {
  return posts.delete(Number(id));
}

module.exports = { findAll, findById, create, update, remove };
