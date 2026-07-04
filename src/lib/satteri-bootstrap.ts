import { defineHastPlugin } from 'satteri';

/**
 * Give Markdown-authored images and tables the Bootstrap treatment the old
 * Hugo render hooks applied: fluid bordered images, and responsive `.table`
 * tables that scroll within themselves instead of panning the page on phones.
 */
export const bootstrapContent = defineHastPlugin({
  name: 'bootstrap-content',
  element: [
    {
      filter: ['img'],
      visit(node, ctx) {
        ctx.setProperty(node, 'className', 'img-fluid border rounded');
      },
    },
    {
      filter: ['table'],
      visit(node, ctx) {
        ctx.setProperty(node, 'className', 'table');
        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: 'table-responsive' },
          children: [],
        });
      },
    },
  ],
});
