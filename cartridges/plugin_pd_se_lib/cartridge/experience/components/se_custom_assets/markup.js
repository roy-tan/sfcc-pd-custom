const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the wysiwyg editor.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function(context) {
    const model = new HashMap();
    const { content } = context;

    if (content.link) {
        model.link = content.link;
    }

    model.content = content.markup.content;
    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/se_custom_assets/markup').render(model).text;
};