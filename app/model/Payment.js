/*
 * File: app/model/Payment.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
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

Ext.define('Payback.model.Payment', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.LocalStorage'
    ],

    config: {
        identifier: {
            type: 'uuid'
        },
        fields: [
            {
                name: 'id',
                type: 'auto'
            },
            {
                name: 'debt_id',
                type: 'auto'
            },
            {
                name: 'amount',
                type: 'float'
            },
            {
                name: 'date',
                type: 'date'
            },
            {
                name: 'note',
                type: 'string'
            }
        ],
        proxy: {
            type: 'localstorage',
            id: 'Payments'
        }
    }
});