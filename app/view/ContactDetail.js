/*
 * File: app/view/ContactDetail.js
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

Ext.define('Payback.view.ContactDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ContactDetail',

    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.dataview.DataView',
        'Ext.Toolbar',
        'Ext.Spacer'
    ],

    config: {
        height: 'auto',
        hidden: true,
        id: 'ContactDetail',
        autoDestroy: false,
        hideAnimation: {
            type: 'slideOut',
            direction: 'right'
        },
        showAnimation: {
            type: 'slide',
            direction: 'left'
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: 'Prey Details',
                items: [
                    {
                        xtype: 'button',
                        id: 'cancelContact',
                        iconCls: 'icon-back'
                    }
                ]
            },
            {
                xtype: 'label',
                cls: 'loanshark-header-label',
                height: 100,
                id: 'contactHeaderLabel'
            },
            {
                xtype: 'button',
                cls: 'loanshark-add-button',
                itemId: 'addDebt',
                text: 'New Debt'
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Name',
                        labelAlign: 'top',
                        name: 'name'
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        labelAlign: 'top',
                        name: 'email',
                        placeHolder: 'email@example.com'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Phone',
                        labelAlign: 'top',
                        name: 'phone'
                    }
                ]
            },
            {
                xtype: 'label',
                html: 'Outstanding Debts',
                itemId: 'debtHistoryLabel'
            },
            {
                xtype: 'dataview',
                itemId: 'debtDataView',
                minHeight: 64,
                padding: '4 0 4 0',
                scrollable: false,
                defaultType: 'DebtListItem',
                emptyText: 'No Debts',
                store: 'DebtsStore',
                useComponents: true
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'saveContact',
                        iconCls: 'icon-save'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onDebtDataViewRefresh',
                event: 'refresh',
                delegate: '#debtDataView'
            }
        ]
    },

    onDebtDataViewRefresh: function(dataview, eOpts) {
        var nrItems = Ext.getStore('DebtsStore').getCount();
        if (nrItems > 0) {
            dataview.setHeight(nrItems*64 + 8);
        } else {
            dataview.setHeight(64);
        }
    },

    updateContactHeaderLabel: function() {
        //updates total amount owed in the contact detail header
        var record = this.getRecord(),
            totalDebtString,
            subTitle;
        if (record) {
            subTitle = record.get('name') + ' owes';
            if (record.get('balance') === 0) {
                totalDebtString = 'No Debts';
            } else {
                totalDebtString = '$ ' + ((record.get('balance')<0)?'-':'') + record.get('balance').toFixed(2);
            }
            this.down('#contactHeaderLabel').setHtml(
                "<span class='sub-title'>" + subTitle + "</span>" +
                "<span class='title'>" + totalDebtString + "</span>"
            );
        }
    },

    setTransition: function() {
        //sets the animation direction to follow clickthrough to debtDetail correctly
        this.setHideAnimation({
            type: 'slideOut',
            direction: 'left'
        });
        this.setShowAnimation({
            type: 'slide',
            direction: 'right'
        });
    },

    resetTransition: function() {
        //sets the animation direction to follow clickthrough to debtDetail correctly
        this.setHideAnimation({
            type: 'slideOut',
            direction: 'right'
        });
        this.setShowAnimation({
            type: 'slide',
            direction: 'left'
        });
    }

});