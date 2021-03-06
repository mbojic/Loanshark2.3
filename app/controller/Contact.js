/*
 * File: app/controller/Contact.js
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

Ext.define('Payback.controller.Contact', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'PeopleStore'
        ],
        views: [
            'Contacts',
            'ContactDetail'
        ],

        refs: {
            addContact: 'button#addContact',
            deleteContact: 'button#deleteContact',
            cancelContact: 'button#cancelContact',
            saveContact: 'button#saveContact',
            addDebt: '#ContactDetail button#addDebt',
            contactHeaderLabel: 'label#contactHeaderLabel',
            debtHistoryLabel: 'label#debtHistoryLabel',
            contactDetail: {
                autoCreate: true,
                selector: 'formpanel#ContactDetail',
                xtype: 'ContactDetail'
            },
            contacts: 'panel#Contacts',
            mainView: 'tabpanel#MainView',
            debtDataView: '#ContactDetail dataview#debtDataView',
            contactDataView: 'dataview#contactDataView'
        },

        control: {
            "#addContact": {
                tap: 'onAddContactTap'
            },
            "#contactDataView #contactListItemDetail #deleteContact": {
                tap: 'onDeleteContactTap'
            },
            "#Contacts #contactDataView": {
                itemtap: 'onContactTap'
            },
            "#cancelContact": {
                tap: 'onCancelContactTap'
            },
            "#saveContact": {
                tap: 'onSaveContactTap'
            },
            "#ContactDetail": {
                activate: 'onContactDetailActivate'
            },
            "dataview#contactDataView": {
                itemswipe: 'onContactDataViewItemSwipe'
            },
            "#MainView": {
                deactivate: 'onMainViewDeactivate',
                activeitemchange: 'onMainViewActiveItemChange'
            }
        }
    },

    onAddContactTap: function(button, e, eOpts) {
        //reset record
        this.getContactDetail().setRecord(null);

        //activate contact detail view
        Ext.Viewport.setActiveItem(this.getContactDetail());
    },

    onDeleteContactTap: function(button, e, eOpts) {
        //prevent event triggering onContactTap by accident
        e.stopEvent();

        //get the person record to delete
        var person = button.getData(),
            peopleStore = Ext.getStore('PeopleStore'),
            debtsStore = Ext.getStore('DebtsStore'),
            paymentStore = Ext.getStore('PaymentStore');

        //make sure all delete buttons are resetted after removing a contact
        this.resetDeleteButtonsContactDataView();

        person.cascadeDelete();

        paymentStore.load();
        debtsStore.load();
        peopleStore.load();


    },

    onContactTap: function(dataview, index, target, record, e, eOpts) {
        //set record for the contact detail
        var contactDetail = this.getContactDetail(),
            debtsStore = Ext.getStore('DebtsStore'),
            nrItems;

        contactDetail.setRecord(record);

        //activate contact detail view
        Ext.Viewport.setActiveItem(contactDetail);
    },

    onCancelContactTap: function(button, e, eOpts) {
        //reset form
        this.getContactDetail().reset();

        //reset record
        this.getContactDetail().setRecord(null);

        //hide dataview so refresh of the store is not visible during animation
        this.getDebtDataView().hide();

        //reset filter
        Ext.getStore('DebtsStore').clearFilter();

        //reset animation
        this.getContactDetail().resetTransition();

        //return to main view
        Ext.Viewport.setActiveItem(this.getMainView());
    },

    onSaveContactTap: function(button, e, eOpts) {
        var contactDetail = this.getContactDetail(),
            record = contactDetail.getRecord(),
            values = contactDetail.getValues(),
            peopleStore = Ext.getStore('PeopleStore'),
            debtsStore = Ext.getStore('DebtsStore');

        //check that at least the name is specified
        if (!values.name) {
            //if there is no name, prompt user to enter one
            new Ext.MessageBox().show({
                message: 'You need to call your prey something!'
            });
        } else {
            //if record exists
            if(record) {
                //save values to the record
                record.set(values);
                record.calcBalance();
                record.save();
            } else {
                //else create a new record
                record = Ext.create('Payback.model.Person', values);
                //new person has no debts, so no need to calcBalance
                peopleStore.add(record);
            }
            //reset form
            contactDetail.reset();
            //reset record
            contactDetail.setRecord(null);
            //hide dataview so refresh of the store is not visible during animation
            this.getDebtDataView().hide();
            //clear debtsStore filter
            debtsStore.clearFilter();
            //reset animation
            this.getContactDetail().resetTransition();
            //return to main view
            Ext.Viewport.setActiveItem(this.getMainView());

            peopleStore.load();
            debtsStore.load();

            //make sure all delete buttons are resetted after adding a new contact
            this.resetDeleteButtonsContactDataView();

        }
    },

    onContactDetailActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        var record = this.getContactDetail().getRecord();

        //scroll to top
        this.getContactDetail().getScrollable().getScroller().scrollTo(0, 0, false);

        if (record) {

            //show debt history and add debt button
            this.getDebtHistoryLabel().show();
            this.getAddDebt().show();
            this.getContactHeaderLabel().show();
            this.getDebtDataView().show();

            //filter the debt store to show only relevant debts
            Ext.getStore('DebtsStore').clearFilter();
            Ext.getStore('DebtsStore').filter("person_id", record.get('id'));

            this.getContactDetail().updateContactHeaderLabel();

        } else {

            //hide contact loan history - there is none yet
            this.getDebtHistoryLabel().hide();
            this.getAddDebt().hide();
            this.getContactHeaderLabel().hide();
            this.getDebtDataView().hide();

        }
    },

    onContactDataViewItemSwipe: function(dataview, index, target, record, e, eOpts) {
        var nrItems = dataview.getStore().getCount(),
            i;

        //activate on left swipe only
        if (e.direction === 'left') {
            //turn off all other delete buttons in items
            for (i = 0; i < nrItems; i++) {
                if (i !== index) {
                    dataview.getItemAt(i).hideDeleteButton();
                }
            }
            target.showDeleteButton();
        }

        //and deactivate on right swipe
        if (e.direction === 'right') {
            target.hideDeleteButton();
        }
    },

    onMainViewDeactivate: function(oldActiveItem, container, newActiveItem, eOpts) {
        //make sure all delete buttons are resetted after switching a view
        this.resetDeleteButtonsContactDataView();

    },

    onMainViewActiveItemChange: function(container, value, oldValue, eOpts) {
        //make sure if we go to a different tab then contacts that
        //delete buttons are resetted
        if (oldValue === this.getContacts()) {
            this.resetDeleteButtonsContactDataView();
        }

    },

    resetDeleteButtonsContactDataView: function() {
        //hides all delete buttons in contactDataView
        var nrItems = this.getContactDataView().getStore().getCount(),
            i;

        for (i = 0; i < nrItems; i++) {
            if (this.getContactDataView().getItemAt(i)) {
                this.getContactDataView().getItemAt(i).hideDeleteButton();
            }
        }
    }

});