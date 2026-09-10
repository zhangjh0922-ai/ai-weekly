/**
 * Resolve authored concept and site-root links; never match ordinary text.
 * @param {{ base?: string, ids?: string[] }} options
 */
export default function conceptLinks({ base = '/', ids = [] } = {}) {
  const known = new Set(ids);
  const prefix = '/' + base.split('/').filter(Boolean).join('/');

  return {
    name: 'concept-links',
    link(node, ctx) {
      if (node.url?.startsWith('concept:')) {
        const id = node.url.slice('concept:'.length);
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !known.has(id)) {
          throw new Error(`Unknown concept link: ${node.url}`);
        }
        ctx.setProperty(node, 'url', `${prefix === '/' ? '' : prefix}/concepts/${id}`);
        ctx.setProperty(node, 'title', node.title ?? '查看概念解释');
        ctx.setProperty(node, 'data', {
          ...node.data,
          hProperties: { ...node.data?.hProperties, 'data-concept': id },
        });
      } else if (prefix !== '/' && node.url?.startsWith('/') && !node.url.startsWith('//')) {
        ctx.setProperty(node, 'url', `${prefix}${node.url}`);
      }
    },
  };
}
