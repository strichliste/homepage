import { defineHastPlugin } from 'satteri';

/**
 * Render Markdown tables as Bootstrap tables: `.table` styles the cells,
 * `.table-responsive` scrolls wide tables within themselves instead of
 * panning the whole page on phones. (Images need no plugin: the astro:assets
 * pipeline emits dimensions and lazy loading, and app.css does the looks.)
 */
export const bootstrapTables = defineHastPlugin({
  name: 'bootstrap-tables',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.setProperty(node, 'class', 'table');
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: 'table-responsive' },
        children: [],
      });
    },
  },
});
