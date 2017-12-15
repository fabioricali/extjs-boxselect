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
 * Component layout for buttons
 * @private
 */
Ext.define('Ext.layout.component.Button', {

    /* Begin Definitions */

    alias: ['layout.button'],

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'button',

    htmlRE: /<.*>/,

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            text = owner.text;

        me.callParent(arguments);
        ownerContext.btnWrapContext = ownerContext.getEl('btnWrap');
        ownerContext.btnElContext = ownerContext.getEl('btnEl');
        ownerContext.btnInnerElContext = ownerContext.getEl('btnInnerEl');
        ownerContext.btnIconElContext = ownerContext.getEl('btnIconEl');

        if (text && me.htmlRE.test(text)) {
            ownerContext.isHtmlText = true;
            // If the text contains HTML tag(s) we need to account for the possibility
            // of multi-line-text. We have to remove the default line-height set by the
            // stylesheet so that we can allow the browser to measure the natural
            // height of the html content.
            owner.btnInnerEl.setStyle('line-height', 'normal');
            owner.btnInnerEl.setStyle('padding-top', '');
        }
    },

    beginLayoutCycle: function(ownerContext) {
        var owner = this.owner,
            lastWidthModel = this.lastWidthModel,
            lastHeightModel = this.lastHeightModel,
            btnInnerEl = owner.btnInnerEl,
            table = owner.getFrameInfo().table;

        this.callParent(arguments);
        
        // If we are framing and we have a calculated/configured size, that size gets
        // stamped onto the table frame element. If we're changing from !shrink -> shrink,
        // we need to clear the dimension of the innerEl (and by extension, the frame el),
        // so that we can calculate our size properly.

        if (lastWidthModel && !lastWidthModel.shrinkWrap &&
            ownerContext.widthModel.shrinkWrap) {
            // clear any heights we set last time around if needed
            owner.btnWrap.setStyle('height', '');
            owner.btnEl.setStyle('height', '');
            btnInnerEl.setStyle('line-height', '');
            if (table) {
                btnInnerEl.setStyle('width', '');
            }
        }
        
        if (table && lastHeightModel && !lastHeightModel.shrinkWrap &&
            ownerContext.heightModel.shrinkWrap) {
            btnInnerEl.setStyle('height', '');
        }
    },

    calculate: function(ownerContext) {
        var me = this,
            owner = me.owner,
            btnElContext = ownerContext.btnElContext,
            btnInnerElContext = ownerContext.btnInnerElContext,
            btnWrapContext = ownerContext.btnWrapContext,
            mmax = Math.max,
            ownerHeight, contentHeight, btnElHeight, innerElHeight;

        me.callParent(arguments);

        if (ownerContext.heightModel.shrinkWrap) {
            // Buttons that have a shrink-wrapped height usually do not need any layout
            // adjustments beause their layout is handled in CSS. An exception is made
            // for buttons that contain html tags in their "text".  These buttons need
            // special handling to vertically center the inner element inside the button.

            // measure the btnEl (the anchor element) to determine the available
            // height for centering the inner element.
            btnElHeight = owner.btnEl.getHeight();
            if (ownerContext.isHtmlText) {
                me.centerInnerEl(
                    ownerContext,
                    btnElHeight
                );
                me.ieCenterIcon(ownerContext, btnElHeight);
            }
        } else {
            // Buttons with configured or calculated heights may need to stretch their
            // inner elements to fit.
            ownerHeight = ownerContext.getProp('height');

            // If height is 0, skip out all this
            if (ownerHeight) {
                // contentHeight is the total available height inside the button's padding
                // and framing
                contentHeight = ownerHeight - ownerContext.getFrameInfo().height - ownerContext.getPaddingInfo().height;

                // The btnElHeight is the total available height to be shared by the button's
                // icon and text.  For standard buttons this is the same as the contentHeight
                // but must be adjusted for arrow height if the button has an arrow.
                btnElHeight = contentHeight;
                if ((owner.menu || owner.split) && owner.arrowAlign === 'bottom') {
                    // If the button has an arrow, subtract its size from the btnElHeight
                    // padding to account for the possibility of an arrow
                    btnElHeight -= btnWrapContext.getPaddingInfo().bottom;
                }

                // The innerElHeight is the total vertical space available for vertically
                // centering the button text.  By default this is the same as btnElHeight
                // but it must be adjusted by the icon size if the button has a top
                // or bottom icon.
                innerElHeight = btnElHeight;
                if ((owner.icon || owner.iconCls || owner.glyph) &&
                    (owner.iconAlign === 'top' || owner.iconAlign === 'bottom')) {
                    innerElHeight -= btnInnerElContext.getPaddingInfo().height;
                }

                btnWrapContext.setProp('height', mmax(0, contentHeight));
                btnElContext.setProp('height', mmax(0, btnElHeight));
                // ensure the button's text is vertically centered
                if (ownerContext.isHtmlText) {
                    // if the button text contains html it must be vertically centered
                    // by measuring it and adding top padding.
                    me.centerInnerEl(ownerContext, btnElHeight);
                } else {
                    // if the button text does not contain html we can just center it
                    // using line-height to avoid the extra measurement that happens
                    // inside of centerInnerEl() since multi-line text is not a possiblity
                    btnInnerElContext.setProp('line-height', mmax(0, innerElHeight) + 'px');
                }
                me.ieCenterIcon(ownerContext, btnElHeight);
            } else if (ownerHeight !== 0) {
                // Only fail if height was undefined, since it could be 0
                me.done = false;
            }
        }
    },

    centerInnerEl: function(ownerContext, btnElHeight) {
        var me = this,
            btnInnerElContext = ownerContext.btnInnerElContext,
            innerElHeight = me.owner.btnInnerEl.getHeight();

        if (ownerContext.heightModel.shrinkWrap && (btnElHeight < innerElHeight)) {
            // if the natural height of the html content is greater than the height
            // of the button element (the anchor el), then expand the button element
            // to fit
            ownerContext.btnElContext.setHeight(innerElHeight);
        } else if (btnElHeight > innerElHeight) {
            // if the natural height of the html content is smaller than the height
            // of the button element then we need to pad the top of the btnInnerEl
            // so that it is vertically centered within the btnEl
            btnInnerElContext.setProp(
                'padding-top', 
                Math.round((btnElHeight - innerElHeight) / 2) +
                    // if the inner element already has top padding, as is the case
                    // when the button has a top-aligned icon, then add the existing
                    // padding to the padding adjustment.
                    btnInnerElContext.getPaddingInfo().top 
            );
        }
    },

    ieCenterIcon: function(ownerContext, btnElHeight) {
        var iconAlign = this.owner.iconAlign;

        if ((Ext.isIEQuirks || Ext.isIE6) &&
            (iconAlign === 'left' || iconAlign === 'right')) {
            // Normally right/left aligned icon elements are vertically stretched using
            // top:0, bottom:0, and the icon is vertically centered inside this element
            // using background-position.  This technique for vertical centering does not
            // work in IE6 and IE quirks, so the stylesheet sets a fixed height on the
            // icon element in these browsers.  If the layout changes the height of the
            // button the height of the icon element must also be modified.
            ownerContext.btnIconElContext.setHeight(btnElHeight);
        }
    },

    publishInnerWidth: function(ownerContext, width) {
        if (this.owner.getFrameInfo().table) {
            // if the framing template uses a table, we need to set the width of the
            // inner element.  Otherwise long text may stretch the element past its
            // allowable width in IE.
            ownerContext.btnInnerElContext.setWidth(
                width -
                // the inner el must be sized inside the owner's framing and padding
                ownerContext.getFrameInfo().width - ownerContext.getPaddingInfo().width -
                // There may also be padding on the btnWrap el, e.g. tab with close icon
                // or button with arrow. This reduces the inner el size even further.
                ownerContext.btnWrapContext.getPaddingInfo().width
            );
        }
    }

});
