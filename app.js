/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'Ext.Loader'
    ],
    models: [
        'Payment',
        'Debt',
        'Person'
    ],
    stores: [
        'PeopleStore',
        'DebtsStore',
        'PaymentStore'
    ],
    views: [
        'MainView',
        'ContactDetail',
        'DebtDetail',
        'PaymentDetail',
        'ContactListItem',
        'DebtListItem',
        'PaymentListItem',
        'Contacts',
        'Debts',
        'Summary'
    ],
    controllers: [
        'Summary',
        'Contact',
        'Debt',
        'Payment'
    ],
    icon: {
        57: 'resources/images/splash/icons/Icon.png',
        72: 'resources/images/splash/icons/Icon~ipad.png',
        114: 'resources/images/splash/icons/Icon@2x.png',
        144: 'resources/images/splash/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    name: 'Payback',
    startupImage: {
        '320x460': 'resources/images/splash/loading/Default.png',
        '640x920': 'resources/images/splash/loading/Default@2x.png',
        '768x1004': 'resources/images/splash/loading/Default~ipad',
        '748x1024': 'resources/images/splash/loading/Default-Landscape~ipad.png'
    },

    launch: function() {

        Ext.create('Payback.view.MainView', {fullscreen: true});
    }

});
