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
 * List compiled by KillerNay on the extjs.com forums.
 * Thank you KillerNay!
 *
 * Thailand Translations
 */
Ext.onReady(function() {
    if (Ext.Date) {
        Ext.Date.monthNames = [
            "รยกรร\u2019โฌร",
            "ยกรรลธร\u2019ร\u201cลธร\u2018ยนลพรฌ",
            "รร\u2022ยนร\u2019โฌร",
            "ร\xa0รรร\u2019รยน",
            "ลธรรร€ร\u2019โฌร",
            "รร\u201dยถรยนร\u2019รยน",
            "ยกรยกยฏร\u2019โฌร",
            "รร\u201dยงรร\u2019โฌร",
            "ยกร\u2018ยนรร\u2019รยน",
            "ยตรร\u2026ร\u2019โฌร",
            "ลธรรลกร\u201dยกร\u2019รยน",
            "ลพร\u2018ยนรร\u2019โฌร"
        ];
        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };
        Ext.Date.monthNumbers = {
            "รโฌ": 0,
            "ยกลธ": 1,
            "รร\u2022โฌ": 2,
            "ร\xa0รร": 3,
            "ลธโฌ": 4,
            "รร\u201dร": 5,
            "ยกโฌ": 6,
            "รโฌ": 7,
            "ยกร": 8,
            "ยตโฌ": 9,
            "ลธร": 10,
            "ลพโฌ": 11
        };
        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };
        Ext.Date.dayNames = [
            "รร\u2019ยทร\u201dยตรรฌ",
            "ลกร\u2018ยนยทรรฌ",
            "รร\u2018ยงโฌร\u2019ร",
            "ลธรร\u2014ลพ",
            "ลธรรร\u2018รยบลฝร\u2022",
            "รรยกรรฌ",
            "ร\xa0รร\u2019รรฌ"
        ];
        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }
    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '฿',
            // Thai Baht
            dateFormat: 'm/d/Y'
        });
    }
});
Ext.define("Ext.locale.th.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});
Ext.define("Ext.locale.th.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} ร\xa0ร\u2026ร\u2014รยกรกร\u2026รฉรยทร\u2018รฉยงรรลฝรกยถร"
});
Ext.define("Ext.locale.th.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "ยปร\u201dลฝรกยทรงยบยนร\u2022รฉ"
});
Ext.define("Ext.locale.th.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "โฌรจร\u2019ยขรยงยชรจรยงยนร\u2022รฉรครรจยถรยกยตรฉรยง"
});
// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.th.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "ยกร\u201cร\u2026ร\u2018ยงรขรร\u2026ลฝ..."
});
Ext.define("Ext.locale.th.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "รร\u2018ยนยนร\u2022รฉ",
    minText: "This date is before the minimum date",
    maxText: "This date is after the maximum date",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'ร\xa0ลฝร\u2014รยนยถร\u2018ลฝรคยป (Control+Right)',
    prevText: 'ร\xa0ลฝร\u2014รยนยกรจรยนรยนรฉร\u2019 (Control+Left)',
    monthYearText: 'ร\xa0ร\u2026ร\u2014รยกร\xa0ลฝร\u2014รยน (Control+Up/Down to move years)',
    todayTip: "{0} (Spacebar)",
    format: "m/d/y",
    startDay: 0
});
Ext.define("Ext.locale.th.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;ยตยกร\u2026ยง&#160;",
    cancelText: "รยกร\xa0ร\u2026ร\u201dยก"
});
Ext.define("Ext.locale.th.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "รยนรฉร\u2019",
    afterPageText: "of {0}",
    firstText: "รยนรฉร\u2019รกรยก",
    prevText: "ยกรจรยนรยนรฉร\u2019",
    nextText: "ยถร\u2018ลฝรคยป",
    lastText: "รยนรฉร\u2019รรลฝยทรฉร\u2019ร",
    refreshText: "รร\u2022ร\xa0ยฟรยช",
    displayMsg: "ยกร\u201cร\u2026ร\u2018ยงรกรลฝยง {0} - {1} ลกร\u2019ยก {2}",
    emptyMsg: 'รครรจรร\u2022ยขรฉรรรร\u2026รกรลฝยง'
});
Ext.define("Ext.locale.th.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "The minimum length for this field is {0}",
    maxLengthText: "The maximum length for this field is {0}",
    blankText: "This field is required",
    regexText: "",
    emptyText: null
});
Ext.define("Ext.locale.th.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "The minimum value for this field is {0}",
    maxText: "The maximum value for this field is {0}",
    nanText: "{0} is not a valid number"
});
Ext.define("Ext.locale.th.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "ยปร\u201dลฝ",
    disabledDatesText: "ยปร\u201dลฝ",
    minText: "The date in this field must be after {0}",
    maxText: "The date in this field must be before {0}",
    invalidText: "{0} is not a valid date - it must be in the format {1}",
    format: "m/d/y",
    altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
});
Ext.define("Ext.locale.th.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "ยกร\u201cร\u2026ร\u2018ยงรขรร\u2026ลฝ..."
    });
});
Ext.define("Ext.locale.th.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'This field should be an e-mail address in the format "user@example.com"',
    urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
    alphaText: 'This field should only contain letters and _',
    alphanumText: 'This field should only contain letters, numbers and _'
});
Ext.define("Ext.locale.th.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});
Ext.define("Ext.locale.th.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sort Ascending",
    sortDescText: "Sort Descending",
    lockText: "Lock Column",
    unlockText: "Unlock Column",
    columnsText: "Columns"
});
Ext.define("Ext.locale.th.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(None)',
    groupByText: 'Group By This Field',
    showGroupsText: 'Show in Groups'
});
Ext.define("Ext.locale.th.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Name",
    valueText: "Value",
    dateFormat: "m/j/Y"
});
Ext.define("Ext.locale.th.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "ยตยกร\u2026ยง",
        cancel: "รยกร\xa0ร\u2026ร\u201dยก",
        yes: "รฃยชรจ",
        no: "รครรจรฃยชรจ"
    }
});
// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.th.Component", {
    override: "Ext.Component"
});

