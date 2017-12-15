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
/**
 * @private
 */
Ext.define('Ext.grid.plugin.HeaderReorderer', {
    extend: 'Ext.AbstractPlugin',
    requires: ['Ext.grid.header.DragZone', 'Ext.grid.header.DropZone'],
    alias: 'plugin.gridheaderreorderer',

    init: function(headerCt) {
        this.headerCt = headerCt;
        headerCt.on({
            render: this.onHeaderCtRender,
            single: true,
            scope: this
        });
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        Ext.destroy(this.dragZone, this.dropZone);
    },

    onHeaderCtRender: function() {
        var me = this;
        
        me.dragZone = new Ext.grid.header.DragZone(me.headerCt);
        me.dropZone = new Ext.grid.header.DropZone(me.headerCt);
        if (me.disabled) {
            me.dragZone.disable();
        }
    },
    
    enable: function() {
        this.disabled = false;
        if (this.dragZone) {
            this.dragZone.enable();
        }
    },
    
    disable: function() {
        this.disabled = true;
        if (this.dragZone) {
            this.dragZone.disable();
        }
    }
});
