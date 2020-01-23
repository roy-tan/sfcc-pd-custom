const PageMgr = require('dw/experience/PageMgr');
const ObjectUtils = require('*/cartridge/scripts/utils/object.js');

function getPagesContentFromSlot(slotContent) {
    const pageIds = ObjectUtils.safeAssign(slotContent, "custom.pagedesignerPageIds", []);

    return pageIds
        .map(function(pageId) {
            const page = PageMgr.getPage(pageId);
            if (page && page.isVisible()) {
                return PageMgr.renderPage(pageId, JSON.stringify({decorator: "pagedesigner/nodecorator"}));
            }
            return null;
        })
        .filter(function(page) {
            return page;
        })
    ;
}

function renderPage(page, res, extraParams) {
    if(!page.isVisible()) {
        return;
    }

    if (page.hasVisibilityRules()) {
        delete res.cachePeriod;
        delete res.personalized;
        delete res.cachePeriodUnit;
    }

    res.renderings = [];

    const params = ObjectUtils.extend(extraParams, res.viewData, true);
    res.print(PageMgr.renderPage(page.ID, JSON.stringify(params)));
}

module.exports = {
    renderPage: renderPage,
    getPagesContentFromSlot: getPagesContentFromSlot
};
