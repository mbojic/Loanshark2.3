/*
 * File: app/view/Summary.js
 *
 * This file was generated by Sencha Architect version 3.0.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.view.Summary', {
    extend: 'Ext.Container',
    alias: 'widget.Summary',

    requires: [
        'Ext.Img',
        'Ext.XTemplate'
    ],

    config: {
        id: 'SummaryView',
        layout: 'fit',
        items: [
            {
                xtype: 'image',
                src: 'resources/images/sharky.png'
            },
            {
                xtype: 'component',
                cls: 'tpl-2z95517n',
                docked: 'bottom',
                id: 'summaryContents',
                tpl: [
                    '<div class="summary-contents">',
                    '    You\'re Owed: $ {[((values.totalDebt < 0)? \'- \':\'\')]} {[values.totalDebt.toFixed(2)]}',
                    '</div>'
                ]
            }
        ]
    }

});