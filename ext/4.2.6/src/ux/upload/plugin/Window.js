/**
 * @class Ext.ux.upload.plugin.Window
 * @extends Ext.AbstractPlugin
 * 
 * @author Harald Hanek (c) 2011-2012
 * @license http://harrydeluxe.mit-license.org
 */
Ext.define('Ext.ux.upload.plugin.Window', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.ux.upload.window',
    requires: [ 'Ext.ux.statusbar.StatusBar',
                'Ext.ux.statusbar.ValidationStatus' ],
            
    constructor: function(config)
    {
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
    },
    
    init: function(cmp)
    {
        var me = this,
            uploader = cmp.uploader;
        
        cmp.on({
            filesadded: {
                fn: function(uploader, files)
                {
                    me.window.show();
                },
                scope: me
            },
            updateprogress: {
                fn: function(uploader, total, percent, sent, success, failed, queued, speed)
                {
                    
                    var t = Ext.String.format('{0}% ({1}/{2})', percent, sent, total);
                    me.statusbar.down('progressbar').updateProgress(percent, t);
                    me.statusbar.showBusy({
                        text: t,
                        clear: false
                    });
                },
                scope: me
            },
            uploadprogress: {
                fn: function(uploader, file, name, size, percent)
                {
                    // me.statusbar.setText(name + ' ' + percent + '%');
                },
                scope: me
            },
            uploadcomplete: {
                fn: function(uploader, success, failed)
                {
                    if(failed.length == 0)
                        me.window.hide();
                },
                scope: me
            }
        });
        
        me.statusbar = new Ext.ux.StatusBar({
            dock: 'bottom',
            id: 'form-statusbar',
            defaultText: 'Ready',
            items: [
                {
                    xtype: 'progressbar',
                    width: 200
                }
            ]
        });
        
        me.view = new Ext.grid.Panel({
            store: uploader.store,
            stateful: true,
            multiSelect: true,
            hideHeaders: true,
            stateId: 'stateGrid',
            listeners: {
                itemclick: function(dataview, record, item){
                    //var file = me.uploader.getFile(record.get('id');
                    //console.log(uploader);
                    //console.log(uploader.getFile(record.get('id'));
                    uploader.actions.removeSelected.setDisabled(false);
                },
                scope: me
            },
            columns: [{
                text: 'Name',
                flex: 1,
                sortable: false,
                dataIndex: 'name'
            },
                    {
                        text: 'Size',
                        width: 90,
                        sortable: true,
                        align: 'right',
                        renderer: Ext.util.Format.fileSize,
                        dataIndex: 'size'
                    },
                    {
                        text: 'Change',
                        width: 75,
                        sortable: true,
                        hidden: true,
                        dataIndex: 'percent'
                    },
                    {
                        text: 'status',
                        width: 75,
                        hidden: true,
                        sortable: true,
                        dataIndex: 'status'
                    },
                    {
                        text: 'msg',
                        width: 175,
                        sortable: true,
                        dataIndex: 'msg'
                    }],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false
            },
            dockedItems: [{
                dock: 'top',
                enableOverflow: true,
                xtype: 'toolbar',
                padding: 10,
                style: {
                    background: 'transparent',
                    border: 'none',
                    padding: '5px 0'
                },
                listeners: {
                    beforerender: function(toolbar)
                    {
                        
                        if(uploader.autoStart == false){
                            toolbar.add(uploader.actions.start);
                            toolbar.add('-');
                        }
                        toolbar.add(uploader.actions.cancel);
                        toolbar.add('-');
                        toolbar.add(uploader.actions.removeSelected);
                        //toolbar.add('-');
                        //toolbar.add(uploader.actions.removeAll);
                        if(uploader.autoRemoveUploaded == false){
                            toolbar.add('-');
                            toolbar.add(uploader.actions.removeUploaded);
                        }
                    },
                    scope: me
                }
            },
                    me.statusbar]
        });
        
        me.window = new Ext.Window({
            title: me.title || 'Upload files',
            width: me.width || 640,
            height: me.height || 380,
            // modal : true, // harry
            plain: true,
            constrain: true,
            border: false,
            layout: 'fit',
            id: me.id || 'WindowUploader254',
            items: me.view,
            closable: false,
            closeAction: 'hide',
            minimizable: true,
            listeners: me.listeners
        });
    }
});