/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2016 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2016-10-05 03:40:31 (283b2cb229d1bac39381235a0217583b24341c69)
*/
Ext.define('Ext.rtl.layout.container.boxOverflow.Menu', {
    override: 'Ext.layout.container.boxOverflow.Menu',

    getSuffixConfig: function(isFromRTL) {
        if (isFromRTL) {
            return this.callParent();
        } else {
            return this.getPrefixConfig(true);
        }
    },

    getPrefixConfig: function(isFromRTL) {
        if (isFromRTL) {
            return this.callParent();
        } else {
            return this.getSuffixConfig(true);
        }
    }
});
