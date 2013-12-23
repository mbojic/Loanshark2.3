/*
 * File: app/model/Person.js
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

Ext.define('Payback.model.Person', {
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
                name: 'name',
                type: 'string'
            },
            {
                name: 'phone',
                type: 'string'
            },
            {
                name: 'email',
                type: 'string'
            },
            {
                defaultValue: 0,
                name: 'balance'
            }
        ],
        proxy: {
            type: 'localstorage',
            id: 'Persons'
        }
    },

    calcBalance: function() {
        //calculate total amount owed for all debts by the person
        var debtsStore = Ext.getStore('DebtsStore'),
            sum;

        debtsStore.clearFilter();
        debtsStore.filter('person_id',this.get('id'));

        sum = debtsStore.sum('balance');

        debtsStore.clearFilter();

        this.set('balance', sum);
    },

    cascadeDelete: function() {
        var debtsStore = Ext.getStore('DebtsStore');

        debtsStore.clearFilter();
        debtsStore.filter('person_id',this.get('id'));

        debtsStore.each(function(debt){
            debt.cascadeDelete();
        });

        debtsStore.clearFilter();
        this.erase();

    }

});