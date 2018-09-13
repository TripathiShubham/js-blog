/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * @author alaurito
 *
 * include list : 2663_lib.js
 */

/**
 * Revision History:
 *
 * Date        Fixed Issue    Broken in QA Bundle     Issue Fix Summary
 * =============================================================================================
 * 2011/06/08  199331         1.00.2011.05.27.01      Remove "EFT" strings in alert
 * 2011/07/18  201832         1.04.2011.07.15.01      Faster processing for marking all payments
 * 2011/07/27  202422         1.06.2011.07.29.01      Set custom labels from Rename Records
 * 2011/08/12  203530         1.07.2011.08.11.01      Fix for 1000 record limit
 * 2011/08/17  203853         1.07.2011.08.18.02      Parallel runs for payment scheduled script
 * 2011/08/25  204379         1.08.2011.08.25.02      Support for large volume processing
 * 2011/08/31  204379         1.08                    Add pages to sublist - can select number of
 *                                                    transactions per page; Divide selected lines
 *                                                    by pages and place them on different fields
 *                                                    to avoid field length error
 * 2011/08/31  204648         1.09                    Reset mark all, sublist page, and marked lines
 *                                                    when calling search based on filters
 * 2011/09/01  204696         1.09                    Reset mark all when changing the transactions
 *                                                    per page
 * 2011/09/06  204888         1.11.2011.09.08.02      Set process date to current date only when not
 *                                                    yet set in suitelet; Disabled aggregation
 *                                                    method when check box is unchecked
 * 2011/09/12  205257         1.11.2011.09.15.01      Restrict subsidiary view based on user's
 *                                                    permissions
 * 2011/09/15  205014         1.10                    Set flags for making DCL fields mandatory
 *                                                    Merge checking for EFT and DD suitelets
 * 2011/11/04  208589         1.15.2011.11.10.2       Get current date/time and assign to timestamp field
 * 2011/12/19  211435         1.18.2011.12.22.1       Add "On Hold" filter for account id's and exclude
 *                                                    bills with "Hold Payment" = T when it is set to T
 * 2012/01/31  213961         1.19.2012.01.12.1       Rollback Positive Pay code
 * 2012/02/02  212974         1.19.2012.01.19.1       Support for Positive Pay file option
 *             213421         1.19.2012.01.19.4       Change error message for Positive Pay when there are
 *                                                    no cheques for processing
 * 2012/02/13  214598         1.19.2012.02.09.2       Void lines are not considered as marked when submitting
 *                                                    for Positive Pay suitelet
 *             214599         1.19.2012.02.09.2       Set the Cheque From and Cheque To fields as blank when
 *                                                    "Void" checkbox is toggled
 * 2012/03/13  216909         1.19.2.2012.03.01.2     Move field validation processing to fieldChanged function
 * 2012/03/30  218903         1.20.1.2012.03.29.3     Additional filter implementation (initially for Groupon)
 * 2012/05/01  220840         1.22                    Control payment processing through queue management
 * 2012/08/01  227867         2.01.1                  Refactor for payment portal functionality
 * 2012/08/03  227867         2.01.1                  Changes based on FRD
 * 2012/08/03  227868         2.01.1                  Added "canStartPaymentProcessing" checking for Deferred batch
 * 2012/08/13  227867         2.01.1                  Add support for customer refund
 * 2012/09/10  227868         2.01.1                  Add handling for Show Summarized field
 * 2012/09/17  227868         2.01.1                  Changes to user interface
 * 2012/10/04  232761         2.01.1                  Fixes for unit test automation scripts
 * 2012/11/03  234020         2.01                    Remove setting of dropdown list when line is checked
 * 2012/11/22  237873         2.00.3                  Add event handling for currency and exchange rate related fields
 * 2012/12/17  238204         2.00.5                  Additional handling for multiselect field
 * 2013/01/04  239044         2.00.6                  Set name to sublistClient.MarkProperty when payment amount is updated
 * 2013/01/15  238208         2.00.5                  Add handling for Exclude Cleared Checks field
 * 2013/01/18  240495         2.00.5                  Set exchangerate only when exchange rate for currency is in
 * 													  custpage_2663_exchange_rates field
 * 2013/03/04  244623         2.00                    Update to support Reversal and Notifications
 * 2013/03/11  245306         2.00.10                 Update posting period with next open posting period if date falls on closed period
 * 2013/03/11  245308         2.00.10                 Validate date to period values based on Accounting Preference ('DATEPERIODMISMATCH')
 * 2013/03/19  245306         2.00.10                 Get next open posting period only if nextOpen parameter is true
 * 2013/04/15  248888   	  2.00.12				  Add Approve and Save functions
 * 2013/04/17  249227   	  2.00.13				  Closed batch must have at least 1 transaction
 * 2013/06/17  254204 		  2.00.18				  Update warning message
 * 2013/07/15  245723		  2.00.10				  Add support for commission transactions
 * 2013/07/15  262862		  2.01.00				  Move check if payment processing may start into CS script
 * 2013/09/23  255091		  2.00.18				  Add aggregate check box setup for payment type dd
 * 2013/09/24  263190		  3.00.00				  Add handling for approval routing
 * 2013/09/25  263190 		  3.00.00				  Resolve url of updater restlet
 * 2013/09/19  263190 		  3.00.00				  Fix typo and use name from Batch record
 * 2013/09/27  263190 		  3.00.00				  Add handling for summarized field
 * 													  Add edit mode
 * 2013/09/30  264794 		  3.00.00				  Replace nlapiSubmitField with nlapiSubmitRecord
 * 2013/10/01  264897 		  3.00.00				  Execute validations before saving
 * 2013/10/05  265406 		  3.00.00				  Refactor code to use Payment File Administration record instead of Payment Batch
 * 2013/11/07  267832 		  3.00.0.2013.10.31.1	  Set page to view mode after saving record
 * 2013/11/07  266635 		  3.00.00				  Add validation on Reference note on view mode
 * 2013/11/26                 3.00.00				  Add clearing of email templates when email notes field is populated, and vice versa
 * 2013/11/26                 3.00.00				  Add field validation for notification
 * 2013/12/06  271895         3.01.0.2013.12.10.4     Added codes for restoring sourced email to recipient when unchecking transactions
 * 2013/12/06  272063         3.01.0.2013.12.10.4     Update checking of email recipients
 * 2013/12/09  272111         3.01.0.2013.12.10.4     Edited checking of email to only check "To:" recipient and not cc and bcc.
 * 2013/12/20  270887         3.00.0     	  		  Call upsertBatch when Automated batch processing is enabled
 * 2013/12/20  272780         3.00.0     	  		  Use current mark object property amount when is reset
 * 2014/01/24  273463 		  3.00.10				  Include Transaction Entities field in batch update
 * 													  Do not reset payment amount when processing a manual or automated batch
 * 2014/04/10  276510                                 Add adminSubmitField function and use this to run submits for company bank fields
 * 2014/04/29  201833								  Add support for EP plugin
 * 2014/04/29  298156		  4.00.0.a				  Add version check for UI reskin on 14.2
 * 2014/08/13  298378		  4.00.3.2014.08.19.4     Add checking for EFT file reference note input before Approval of payment batch
 * 2014/08/13  298932		  4.00.3.2014.08.19.4     Added fix for setting exchangeRate to 1 if not existing in map.
 * 2014/08/18  290770		  4.00                    Correct logic of checking for maximum selected lines
 * 2014/08/22  298378		                          Added return value when file reference note is empty
 *             304354                                 Support term or early settlement discounts for Bill Payment Processing
 * 2014/09/11  304338		                          Add validations for customer credits in Invoice Payment Processing page
 * 2014/09/18  304338		  4.00.3.2014.00.00.0     Use record type instead of name to be immune from possible transaction renames
 *                                                    Add entity-currency grouping net amount validation to handle transactions of multiple currencies
 * 2014/09/22  304354								  Support for term or early settlement discount for Bill Payment Processing
 * 2014/09/30  311187								  Update user messages involving credits
 * 2014/10/01  309316                                 Include credits in bill payment processing page
 * 2014/10/01  304354		  4.00.1.2014.09.23.2     Support for term or early settlement discount for Bill Payment Processing update
 * 2014/10/08  304356         4.00.3                  Include discount column in auto-batch page
 * 2014/10/13  312714         4.00.1.2014.10.14.3     Added checking if discAmount is zero for non vendorbill and non invoice transactions
 * 2014/10/15  313054 		  4.00.4.2014.09.16.1	  Use termsdiscountdate column name to source Disc Date from bill
 * 2014/10/14  312757         4.00.3                  Recalculate discount amount and payment amount when process date is changed
 * 2014/10/15  311282         4.00.3                  Include update of PFA after Approval regardless of approval routing preference
 * 2014/10/15  313222         4.00.3                  Include entity name in warning message for net payment amount
 * 2014/10/22  312714         4.00.3                  Added checking if discAmount is zero
 * 2014/10/23  314042         4.00.1.2014.10.21.4     Fixed Total Payment Amount computation when selecting bills in different currencies
 * 2014/10/30  314871         4.00.1.2014.11.04.1     Fixed Total Payment Amount computation for bills in different currencies when changing Date to be Processed field
 * 2014/10/31  314871         4.00.1.2014.11.04.1     Fixed performance issue
 *
 */

var psg_ep; 

var MESSAGEMAP_ALERT ;

if (!psg_ep)
    psg_ep = {};

/**
 * Page initializer
 */
function ep_PageInit() {
	MESSAGEMAP_ALERT = JSON.parse(nlapiGetFieldValue('custpage_translation_messages'));

	// version check
	var isSeinfeld = nlapiGetContext().getVersion() == '2014.1';
	// dcl flags
    psg_ep.isDepartmentFlag = isDepartment();
    psg_ep.isClassFlag = isClass();
    psg_ep.isLocationFlag = isLocation();

    //for multi-select fields
    psg_ep.initValues = {};
    var custPaymentType = nlapiGetFieldValue('custpage_2663_custbody_payment_type');
    if (custPaymentType) {
    	psg_ep.initValues['custpage_2663_custbody_payment_type'] = custPaymentType;
    }


    // multicurrency flag
    psg_ep.isMultiCurrencyFlag = isMultiCurrency();

    // set the custom submit button classes
    var buttonClass = isSeinfeld ? 'pgBntY' : 'pgBntG pgBntB';
    if (document.getElementById("tr_custpage_submitter")){
        document.getElementById("tr_custpage_submitter").className = buttonClass;
    }
    if (document.getElementById("tr_secondarycustpage_submitter")) {
        document.getElementById("tr_secondarycustpage_submitter").className = buttonClass;
    }

    // set original form action
    psg_ep.origFormUrl = document.forms.main_form.action;

    // client object
    var paymentType = nlapiGetFieldValue('custpage_2663_paymenttype');

    if (paymentType == 'eft') {
        if (!nlapiGetField('custpage_2663_batch')) {
            psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_EFT();
        }
        else {
            psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_EFTPortalBatch();
        }
    }
    else if (paymentType == 'dd') {
        psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_DD();
    }
    else if (paymentType == 'pp') {
        psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_PP();
    }
    else if (paymentType == 'custref') {
        psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_CustomerRefund();
    }
    else if (paymentType == 'reversal') {
    	psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_Reversal();
    }
    // NOTE: For deprecation
    else if (paymentType == 'notification') {
    	psg_ep.PaymentSelectionClientObj = new psg_ep.PaymentSelectionClient_Notification();
    }
    else {
		showAlertMsg('Error - payment type is not set.');
        return;
    }

	if(nlapiGetFieldValue('custpage_2663_process_date_millis')){
		var date = new Date( parseInt( nlapiGetFieldValue('custpage_2663_process_date_millis') ) );
		nlapiSetFieldValue('custpage_2663_process_date', nlapiDateToString(date), false);
	}

    // set the processing date
    if (!nlapiGetFieldValue('custpage_2663_process_date')) {

		var date = new Date();
		var millis = date.getTime();

        nlapiSetFieldValue('custpage_2663_process_date', nlapiDateToString(date));
		nlapiSetFieldValue('custpage_2663_process_date_millis', millis, false);
    }

    if (nlapiGetFieldValue('custpage_2663_summarized_placeholder') != 'T') {
        psg_ep.PaymentSelectionClientObj._commonClient.RecalcLines();
    }

}

function isVPAEnabled(){    	    	
	var restLetURL = nlapiResolveURL('restlet', 'customscript_12050_runtime_settings_rs', 'customdeploy_12050_runtime_settings_rs');
	var url = [restLetURL, '&type=', 'isVPAEnabled'].join('');
	var subsidiaryId = nlapiGetFieldValue('custpage_2663_subsidiary');
	url = [url, '&subsidiaryId=', subsidiaryId].join('');
	var headers = {'User-Agent-x': 'SuiteScript-Call', 'Content-Type': 'application/json'};
	var response = nlapiRequestURL(url, null, headers);
	return JSON.parse(response.getBody());    	
}

/**
 * Field changed
 *
 * @param {String} type
 * @param {String} name
 * @param {Number} lineNum
 */
function ep_FieldChanged(type, name, lineNum) {
    if (psg_ep.PaymentSelectionClientObj) {
        psg_ep.PaymentSelectionClientObj.FieldChanged(type, name, lineNum);
    }
}

/**
 * Mark all transactions
 */
function ep_MarkAll() {
    if (psg_ep.PaymentSelectionClientObj) {
        // set mark all flag to true
        nlapiSetFieldValue('custpage_2663_sublist_mark_all', 'T', false);

        psg_ep.PaymentSelectionClientObj._commonClient.RefreshPage();
    }
}

/**
 * Unmark all transactions
 */
function ep_UnmarkAll() {
    if (psg_ep.PaymentSelectionClientObj) {
        // unset the lines
        psg_ep.PaymentSelectionClientObj._commonClient._unsetLines();

        // set mark all flag to false
        nlapiSetFieldValue('custpage_2663_sublist_mark_all', 'F', false);

        psg_ep.PaymentSelectionClientObj._commonClient.RefreshPage();
    }
}

/**
 * Save the record
 *
 * @returns {Boolean}
 */
function ep_SaveRecord() {

	if(!checkApprovalandVPA()){
		return false; //block process and return
	}

    if (psg_ep.PaymentSelectionClientObj) {
        return psg_ep.PaymentSelectionClientObj.SaveRecord();
    }
    else {
        return false;
    }
}

/**
 * Function to submit form (don't use Submit button from API)
 */
function ep_SubmitForm() {
	// set the refresh flag
	nlapiSetFieldValue('custpage_2663_refresh_page', 'F', false);

	var url = nlapiResolveURL('suitelet', 'customscript_2663_payment_sel_proc_s', 'customdeploy_2663_payment_sel_proc_s');
	
	if (!document.forms['main_form'].onsubmit || document.forms['main_form'].onsubmit()) {
		var approvalRoutingEnabled = nlapiGetFieldValue('custpage_2663_approval_routing') == 'T';
		var bankAccount = nlapiGetFieldValue('custpage_2663_bank_account');
		var batchId = nlapiGetFieldValue('custpage_2663_batchid');
		if (bankAccount && (approvalRoutingEnabled || batchId)) {
			if (!nlapiGetFieldValue('custpage_2663_payment_ref')) {
				showAlertMsg(MESSAGEMAP_ALERT['refnote']);
				return false;
			}

			var approvalAmount = nlapiGetFieldValue('custpage_2663_approval_amount') * 1;
	    	var paymentLimit = nlapiLookupField('customrecord_2663_bank_details', bankAccount, 'custrecord_2663_bank_payment_limit') * 1;
	    	if (paymentLimit && approvalAmount > paymentLimit) {
	    		var paymentValidator = new psg_ep.PaymentSelectionValidator();
	    		// Check if no batch is currently being updated
	    		var account = nlapiGetFieldValue('custpage_2663_ap_account');
	    		var subsidiaryId = nlapiGetFieldValue('custpage_2663_subsidiary');
	    		if (batchId || paymentValidator.CanStartBatchCreation(bankAccount, account, subsidiaryId)) {
	    			if (upsertBatch(bankAccount, batchId, true)) {
	    				url = '/app/common/search/searchresults.nl?searchid=customsearch_2663_payment_batches';
	    			} else {
	    				return false;
	    			}
	    		} else {
	    			return false;
	    		}
	    	} else if (batchId) {
	    		upsertBatch(bankAccount, batchId, false, true);
	    	}
		}
		document.forms.main_form.action = url;
		// suppress the alert
	    setWindowChanged(window, false);
	    document.forms['main_form'].submit();
	}
	return false;
}

/**
 * Function to go back to PFA record
 */
function ep_Cancel() {
	setWindowChanged(window, false);
	var cancelUrl = '/app/common/search/searchresults.nl?searchid=customsearch_2663_payment_file_admin';
	var recId = nlapiGetFieldValue('custpage_2663_file_id');
	if (recId) {
		cancelUrl = nlapiResolveURL('RECORD', 'customrecord_2663_file_admin', recId);
	}

	location.assign(cancelUrl);
}

/**
 * Function to Approve batch
 */
function ep_Approve() {
	
	if(!checkApprovalandVPA()){
		return false; //block process and return
	}	
	
	// set the refresh flag
	nlapiSetFieldValue('custpage_2663_refresh_page', 'F', false);

	var url = nlapiResolveURL('suitelet', 'customscript_2663_payment_sel_proc_s', 'customdeploy_2663_payment_sel_proc_s');

	if (!document.forms['main_form'].onsubmit || document.forms['main_form'].onsubmit()) {

		if (!nlapiGetFieldValue('custpage_2663_payment_ref')) {
			showAlertMsg(MESSAGEMAP_ALERT['refnote']);
			return false;
		}

        var bankAccount = nlapiGetFieldValue('custpage_2663_bank_account');
        var batchId = nlapiGetFieldValue('custpage_2663_batchid');
        var approvalRoutingEnabled = nlapiGetFieldValue('custpage_2663_approval_routing') == 'T';
		if (approvalRoutingEnabled) {

			url = '/app/common/search/searchresults.nl?searchid=customsearch_2663_payment_batches';
			if (bankAccount && batchId) {
				var batch = nlapiLoadRecord('customrecord_2663_file_admin', batchId);
				var approvalAmount = nlapiGetFieldValue('custpage_2663_approval_amount') * 1;
		    	var approvalLevel = batch.getFieldValue('custrecord_2663_approval_level');
		    	var approvalRoutingId = getApprovalRoutingId(bankAccount, approvalLevel);
		    	if (approvalRoutingId) {
		    		var paymentLimit = (nlapiLookupField('customrecord_2663_approval_routing', approvalRoutingId, 'custrecord_2663_ar_limit')) * 1;
	            	if (paymentLimit && approvalAmount > paymentLimit) {
	            		if (approvalLevel == APPROVAL_LEVEL3) {
	            			showAlertMsg(MESSAGEMAP_ALERT['paymentlimit']);
	            		} else if (upsertBatch(bankAccount, batchId)) {
	        				var nextLevel = (approvalLevel * 1) + 1;
	                		if (nextLevel <= APPROVAL_LEVEL3) {
	                			nlapiSetFieldValue('custpage_2663_edit_mode', 'F', false);
	                			batch.setFieldValue('custrecord_2663_approval_level', nextLevel);
	                			nlapiSubmitRecord(batch);
	                		}
	            		}
	            	} else if (upsertBatch(bankAccount, batchId)) {
	            		url = nlapiResolveURL('suitelet', 'customscript_2663_payment_sel_proc_s', 'customdeploy_2663_payment_sel_proc_s');
	            	}
		    	} else {
		    		showAlertMsg(MESSAGEMAP_ALERT['incroutingsetup']);
		    	}
			}
		}
        else if (upsertBatch(bankAccount, batchId)) {
            url = nlapiResolveURL('suitelet', 'customscript_2663_payment_sel_proc_s', 'customdeploy_2663_payment_sel_proc_s');
        }

		document.forms.main_form.action = url;
		// suppress the alert
	    setWindowChanged(window, false);
	    document.forms['main_form'].submit();
	}
}

function checkApprovalandVPA(){
    var result = true;    

    if (JSON.parse( isVPAEnabled() ).isVPAEnabled) {
        alert(MESSAGEMAP_ALERT['EP_00115']);
        result = false;
    }	
    
    return result;
}

/**
 * Save current state of Batch
 */
function ep_Save() {
	var bankAccount = nlapiGetFieldValue('custpage_2663_bank_account');
	var batchId = nlapiGetFieldValue('custpage_2663_batchid');
	if (bankAccount && batchId) {
		if (!document.forms['main_form'].onsubmit || document.forms['main_form'].onsubmit()) {
			upsertBatch(bankAccount, batchId);

			// set the refresh flag
		    nlapiSetFieldValue('custpage_2663_refresh_page', 'T', false);

            // set to view mode
            nlapiSetFieldValue('custpage_2663_edit_mode', 'F', false);

		    // suppress the alert
		    setWindowChanged(window, false);

		    // submit the form -- calls submitForm function
		    document.forms.main_form.submit();
		}
	}
}

/**
 * Load page on Edit mode
 */
function ep_Edit() {
	
	if(!checkApprovalandVPA()){
		return false; //block process and return
	}
	
    // set the refresh flag
	nlapiSetFieldValue('custpage_2663_edit_mode', 'T', false);
    nlapiSetFieldValue('custpage_2663_refresh_page', 'T', false);

    // suppress the alert
    setWindowChanged(window, false);

    // submit the form -- calls submitForm function
    document.forms.main_form.submit();
}

/**
 * Reject and remove all transactions from Batch
 */
function ep_Reject() {		
	
	var batchId = nlapiGetFieldValue('custpage_2663_batchid');
	if (batchId && rejectBatch(batchId)) {
		var url = '/app/common/search/searchresults.nl?searchid=customsearch_2663_payment_batches';
		// suppress the alert
	    setWindowChanged(window, false);

	    location.assign(url);
	}
}

/**
 * Returns selected transaction keys (ex. 100-1)
 *
 * @returns {Array}
 */
function getSelectedTransactionKeys() {
    var totalPages = parseInt(nlapiGetFieldValue('custpage_2663_sublist_numpages'));
    var selectedTransKeys = [];
    if (totalPages) {
        for (var i = 1; i <= totalPages; i++) {
            var markedLines = JSON.parse(nlapiGetFieldValue('custpage_2663_sublist_markdata' + i) || '{}');
            for (var key in markedLines) {
        		selectedTransKeys.push(key);
            }
        }
    }
    return selectedTransKeys;
};

function getMarkedLines() {
	var markedLines = {};
	var sublistNumPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
	if (sublistNumPages) {
		var totalPages = parseInt(sublistNumPages, 10);
		for (var i = 1; i <= totalPages; i++) {
			var param = 'custpage_2663_sublist_markdata' + i;
			markedLines[param] = JSON.parse(nlapiGetFieldValue(param));
		}
	}
	return markedLines;
};

function getCurrencyPrecision(currencyId) {
    var precision = 2;
    if (currencyId) {
        var currency = nlapiLoadRecord('currency', currencyId);
        if (currency) {
            precision = currency.getFieldValue('currencyprecision') || 2;
        }
    }
    return precision;
}

function getApprovalRoutingId(bankAccount, approvalLevel) {
	var filters = [
        new nlobjSearchFilter('custrecord_2663_ar_bank_acct', null, 'is', bankAccount),
        new nlobjSearchFilter('custrecord_2663_ar_level', null, 'is', approvalLevel)
    ];
	var res = nlapiSearchRecord('customrecord_2663_approval_routing', null, filters);
	if (res) {
		return res[0].getId();
	}
	return '';
}

function callBatchUpdaterRS(process, batchId, startIndex, endIndex) {
	var restLetURL = nlapiResolveURL('restlet', 'customscript_2663_batch_updater_rs', 'customdeploy_2663_batch_updater_rs');
	var url = [restLetURL, '&process=', process, '&batch_id=', batchId, '&start=', startIndex, '&end=', endIndex].join('');
	var headers = {'User-Agent-x': 'SuiteScript-Call', 'Content-Type': 'application/json'};
	var response = nlapiRequestURL(url, null, headers);
	return JSON.parse(response.getBody());
}

function upsertBatch(bankAccount, batchId, close, submit) {
	var res = true;
	try {
		var origTranKeys = [];
		var removedKeys = [];
		var tranKeys = [];
		var tranAmts = [];
        var tranDiscounts = [];
		var tranEntities = [];
		var journalKeys = [];
		var batchLimit = 825;
		var bankFlds = ['name', 'custrecord_2663_bank_batch_number'];
		if (isMultiCurrency()) {
			bankFlds.push('custrecord_2663_currency');
		}
		var mapBankValues = nlapiLookupField('customrecord_2663_bank_details', bankAccount, bankFlds);
		var batchNumber = (mapBankValues['custrecord_2663_bank_batch_number'] * 1) + 1;
		var precision = getCurrencyPrecision(mapBankValues['custrecord_2663_currency']);
		var markedLines = getMarkedLines();
		var multiCurrency = isMultiCurrency();
		var process = batchId ? 'update' : 'add';
		var summarized = nlapiGetFieldValue('custpage_2663_summarized') == 'T';
		var refNote = nlapiGetFieldValue('custpage_2663_payment_ref');

		// check if refNote is populated
		if (!refNote) {
			showAlertMsg('Please enter value(s) for: EFT file reference note');
			return false;
		}

		// parse marked lines for id's, amounts, discounts
		for (var i in markedLines) {
			for (var j in markedLines[i]) {
	            var markedLineValue = JSON.parse(markedLines[i][j]);
	            var lineAmt;
                var discAmt;
	            if (markedLineValue.hasOwnProperty('amount')) {
	                lineAmt = parseFloat(markedLineValue.amount);
                    discAmt = markedLineValue.custpage_discamount? parseFloat(markedLineValue.custpage_discamount) : 0;
	            } else {
	                lineAmt = parseFloat(markedLineValue);
	            }

	            // if multicurrency is on and the precision is not 2, round the value according to the currency setting
	            if (multiCurrency && precision != 2) {
	                var decimals = Math.pow(10, precision);
	                lineAmt = Math.round(lineAmt * decimals) / decimals;
	            }

	            // add the line amount and transaction key
	            tranAmts.push(nlapiFormatCurrency(lineAmt));
                tranDiscounts.push(nlapiFormatCurrency(discAmt))
	            tranKeys.push(j);
	            tranEntities.push(markedLineValue.entity);
	            if (markedLineValue.type == 'journalentry') {
	            	journalKeys.push(j);
	            }
			}
		}

		if (tranKeys.length > 0 || summarized) {
			
			var batch = batchId ? nlapiLoadRecord('customrecord_2663_file_admin', batchId) : nlapiCreateRecord('customrecord_2663_file_admin');
			if (!batchId) {
				batch.setFieldValue('altname', [mapBankValues['name'], batchNumber].join('-'));
				batch.setFieldValue('custrecord_2663_bank_account', bankAccount);
				batch.setFieldValue('custrecord_2663_account', nlapiGetFieldValue('custpage_2663_ap_account'));
				batch.setFieldValue('custrecord_2663_payment_type', EP_EFT);
				batch.setFieldValue('custrecord_2663_number', batchNumber);
				batch.setFieldValue('custrecord_2663_approval_level', APPROVAL_LEVEL1);
				batch.setFieldValue('custrecord_2663_status', BATCH_UPDATING);
			} else {
				origTranKeys = JSON.parse(batch.getFieldValue('custrecord_2663_payments_for_process_id') || '[]');
				if (tranKeys.length < origTranKeys.length) {
					for (var i = 0, ii = origTranKeys.length; i < ii; i++) {
						var tranKey = origTranKeys[i];
						if (!isInArray(tranKey, tranKeys)) {
							removedKeys.push(tranKey);
						}
					}
				}
				if (removedKeys.length > 0) {
					batch.setFieldValue('custrecord_2663_removed_keys', JSON.stringify(removedKeys));
				}
				if (!close) {
					batch.setFieldValue('custrecord_2663_prev_approval_level', batch.getFieldValue('custrecord_2663_approval_level'));
				}
			}

			if (!summarized) {
				batch.setFieldValue('custrecord_2663_payments_for_process_id', JSON.stringify(tranKeys));
				batch.setFieldValue('custrecord_2663_payments_for_process_amt', JSON.stringify(tranAmts));
                batch.setFieldValue('custrecord_2663_payments_for_process_dis', JSON.stringify(tranDiscounts));
				batch.setFieldValue('custrecord_2663_transaction_entities', JSON.stringify(tranEntities));
				batch.setFieldValue('custrecord_2663_journal_keys', JSON.stringify(journalKeys));
				batch.setFieldValue('custrecord_2663_total_amount', nlapiGetFieldValue('custpage_2663_total_amount'));
				batch.setFieldValue('custrecord_2663_total_transactions', nlapiGetFieldValue('custpage_2663_payment_lines') * 1);
			}

			batch.setFieldValue('custrecord_2663_ref_note', refNote);
			batch.setFieldValue('custrecord_2663_process_date', nlapiGetFieldValue('custpage_2663_process_date'));
			batch.setFieldValue('custrecord_2663_posting_period', nlapiGetFieldValue('custpage_2663_postingperiod'));
			batch.setFieldValue('custrecord_2663_aggregate', nlapiGetFieldValue('custpage_2663_aggregate'));
			batch.setFieldValue('custrecord_2663_agg_method', nlapiGetFieldValue('custpage_2663_agg_method'));
			if (isOneWorld()) {
				batch.setFieldValue('custrecord_2663_payment_subsidiary', nlapiGetFieldValue('custpage_2663_subsidiary'));
			}
			batchId = nlapiSubmitRecord(batch);

			if (process == 'add') {
				nlapiSetFieldValue('custpage_2663_batchid', batchId);
				adminSubmitField('customrecord_2663_bank_details', bankAccount, 'custrecord_2663_bank_batch_number', batchNumber);
			}

			if (!summarized) {
				Ext.MessageBox.minWidth = 200;
				Ext.MessageBox.show({
					title: 'Updating Payment Batch',
			        msg: 'Updating Payment Batch Record',
			        progress: true
			    });

				var progress = 0.01;
				Ext.MessageBox.updateProgress(progress, (progress * 100) + ' % Completed');

				var totalTransactions = process == 'add' ? tranKeys.length : removedKeys.length;
				var numOfBatches = Math.ceil(totalTransactions/batchLimit);
				for (var i = 0; i < numOfBatches; i++) {
					var startIndex = i * batchLimit;
					var endIndex = (i + 1) * batchLimit;
					var responsebody = callBatchUpdaterRS(process, batchId, startIndex, endIndex);
					var error = responsebody['error'];
			        if (error) {
			             showAlertMsg(['An error occurred while calling the restlet:', error.code, error.message].join(' '));
			             res = false;
			             break;
			        }
			        if (responsebody['update'] != 'complete') {
						showAlertMsg(['Batch update did not complete:', responsebody['update']].join(' '));
						res = false;
						break;
			        }
			        progress = (i + 1) / numOfBatches;
			        Ext.MessageBox.updateProgress(progress, (progress * 100) + ' % Completed');
				}
				Ext.MessageBox.hide();
			}
			if (batchId && (close || submit)) {
				batch = nlapiLoadRecord('customrecord_2663_file_admin', batchId);
				batch.setFieldValue('custrecord_2663_status', submit ? BATCH_SUBMITTED: BATCH_PENDINGAPPROVAL);
				nlapiSubmitRecord(batch);
			}
		} else {
			return rejectBatch(batchId);
		}
	} catch (ex) {
		res = false;
		var errorMessage = 'Error during batch creation';
		if (ex) {
			errorMessage += errorMessage ? ': ' : '';
			if (ex instanceof nlobjError) {
				errorMessage += ex.getCode() + '\n' + ex.getDetails() + '\n' + ex.getStackTrace();
			} else {
				errorMessage += ex.toString() + '\n' + ex.stack;
			}
		}
		showAlertMsg(errorMessage);
		//Set to pending approval on error
		if (process == 'add') {
			nlapiSubmitField('customrecord_2663_file_admin', batchId, 'custrecord_2663_status', BATCH_OPEN);
		}

		Ext.MessageBox.hide();
	}
	return res;
}

function rejectBatch(batchId) {
	var res = false;
	if (batchId) {
		try {
			var batchLimit = 1200;
			Ext.MessageBox.minWidth = 200;
			Ext.MessageBox.show({
				title: 'Rejecting Payment Batch',
		        msg: 'Removing Transactions',
		        progress: true
		    });

			var batch = nlapiLoadRecord('customrecord_2663_file_admin', batchId);
			var tranKeys = JSON.parse(batch.getFieldValue('custrecord_2663_payments_for_process_id') || '[]');
			batch.setFieldValue('custrecord_2663_status', BATCH_UPDATING);
			nlapiSubmitRecord(batch);

			var progress = 0.01;
			Ext.MessageBox.updateProgress(progress, (progress * 100) + ' % Completed', 'Removing transactions');

			var totalTransactions = tranKeys.length;
			var numOfBatches = Math.ceil(totalTransactions/batchLimit);
			res = true;
			for (var i = 0; i < numOfBatches; i++) {
                var startIndex = 0;
                var endIndex = batchLimit;
				var responsebody = callBatchUpdaterRS('reject', batchId, startIndex, endIndex);
				var error = responsebody['error'];
		        if (error) {
		             showAlertMsg(['An error occurred while calling the restlet:', error.code, error.message].join(' '));
		             res = false;
		             break;
		        }
		        if (responsebody['update'] != 'complete') {
					showAlertMsg(['Batch rejection did not complete:', responsebody['update']].join(' '));
					res = false;
					break;
		        }
		        progress = (i + 1) / numOfBatches;
		        Ext.MessageBox.updateProgress(progress, (progress * 100) + ' % Completed', 'Removing transactions');
			}

			if (res && batch) {
				batch.setFieldValue('custrecord_2663_status', BATCH_REJECTED);
				batch.setFieldValue('custrecord_2663_total_amount', 0);
				batch.setFieldValue('custrecord_2663_total_transactions', 0);
				nlapiSubmitRecord(batch);
			}

			Ext.MessageBox.hide();
		} catch (ex) {
			res = false;
			var errorMessage = 'Error during batch rejection';
			if (ex) {
				errorMessage += errorMessage ? ': ' : '';
				if (ex instanceof nlobjError) {
					errorMessage += ex.getCode() + '\n' + ex.getDetails() + '\n' + ex.getStackTrace();
				} else {
					errorMessage += ex.toString() + '\n' + ex.stack;
				}
			}
			showAlertMsg(errorMessage);
			Ext.MessageBox.hide();
			nlapiSubmitField('customrecord_2663_file_admin', batchId, 'custrecord_2663_status', BATCH_PENDINGAPPROVAL);
		}
	}

	return res;
}

/**
 * Calls the suitelet that executes nlapiSubmitField as Administrator.
 * Supports only single field submit.
 *
 */
function adminSubmitField(recType, recId, fldName, fldValue, doSourcing) {
    try {
        var url = nlapiResolveURL('SUITELET', 'customscript_2663_admin_data_submit_s', 'customdeploy_2663_admin_data_submit_s');
        var params = {};
        params['custparam_2663_rec_type'] = recType;
        params['custparam_2663_rec_id'] = recId;
        params['custparam_2663_fld_name'] = fldName;
        params['custparam_2663_fld_value'] = fldValue;
        params['custparam_2663_do_sourcing'] = doSourcing;
        nlapiRequestURL(url, params);
    }
    catch(ex){
        showAlertMsg('Error during adminSubmitField of field ' + fldName + ' under record ' + recType + ' with ID ' + recId);
    }

};

/**
 * Recalc lines for the selected items based on the exchange rates
 */
function ep_RecalcLines() {
    if (psg_ep.PaymentSelectionClientObj) {
        psg_ep.PaymentSelectionClientObj._commonClient.RecalcLines();
    }
}

/**
 * Payment selection client interface to be implemented
 *
 * @returns {psg_ep.PaymentSelectionClientInterface}
 */
psg_ep.PaymentSelectionClientInterface = function() {
    this.RecalcLines = null;
};

/**
 * Class for EFT client
 *
 * @returns {psg_ep.PaymentSelectionClient_EFT}
 */
psg_ep.PaymentSelectionClient_EFT = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_EFT;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for EFT
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_EFT(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum, true);

        // ---- Aggregation Check Box ----
        if (name == 'custpage_2663_aggregate') {
            var isAggMethodDisabled = nlapiGetFieldValue('custpage_2663_aggregate') == 'F' ? true : false;
            if (isAggMethodDisabled) {
                nlapiSetFieldValue('custpage_2663_agg_method', '');
            }
            nlapiSetFieldDisabled('custpage_2663_agg_method', isAggMethodDisabled);
        }

        if(name == 'custpage_2663_process_date'){
			//nlapiGetDateTimeValue
			var myDate = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));
			var millis = myDate.getTime();

			nlapiSetFieldValue('custpage_2663_process_date_millis', millis);
        	this._commonClient.RefreshPage();
        }

        if (name == 'custpage_2663_bank_account') {
            // unset account
            nlapiSetFieldValue('custpage_2663_ap_account', '', false);

            // unset entity filters and bank account related fields
            nlapiSetFieldValue('custpage_2663_vendor', '', false);
            nlapiSetFieldValue('custpage_2663_employee', '', false);
            nlapiSetFieldValue('custpage_2663_partner', '', false);

            // set default transactions to blank when bank is changed
            nlapiSetFieldValue('custpage_2663_trans_marked', '', false);

            // set dcl
            if (psg_ep.isDepartmentFlag) {
                nlapiSetFieldValue('custpage_2663_department', '', false);
            }
            if (psg_ep.isClassFlag) {
                nlapiSetFieldValue('custpage_2663_classification', '', false);
            }
            if (psg_ep.isLocationFlag) {
                nlapiSetFieldValue('custpage_2663_location', '', false);
            }

//            nlapiSetFieldValue('custpage_2663_bank_currency', '', false);
            nlapiSetFieldValue('custpage_2663_format_currency', '', false);
            nlapiSetFieldValue('custpage_2663_exchange_rates', '', false);
        }

        // unset the lines and refresh the page if filters are changed
        if (name == 'custpage_2663_bank_account' ||
            name == 'custpage_2663_ap_account') {
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }
        else if (name == 'custpage_2663_date_from' ||
            name == 'custpage_2663_date_to' ||
            name == 'custpage_2663_vendor' ||
            name == 'custpage_2663_employee' ||
            name == 'custpage_2663_partner' ||
            name == 'custpage_2663_onhold' ||
            name == 'custpage_2663_transtype') {
            if (nlapiGetFieldValue('custpage_2663_bank_account') && nlapiGetFieldValue('custpage_2663_ap_account')) {
                this._commonClient._unsetLines();
                this._commonClient.RefreshPage();
            }
        }
        else if (isGrouponField(name) == true) {
            if (nlapiGetFieldValue('custpage_2663_bank_account') && nlapiGetFieldValue('custpage_2663_ap_account')) {
            	if (name != 'custpage_2663_custbody_payment_type' || nlapiGetFieldValue('custpage_2663_custbody_payment_type') != psg_ep.initValues[name]) {
            		this._commonClient._unsetLines();
                    this._commonClient.RefreshPage();
            	}
            }
        }
        else if (isCustomField(name) == true) {
            if (nlapiGetFieldValue('custpage_2663_bank_account') && nlapiGetFieldValue('custpage_2663_ap_account')) {
            		this._commonClient._unsetLines();
                    this._commonClient.RefreshPage();
            }
        }

        (new psg_ep.PaymentSelectionClient_ExchangeRate()).FieldChanged(type, name, lineNum);
    }

    /**
     * Recalc lines
     */
    function recalcLines_EFT() {
    	var bankAccount = nlapiGetFieldValue('custpage_2663_bank_account');
    	var approvalRoutingEnabled = nlapiGetFieldValue('custpage_2663_approval_routing') == 'T';
    	var approvalType = bankAccount ? nlapiLookupField('customrecord_2663_bank_details', bankAccount, 'custrecord_2663_bank_approval_type') : '';
        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var mapEntityAmt = {};
        var totalLines = 0;
        var totalAmt = 0;
        var approvalAmt = 0;

        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            // get exchange rates (if with value)
            var exchangeRates;
            if (nlapiGetFieldValue('custpage_2663_exchange_rates')) {
                try {
                    exchangeRates = JSON.parse(nlapiGetFieldValue('custpage_2663_exchange_rates'));
                }
                catch(ex) {
                    showAlertMsg(MESSAGEMAP_ALERT['exchangeratestr'] + nlapiGetFieldValue('custpage_2663_exchange_rates') + MESSAGEMAP_ALERT['defaultrate']);
                }
            }
            for (var j in sublistPageMarkData) {
                totalLines++;
                var markData = JSON.parse(sublistPageMarkData[j]);
                var exchangeRate = 1;  // default to 1
                var isSameBankCurrencies = (nlapiGetFieldValue('custpage_2663_bank_currency') == nlapiGetFieldValue('custpage_2663_base_currency'));
                if (exchangeRates && exchangeRates[markData.currency] && isSameBankCurrencies) {
                    exchangeRate = exchangeRates[markData.currency];
                }
                var lineAmount = markData.amount * exchangeRate;
                totalAmt += lineAmount;
                if (approvalRoutingEnabled) {
                	if (approvalType == APPROVALTYPE_BILLPAYMENT) {
                    	approvalAmt = approvalAmt > lineAmount ? approvalAmt : lineAmount;
                    } else if (approvalType == APPROVALTYPE_VENDORPAYMENT) {
                    	if (mapEntityAmt[markData.entity]) {
                    		mapEntityAmt[markData.entity] += lineAmount;
                    	} else {
                    		mapEntityAmt[markData.entity] = lineAmount;
                    	}
                    }
                }
            }
        }

        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
        if (approvalRoutingEnabled) {
        	if (approvalType == APPROVALTYPE_VENDORPAYMENT) {
        		for (var i in mapEntityAmt) {
        			if (mapEntityAmt.hasOwnProperty(i)) {
        				var entityAmt = mapEntityAmt[i];
        				approvalAmt = approvalAmt > entityAmt ? approvalAmt : entityAmt;
        			}
        		}
        	} else if (approvalType == APPROVALTYPE_BATCHPAYMENT) {
        		approvalAmt	= totalAmt;
        	}
        	nlapiSetFieldValue('custpage_2663_approval_amount', nlapiFormatCurrency(approvalAmt));
        }
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_EFT() {
        var result = true;
        
        var isVPAOn = JSON.parse( isVPAEnabled() ).isVPAEnabled;                       

        if (isVPAOn) {
            alert(MESSAGEMAP_ALERT['EP_00115']);
            return false;
        }        

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('eft');

        if (result) {
            result = paymentValidator.CheckEntityAmt();
        }

        if (result) {
            result = paymentValidator.CheckAccountingPeriod();
        }

        if (result) {
            result = paymentValidator.CheckDCLSettings();
        }

        if (result) {
            var fileFormat = nlapiGetFieldValue('custpage_2663_format_display');
            var subsidiaryId = nlapiGetFieldValue('custpage_2663_subsidiary');
            var account = nlapiGetFieldValue('custpage_2663_ap_account');

            result = paymentValidator.CanStartPaymentProcessing(fileFormat, account, subsidiaryId);
        }

        if (result) {
            // perform final recalc before saving
            recalcLines_EFT();
        }

        result = result && paymentValidator.ValidateSegments();


        result = this._commonClient._saveRecord(result);                

        return result;
    }    

    /**
     * Returns true if the field is for Groupon
     *
     * @param name
     * @returns {Boolean}
     */
    function isGrouponField(name) {
        var isGrouponField = false;

        if (name) {
            // check if there are additional filters for Groupon
            var addlEntityFieldsStr = nlapiGetFieldValue('custpage_2663_af_flds_entityfilters');
            var grouponFields = [];
            if (addlEntityFieldsStr) {
                var addlEntityFields = JSON.parse(addlEntityFieldsStr);
                grouponFields = grouponFields.concat(addlEntityFields);
            }
            var addlTransactionFieldsStr = nlapiGetFieldValue('custpage_2663_af_flds_transfilters');
            if (addlTransactionFieldsStr) {
                var addlTransactionFields = JSON.parse(addlTransactionFieldsStr);
                grouponFields = grouponFields.concat(addlTransactionFields);
            }

            // check if the field name is a groupon field
            for (var i = 0; i < grouponFields.length; i++) {
                if (grouponFields[i] == name) {
                    isGrouponField = true;
                    break;
                }
            }
        }

        return isGrouponField;
    }

    /**
     * Returns true if the field is customized
     *
     * @param name
     * @returns {Boolean}
     */
    function isCustomField(name) {
        var isCustomField = false;

        if (name) {
            // check if there are additional custom filters
            var addlEntityFieldsStr = nlapiGetFieldValue('custpage_2663_custom_flds_transfilters');
            var customFields = [];
            if (addlEntityFieldsStr) {
                var addlEntityFields = JSON.parse(addlEntityFieldsStr);
                customFields = customFields.concat(addlEntityFields);
            }

            // check if the field name is a custom field
            for (var i = 0; i < customFields.length; i++) {
                if (customFields[i] == name) {
                	isCustomField = true;
                    break;
                }
            }
        }

        return isCustomField;
    }

    this.FieldChanged = fieldChanged_EFT;
    this.SaveRecord = saveRecord_EFT;
};

/**
 * Class for DD client
 *
 * @returns {psg_ep.PaymentSelectionClient_DD}
 */
psg_ep.PaymentSelectionClient_DD = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_DD;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for DD
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_DD(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum, true);

        // ---- Aggregation Check Box ----
        if (name == 'custpage_2663_aggregate') {
            var isAggMethodDisabled = nlapiGetFieldValue('custpage_2663_aggregate') == 'F' ? true : false;
            if (isAggMethodDisabled) {
                nlapiSetFieldValue('custpage_2663_agg_method', '');
            }
            nlapiSetFieldDisabled('custpage_2663_agg_method', isAggMethodDisabled);
        }

        if(name == 'custpage_2663_process_date'){
        	var sublistLineCount = nlapiGetLineItemCount('custpage_2663_sublist');
        	var totalAmt = 0;
            var dateToBeProcessed = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));

        	for (var lineNum = 1; lineNum <= sublistLineCount; lineNum++) {
                var discDate = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discdate', lineNum);

                if(discDate){
                	if(dateToBeProcessed > nlapiStringToDate(discDate)){
                    	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, "");
                	} else{
                		var origDiscAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamounthdn', lineNum);
                    	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, nlapiFormatCurrency(origDiscAmt));
                	}
                }
                if (nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T') {
            		var amountRemaining = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_amountremaining', lineNum));
                    var discAmt = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum), 10);
                    if (discAmt > 0) {

                        if(discDate && dateToBeProcessed <= nlapiStringToDate(discDate)){
                        	amountRemaining = amountRemaining - discAmt;
                    	}
                    }
                    totalAmt = totalAmt + amountRemaining;
                    nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum, nlapiFormatCurrency(amountRemaining));
                }
        	}
            nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
        }

        if (name == 'custpage_2663_bank_account') {
            // unset account
            nlapiSetFieldValue('custpage_2663_ar_account', '', false);

            // unset entity filters
            nlapiSetFieldValue('custpage_2663_customer', '', false);

            // set default transactions to blank when bank is changed
            nlapiSetFieldValue('custpage_2663_trans_marked', '', false);

            // unset dcl
            if (psg_ep.isDepartmentFlag) {
                nlapiSetFieldValue('custpage_2663_dept_filter', '', false);
                nlapiSetFieldValue('custpage_2663_department', '', false);
            }
            if (psg_ep.isClassFlag) {
                nlapiSetFieldValue('custpage_2663_class_filter', '', false);
                nlapiSetFieldValue('custpage_2663_classification', '', false);
            }
            if (psg_ep.isLocationFlag) {
                nlapiSetFieldValue('custpage_2663_loc_filter', '', false);
                nlapiSetFieldValue('custpage_2663_location', '', false);
            }

//            nlapiSetFieldValue('custpage_2663_bank_currency', '', false);
            nlapiSetFieldValue('custpage_2663_format_currency', '', false);
            nlapiSetFieldValue('custpage_2663_exchange_rates', '', false);
        }

        // refresh the page if filters are changed
        if (name == 'custpage_2663_bank_account' ||
            name == 'custpage_2663_ar_account') {
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }
        else if (name == 'custpage_2663_date_from' ||
            name == 'custpage_2663_date_to' ||
            name == 'custpage_2663_customer' ||
            name == 'custpage_2663_dept_filter' ||
            name == 'custpage_2663_class_filter' ||
            name == 'custpage_2663_loc_filter' ||
            name == 'custpage_2663_transtype') {
            if (nlapiGetFieldValue('custpage_2663_bank_account') && nlapiGetFieldValue('custpage_2663_ar_account')) {
                this._commonClient._unsetLines();
                this._commonClient.RefreshPage();
            }
        }

        (new psg_ep.PaymentSelectionClient_ExchangeRate()).FieldChanged(type, name, lineNum);
    }

    /**
     * Recalc lines
     */
    function recalcLines_DD() {
        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var totalLines = 0;
        var totalAmt = 0.0;
        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            // get exchange rates (if with value)
            var exchangeRates;
            if (nlapiGetFieldValue('custpage_2663_exchange_rates')) {
                try {
                    exchangeRates = JSON.parse(nlapiGetFieldValue('custpage_2663_exchange_rates'));
                }
                catch(ex) {
                    showAlertMsg(MSGMAP_ALERT['exrate1'] + nlapiGetFieldValue('custpage_2663_exchange_rates') + MSGMAP_ALERT['exrate1']);

                }
            }
            for (var j in sublistPageMarkData) {
                totalLines++;
                var markData = JSON.parse(sublistPageMarkData[j]);
                var exchangeRate = 1;  // default to 1
                if (exchangeRates) {
                	var exchangeRateVal = exchangeRates[markData.currency];
                	if(exchangeRateVal)
                		exchangeRate = exchangeRateVal;
                }
                totalAmt += new Number(markData.amount) * exchangeRate;
            }
        }
        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_DD() {
        var result = true;

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('dd');

        if (result) {
            result = paymentValidator.CheckEntityAmt();
        }

        if (result) {
            result = paymentValidator.CheckAccountingPeriod();
        }

        if (result) {
            result = paymentValidator.CheckDCLSettings();
        }

        if (result) {
            var fileFormat = nlapiGetFieldValue('custpage_2663_format_display');
            var subsidiaryId = nlapiGetFieldValue('custpage_2663_subsidiary');
            var account = nlapiGetFieldValue('custpage_2663_ar_account');

            result = paymentValidator.CanStartPaymentProcessing(fileFormat, account, subsidiaryId);
        }

        if (result) {
            // perform final recalc before saving
            recalcLines_DD();
        }

        result = result && paymentValidator.ValidateSegments();

        result = this._commonClient._saveRecord(result);

        return result;
    }

    this.FieldChanged = fieldChanged_DD;
    this.SaveRecord = saveRecord_DD;
};

/**
 * Class for PP client
 *
 * @returns {psg_ep.PaymentSelectionClient_PP}
 */
psg_ep.PaymentSelectionClient_PP = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_PP;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for PP
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_PP(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum);

        if (name == 'custpage_2663_bank_account' || name == 'custpage_2663_void' || name == 'custpage_2663_exclude_cleared') {
            // unset first and last check numbers
            nlapiSetFieldValue('custpage_2663_first_check_no', '', false);
            nlapiSetFieldValue('custpage_2663_last_check_no', '', false);
        }

        // unset the lines and refresh the page if filters are changed
        if (name == 'custpage_2663_bank_account') {
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }
        else if (name == 'custpage_2663_date_from' ||
            name == 'custpage_2663_date_to' ||
            name == 'custpage_2663_first_check_no' ||
            name == 'custpage_2663_last_check_no' ||
            name == 'custpage_2663_void' ||
            name == 'custpage_2663_exclude_cleared') {
            if (nlapiGetFieldValue('custpage_2663_bank_account')) {
                this._commonClient._unsetLines();
                this._commonClient.RefreshPage();
            }
        }
    }

    /**
     * Recalc lines
     */
    function recalcLines_PP() {
        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var totalLines = 0;
        var totalAmt = 0.0;
        var totalVoidLines = 0;
        var totalVoidAmt = 0.0;
        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            for (var j in sublistPageMarkData) {
                if (j.indexOf('-v') != -1) {
                    totalVoidLines++;
                    totalVoidAmt += new Number(sublistPageMarkData[j]);
                }
                else {
                    totalLines++;
                    totalAmt += new Number(sublistPageMarkData[j]);
                }
            }
        }
        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
        nlapiSetFieldValue('custpage_2663_void_payment_lines', totalVoidLines);
        nlapiSetFieldValue('custpage_2663_void_total_amount', nlapiFormatCurrency(totalVoidAmt));
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_PP() {
        var result = true;

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('pp');

        setChequeNumbers();

        result = this._commonClient._saveRecord(result);

        return result;
    }

    /**
     * Sets the check numbers if they are not equal to the min and max check numbers in list
     */
    function setChequeNumbers() {
        var firstCheckNo = nlapiGetFieldValue('custpage_2663_first_check_no');
        var lastCheckNo = nlapiGetFieldValue('custpage_2663_last_check_no');
        var firstCheckNoHidden = nlapiGetFieldValue('custpage_2663_fcn_hidden');
        var lastCheckNoHidden = nlapiGetFieldValue('custpage_2663_lcn_hidden');

        if (firstCheckNo && firstCheckNoHidden) {
            if (parseInt(firstCheckNo, 10) != parseInt(firstCheckNoHidden, 10)) {
                showAlertMsg(MESSAGEMAP_ALERT['smallchequenum']);
                nlapiSetFieldValue('custpage_2663_first_check_no', firstCheckNoHidden, false);
            }
        }

        if (lastCheckNo && lastCheckNoHidden) {
            if (parseInt(lastCheckNo, 10) != parseInt(lastCheckNoHidden, 10)) {
                showAlertMsg(MESSAGEMAP_ALERT['highchequenum']);
                nlapiSetFieldValue('custpage_2663_last_check_no', lastCheckNoHidden, false);
            }
        }
    }

    this.FieldChanged = fieldChanged_PP;
    this.SaveRecord = saveRecord_PP;
};

/**
 * Class for EFTPortalBatch client
 *
 * @returns {psg_ep.PaymentSelectionClient_EFTPortalBatch}
 */
psg_ep.PaymentSelectionClient_EFTPortalBatch = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_EFTPortalBatch;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for EFTPortalBatch
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_EFTPortalBatch(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum, true);

        // ---- Aggregation Check Box ----
        if (name == 'custpage_2663_aggregate') {
            var isAggMethodDisabled = nlapiGetFieldValue('custpage_2663_aggregate') == 'F' ? true : false;
            if (isAggMethodDisabled) {
                nlapiSetFieldValue('custpage_2663_agg_method', '');
            }
            nlapiSetFieldDisabled('custpage_2663_agg_method', isAggMethodDisabled);
        }

        if (name == 'custpage_2663_bank_account') {
            // unset account
            nlapiSetFieldValue('custpage_2663_ap_account', '', false);

            // set default transactions to blank when bank is changed
            nlapiSetFieldValue('custpage_2663_trans_marked', '', false);

            // set batch to blank
            nlapiSetFieldValue('custpage_2663_batchid', '', false);

            // set summarized field to blank
            nlapiSetFieldValue('custpage_2663_summarized_placeholder', '', false);

            // set dcl
            if (psg_ep.isDepartmentFlag) {
                nlapiSetFieldValue('custpage_2663_department', '', false);
            }
            if (psg_ep.isClassFlag) {
                nlapiSetFieldValue('custpage_2663_classification', '', false);
            }
            if (psg_ep.isLocationFlag) {
                nlapiSetFieldValue('custpage_2663_location', '', false);
            }

//            nlapiSetFieldValue('custpage_2663_bank_currency', '', false);
            nlapiSetFieldValue('custpage_2663_format_currency', '', false);
            nlapiSetFieldValue('custpage_2663_exchange_rates', '', false);
        }

        // refresh page if process date is changed to update discounts
        if (name == 'custpage_2663_process_date'){
            this._commonClient.RefreshPage();
        }

        // unset the lines and refresh the page if filters are changed
        if (name == 'custpage_2663_bank_account' ||
            name == 'custpage_2663_ap_account' ||
            name == 'custpage_2663_batchid') {
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }

        // summarized field
        if (name == 'custpage_2663_summarized') {
            nlapiSetFieldValue('custpage_2663_summarized_placeholder', nlapiGetFieldValue('custpage_2663_summarized'), false);
            nlapiSetFieldValue('custpage_2663_format_currency', '', false);
            nlapiSetFieldValue('custpage_2663_exchange_rates', '', false);
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }

        (new psg_ep.PaymentSelectionClient_ExchangeRate()).FieldChanged(type, name, lineNum);
    }

    /**
     * Recalc lines
     */
    function recalcLines_EFTPortalBatch() {
    	if (nlapiGetFieldValue('custpage_2663_summarized') != 'T') {
    		var bankAccount = nlapiGetFieldValue('custpage_2663_bank_account');
        	var approvalRoutingEnabled = nlapiGetFieldValue('custpage_2663_approval_routing') == 'T';
        	var approvalType = bankAccount ? nlapiLookupField('customrecord_2663_bank_details', bankAccount, 'custrecord_2663_bank_approval_type') : '';
            var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
            var mapEntityAmt = {};
            var totalLines = 0;
            var totalAmt = 0;
            var approvalAmt = 0;

            // get exchange rates (if with value)
            var exchangeRates;
            if (nlapiGetFieldValue('custpage_2663_exchange_rates')) {
                try {
                    exchangeRates = JSON.parse(nlapiGetFieldValue('custpage_2663_exchange_rates'));
                }
                catch(ex) {
                    showAlertMsg(MESSAGEMAP_ALERT['exchangeratestr'] + nlapiGetFieldValue('custpage_2663_exchange_rates') + MESSAGEMAP_ALERT['defaultrate']);
                }
            }
            for (var i = 1; i <= numPages; i++) {
                // get data for page
                var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
                var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
                for (var j in sublistPageMarkData) {
                	totalLines++;
                    var markData = JSON.parse(sublistPageMarkData[j]);
                    var exchangeRate = 1;  // default to 1
                    var isSameBankCurrencies = (nlapiGetFieldValue('custpage_2663_bank_currency') == nlapiGetFieldValue('custpage_2663_base_currency'));
                    if (exchangeRates && exchangeRates[markData.currency] && isSameBankCurrencies) {
                        exchangeRate = exchangeRates[markData.currency];
                    }
                    var lineAmount = markData.amount * exchangeRate;
                    totalAmt += lineAmount;
                    if (approvalRoutingEnabled) {
                    	if (approvalType == APPROVALTYPE_BILLPAYMENT) {
                        	approvalAmt = approvalAmt > lineAmount ? approvalAmt : lineAmount;
                        } else if (approvalType == APPROVALTYPE_VENDORPAYMENT) {
                        	if (mapEntityAmt[markData.entity]) {
                        		mapEntityAmt[markData.entity] += lineAmount;
                        	} else {
                        		mapEntityAmt[markData.entity] = lineAmount;
                        	}
                        }
                    }
                }
            }
            nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
            nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
            if (approvalRoutingEnabled) {
            	if (approvalType == APPROVALTYPE_VENDORPAYMENT) {
            		for (var i in mapEntityAmt) {
            			if (mapEntityAmt.hasOwnProperty(i)) {
            				var entityAmt = mapEntityAmt[i];
            				approvalAmt = approvalAmt > entityAmt ? approvalAmt : entityAmt;
            			}
            		}
            	} else if (approvalType == APPROVALTYPE_BATCHPAYMENT) {
            		approvalAmt	= totalAmt;
            	}
            	nlapiSetFieldValue('custpage_2663_approval_amount', nlapiFormatCurrency(approvalAmt));
            }
    	}
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_EFTPortalBatch() {
        var result = true;

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('eft', true);

        if (result) {
            result = paymentValidator.CheckEntityAmt();
        }

        if (result) {
            result = paymentValidator.CheckAccountingPeriod();
        }

        if (result) {
            result = paymentValidator.CheckDCLSettings();
        }

        result = this._commonClient._saveRecord(result);

        if (result && nlapiGetFieldValue('custpage_2663_sublist_numpages')) {
            // perform final recalc before saving
            recalcLines_EFTPortalBatch();
        }

        return result;
    }

    this.FieldChanged = fieldChanged_EFTPortalBatch;
    this.SaveRecord = saveRecord_EFTPortalBatch;
};

/**
 * Class for CustomerRefund client
 *
 * @returns {psg_ep.PaymentSelectionClient_CustomerRefund}
 */
psg_ep.PaymentSelectionClient_CustomerRefund = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_CustomerRefund;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for CustomerRefund
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_CustomerRefund(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum);

        if (name == 'custpage_2663_bank_account') {
            // unset customer
            nlapiSetFieldValue('custpage_2663_customer', '', false);

            // set default transactions to blank when bank is changed
            nlapiSetFieldValue('custpage_2663_trans_marked', '', false);

//            nlapiSetFieldValue('custpage_2663_bank_currency', '', false);
            nlapiSetFieldValue('custpage_2663_format_currency', '', false);
            nlapiSetFieldValue('custpage_2663_exchange_rates', '', false);

            // unset the lines and refresh the page if filters are changed
            this._commonClient._unsetLines();
            this._commonClient.RefreshPage();
        }
        else if (name == 'custpage_2663_date_from' ||
                name == 'custpage_2663_date_to' ||
                name == 'custpage_2663_customer') {
            if (nlapiGetFieldValue('custpage_2663_bank_account')) {
                this._commonClient._unsetLines();
                this._commonClient.RefreshPage();
            }
        }
    }

    /**
     * Recalc lines
     */
    function recalcLines_CustomerRefund() {
        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var totalLines = 0;
        var totalAmt = 0.0;
        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            for (var j in sublistPageMarkData) {
                totalLines++;
                totalAmt += new Number(sublistPageMarkData[j]);
            }
        }
        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_CustomerRefund() {
        var result = true;

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('custref');

        result = this._commonClient._saveRecord(result);

        return result;
    }

    this.FieldChanged = fieldChanged_CustomerRefund;
    this.SaveRecord = saveRecord_CustomerRefund;
};


/**
 * Class for Reversal client
 *
 * @returns {PaymentSelectionClient_Reversal}
 */
psg_ep.PaymentSelectionClient_Reversal = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_Reversal;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for EFT
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_Reversal(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum, false, ['custpage_note', 'custpage_amount']);


    }

    /**
     * Recalc lines
     */
    function recalcLines_Reversal() {

        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var totalLines = 0;
        var totalAmt = 0.0;
        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            for (var j in sublistPageMarkData) {
            	totalLines++;
            	var markData = JSON.parse(sublistPageMarkData[j]);
                totalAmt += markData['custpage_amount'] * 1;
            }
        }
        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(totalAmt));
    }

    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_Reversal() {
        var result = true;

        var paymentValidator = new psg_ep.PaymentSelectionValidator();
        result = paymentValidator.CheckSelectedLines('reversal');

        if (result) {
            result = paymentValidator.CheckAccountingPeriod();
        }

        result = this._commonClient._saveRecord(result);

        return result;
    }

    this.FieldChanged = fieldChanged_Reversal;
    this.SaveRecord = saveRecord_Reversal;
};

/**
 * Class for Notification client
 *
 * @returns {PaymentSelectionClient_Notification}
 */
 // NOTE: For deprecation
psg_ep.PaymentSelectionClient_Notification = function() {
    this._clientInterface = new psg_ep.PaymentSelectionClientInterface();
    this._clientInterface.RecalcLines = recalcLines_Notification;
    this._commonClient = new psg_ep.PaymentSelectionClient(this._clientInterface);

    /**
     * Field changed function for EFT
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged_Notification(type, name, lineNum) {
        this._commonClient._fieldChanged(type, name, lineNum, false, ['custpage_note', 'custpage_email_notif', 'custpage_email_cc', 'custpage_email_bcc', 'custpage_email_notif_hidden']);
    }

    /**
     * Recalc lines
     */
    function recalcLines_Notification() {
        var numPages = nlapiGetFieldValue('custpage_2663_sublist_numpages');
        var totalLines = 0;
        for (var i = 1; i <= numPages; i++) {
            // get data for page
            var sublistPageMarkDataStr = nlapiGetFieldValue('custpage_2663_sublist_markdata' + i);
            var sublistPageMarkData = JSON.parse(sublistPageMarkDataStr);
            for (var j in sublistPageMarkData) {
            	totalLines++;
            }
        }
        nlapiSetFieldValue('custpage_2663_payment_lines', totalLines);
    }

    function validateEmail(emailRec){

    	var res = true;

		var testEmail = /[,\[\]\"\(\)]+/;
		if(testEmail.test(emailRec)){
			showAlertMsg("Please use semicolon(;) to separate email addresses.");
			return false;
		}

		if(emailRec.length > 0){
			var emailRecs = emailRec.split(';');
			var emails = [];

			for(var k = 0; k < emailRecs.length; k++){
				emails.push(emailRecs[k].trim());
			}

			for(var m = 0; m < emails.length; m++){
				res = checkemail(emails[m]);

				if(!res){
					return res;
				}
			}

		}
		return res;
    }


    /**
     * Checking before saving the record
     *
     * @returns {Boolean}
     */
    function saveRecord_Notification() {
        var result = true;

    	var markedLines = getMarkedLines();

		// parse marked lines for id's and amounts
		for (var i in markedLines) {
			for (var j in markedLines[i]) {
	            var markedLineValue = JSON.parse(markedLines[i][j]);
                if ( hasEmail(markedLineValue) ){
					var res = true;
					var emailRec = markedLineValue.custpage_email_notif ? markedLineValue.custpage_email_notif.trim() : '';
					res = emailRec ? validateEmail(emailRec) : true;

					if(!res){
						return false;
					}

					var emailRecCc = markedLineValue.custpage_email_cc ? markedLineValue.custpage_email_cc.trim() : '';
					res = emailRecCc ? validateEmail(emailRecCc) : true;

					if(!res){
						return false;
					}

					var emailRecBcc = markedLineValue.custpage_email_bcc ? markedLineValue.custpage_email_bcc.trim() : '';
					res = emailRecBcc ? validateEmail(emailRecBcc) : true;

					if(!res){
						return false;
					}
                }
                else {
					showAlertMsg('Please specify an email address to send to. Email Address is required.');
					return false;
                }
			}
		}

        var paymentValidator = new psg_ep.PaymentSelectionValidator();

        result = this._commonClient._saveRecord(paymentValidator.CheckSelectedLines('notification'));

        return result;

        /**
         * Check if a marked line value (sublist item) has an email recipient
         *
         * @param   {Object} markedLineValue
         * @returns {Boolean}
         */
        function hasEmail(markedLineValue){
            if (markedLineValue.custpage_email_notif && markedLineValue.custpage_email_notif.trim().length > 0){
                return true;
            }
            return false;
        }
    }

    this.FieldChanged = fieldChanged_Notification;
    this.SaveRecord = saveRecord_Notification;
};

/**
 * Parent class for payment selection client
 *
 * @param {psg_ep.PaymentSelectionClientInterface} interfaceObj
 * @returns {psg_ep.PaymentSelectionClient}
 */
psg_ep.PaymentSelectionClient = function(interfaceObj) {
    if (!interfaceObj) {
        throw nlapiCreateError('EP_00032', 'Cannot create object without interface for Client', true);
    }

    this._clientInterfaceObj = interfaceObj;
    this._sublistClientObj = new psg_ep.PaymentSelectionSublistClient(this);

    /**
     * Common field changed function
     *
     * @param type
     * @param name
     * @param lineNum
     * @param currFlag
     */
    function fieldChanged(type, name, lineNum, currFlag, otherProps) {

        // ---- Date from/to Field ----
        if (name == 'custpage_2663_date_from' || name == 'custpage_2663_date_to') {
            // check if due date to is greater than due date from
            // set the due date range as equal when due date to is greater than due date from
            if (nlapiGetFieldValue('custpage_2663_date_from') && nlapiGetFieldValue('custpage_2663_date_to')) {
                var startDate = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_date_from'));
                var endDate = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_date_to'));
                if (startDate > endDate) {
                    var nameToSet = name == 'custpage_2663_date_from' ? 'custpage_2663_date_to' : 'custpage_2663_date_from';
                    nlapiSetFieldValue(nameToSet, nlapiGetFieldValue(name));
                }
            }
        }

        // ---- Date to be processed Field ----
        // change posting period if processing date is not within it
        if (name == 'custpage_2663_process_date') {
            (new psg_ep.PaymentSelectionValidator()).SetAccountingPeriodFromProcessDate();

			var myDate = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));

			if(myDate){
				var millis = myDate.getTime();

				nlapiSetFieldValue('custpage_2663_process_date_millis', millis);
			}
        }

        // clear email notes when email template is selected, and vice versa
        // ---- Email Notes field ----
        if (name == 'custpage_2663_email_body_def'){
            if (nlapiGetFieldValue(name)){
                nlapiSetFieldText('custpage_2663_email_templates','');
            }
        }
        // ---- Email Template field ----
        if (name == 'custpage_2663_email_templates'){
            if (nlapiGetFieldText(name)){
                nlapiSetFieldValue('custpage_2663_email_body_def','');
            }
        }

        // ---- Sublist checking ----
        this._sublistClientObj.FieldChanged(type, name, lineNum, currFlag, otherProps);
    }

    /**
     * Sets the timestamp and returns the result
     *
     * @param {Boolean} result
     * @returns {Boolean}
     */
    function saveRecord(result) {
        if (result == true) {
            // set the timestamp
            var timestamp = new Date();
            var timestampStr = getdatetimetzstring(timestamp);
            nlapiSetFieldValue('custpage_2663_file_creation_timestamp', timestampStr, false);
        }
        else {
            // reset the target url for the submit function - don't use proc deployment
            document.forms.main_form.action = psg_ep.origFormUrl;
        }

        return result;
    }

    /**
     * Refreshes the page
     */
    function refreshPage() {
        // set the refresh flag
        nlapiSetFieldValue('custpage_2663_refresh_page', 'T', false);

        // suppress the alert
        setWindowChanged(window, false);

        // submit the form -- calls submitForm function
        document.forms.main_form.submit();
    };

    /**
     * Unsets all marked lines (for new search)
     */
    function unsetLines() {
        var numPages = new Number(nlapiGetFieldValue('custpage_2663_sublist_numpages'));
        for (var i = 1; i <= numPages; i++) {
            var param = 'custpage_2663_sublist_markdata' + i;
            nlapiSetFieldValue(param, JSON.stringify({}), false);
        }

        // set mark all as blank
        nlapiSetFieldValue('custpage_2663_sublist_mark_all', '', false);

        // set totals to 0
        nlapiSetFieldValue('custpage_2663_payment_lines', '0');
        nlapiSetFieldValue('custpage_2663_total_amount', nlapiFormatCurrency(0));
        nlapiSetFieldValue('custpage_2663_void_payment_lines', '0');
        nlapiSetFieldValue('custpage_2663_void_total_amount', nlapiFormatCurrency(0));
        nlapiSetFieldValue('custpage_2663_total_payees', '0');
    }

    /**
     * Calls the recalc lines function of the interface
     */
    function recalcLines() {
        if (verifyInterface(this._clientInterfaceObj) == true) {
            this._clientInterfaceObj.RecalcLines();
        }
    }

    /**
     * Verifies the interface object
     *
     * @param {psg_ep.PaymentSelectionClientInterface} interfaceObj
     * @returns {Boolean}
     */
    function verifyInterface(interfaceObj) {
        return (interfaceObj != null &&
                interfaceObj.RecalcLines != null &&
                typeof interfaceObj.RecalcLines == 'function');
    }

    this._fieldChanged = fieldChanged;
    this._saveRecord = saveRecord;
    this._unsetLines = unsetLines;
    this.RefreshPage = refreshPage;
    this.RecalcLines = recalcLines;
};

/**
 * Sublist client for payment selection
 *
 * @param {psg_ep.PaymentSelectionClient} uiObj
 * @returns {psg_ep.PaymentSelectionSublistClient}
 */
psg_ep.PaymentSelectionSublistClient = function(uiObj) {
    if (!uiObj) {
        throw nlapiCreateError('EP_00033', 'Cannot create sublist object without ui object', true);
    }

    this._uiObj = uiObj;
    this._sublistClient = new psg_ep.SublistClient(uiObj);

    /**
     * Field changed for payment selection sublist
     * @param type
     * @param name
     * @param lineNum
     * @param currFlag
     * @param otherProps
     */
    function fieldChanged(type, name, lineNum, currFlag, otherProps) {
        // ---- Sublist fields ----
        if (name == 'custpage_pay' || name == 'custpage_discamount' || name == 'custpage_payment' || (otherProps && isInArray(name, otherProps))) {
            // check if selection is within maximum line selection limit
            // two ways to add a payment line: (1) using pay checkbox, (2) using payment amount field

            var payAmount = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum), 10);
            var maxLinesSel = new Number(nlapiGetFieldValue('custpage_2663_max_lines_sel'));
            maxLinesSel = nlapiGetContext().getCompany().indexOf('SB') != -1 ? Math.ceil(maxLinesSel / 2) : maxLinesSel;
            var paymentLines = nlapiGetFieldValue('custpage_2663_payment_lines');
            var toPay = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum);
            var paymentType = nlapiGetFieldValue('custpage_2663_paymenttype');

            if ((name == 'custpage_payment' && Math.abs(payAmount) > 0 && toPay == 'F' && maxLinesSel == paymentLines) ||
                (name == 'custpage_pay' && toPay == 'T' && payAmount == 0 && maxLinesSel == paymentLines)) {
                // covered cases (should alert warning message):
                //  (1) max selected entries, trying to add payment line by entering a non-zero Payment Amount
                //  (2) max selected entries, trying to add payment line by checking Pay box
                // covered cases (should NOT alert warning message):
                //  (3) max selected entries, trying to remove payment line by entering a zero Payment Amount
                //  (4) max selected entries, trying to remove payment line by unchecking Pay box
                //  (5) max selected entries, trying to edit payment amount of 1 of them (e.g. from 2000 to 1000)

                showAlertMsg(MESSAGEMAP_ALERT['maxmarkedtran'] + nlapiGetFieldValue('custpage_2663_max_lines_sel'));
                payAmount = 0;
                nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum, 'F', false);
                nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum, nlapiFormatCurrency(0), false);
            }
            else {
                if (name == 'custpage_pay' && nlapiGetFieldValue('custpage_2663_batch') != 'T') {
                    var amountRemaining = 0;
                    var discAmt = 0;
                    var dateToBeProcessed = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));
                    var discDate = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discdate', lineNum);
                    if (nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T') {
                        // set amount remaining when mark column is checked, if unchecked set to 0
                        amountRemaining = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_amountremaining', lineNum);
                        discAmt = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum), 10);

                        // deduct discount amount if existing
						//consider discount with no expiration date
                        if (discAmt > 0) {
                            if( (discDate && dateToBeProcessed <= nlapiStringToDate(discDate)) || !discDate){
                            	amountRemaining = amountRemaining - discAmt;
                        	}

                        }
                    } else{
						if((discDate && dateToBeProcessed <= nlapiStringToDate(discDate)) || !discDate ){
							var origDiscAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamounthdn', lineNum);
                    		nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, nlapiFormatCurrency(origDiscAmt));

						} else{
                    		nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, '');
                    	}
                    }

                    // prepare object for marking
                    nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum, nlapiFormatCurrency(amountRemaining));
                }
                else if (name == 'custpage_payment') {

                    // set amount boundaries
                    var amountRemaining = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_amountremaining', lineNum), 10);
                    var tranType = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_trantype', lineNum);
                    var creditRecTypes = ['creditmemo','customerpayment','vendorcredit','vendorpayment'];
                    if (isInArray(tranType,creditRecTypes)) {
                        // for credits, amountRemaining <= payAmount <= 0
                        payAmount = (payAmount > 0) ? 0 : payAmount;
                        payAmount = (payAmount < amountRemaining) ? amountRemaining : payAmount;
                    }
                    else {
                        // for payables, amountRemaining >= payAmount >= 0
                        payAmount = (payAmount < 0) ? 0 : payAmount;

                    	var termValue = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_disctermhdn', lineNum), 10);
                        var dateToBeProcessed = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));
                        var discDate = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discdate', lineNum);
                    	var origDiscAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamounthdn', lineNum);
                    	var validTranTypeList = ['vendorbill', 'invoice'];
                        var validDateForDiscount = false;
						//compare dates only if there's a discount date. otherwise, consider discount with no expiration
						if((discDate && dateToBeProcessed <= nlapiStringToDate(discDate)) || (origDiscAmt && !discDate)){
							validDateForDiscount = true;
						}
                        if( validDateForDiscount && isInArray(tranType, validTranTypeList) && origDiscAmt){
                        	var termAmt = (100.00 - termValue)/100.00;
                            var discAmt = "";
                            var isError = false;

                            if(payAmount && payAmount > 0){
                            	discAmt = (payAmount / termAmt) - payAmount;
                            	if(payAmount + discAmt > amountRemaining){
                            		discAmt = amountRemaining - payAmount;
                            	}

                            	if(discAmt < 0){
    		                    	showAlertMsg(MESSAGEMAP_ALERT['maxmarkedtran'] + tranType + MESSAGEMAP_ALERT['exceedremainingamt2']);
    	                        	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, origDiscAmt);
    		                    	if(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T'){
    		                    		payAmount = amountRemaining - origDiscAmt;
    		                    	} else{
    		                    		payAmount = 0;
    		                    	}
    	                        	isError = true;

                            	}
                            } else {
	                        	isError = true;
                            }
                            if(!isError){
                            	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, discAmt != 0.0 ? discAmt.toFixed(2) : "");
                            }
                    	} else if(payAmount > amountRemaining){
                        	showAlertMsg(MESSAGEMAP_ALERT['paymentexceed'] + tranType + MESSAGEMAP_ALERT['exceedremainingamt2']);
                        	if(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T'){
	                    		payAmount = amountRemaining;
	                    	} else{
	                    		payAmount = 0;
	                    	}
                        }
                    }
                    nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum, nlapiFormatCurrency(payAmount));

                    // auto-check payment box
                    var payVal = 'F';
                    if (isInArray(tranType,creditRecTypes)) {
                        // for credits, check if amount is less than 0
                        payVal = payAmount < 0 ? 'T' : 'F';
                    }
                    else {
                        // for payables, check if amount is greater than 0
                        payVal = payAmount > 0 ? 'T' : 'F';
                    }
                    nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum, payVal, false);

                    //Set name to MarkProperty to make sure MarkData is updated with correct amount
                    name =  this._sublistClient.MarkProperty;
                }
                else if (name == 'custpage_discamount') {
                    var amountRemaining = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_amountremaining', lineNum);
                    var discAmt = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum), 10);
                	var origDiscAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamounthdn', lineNum);

                    var dateToBeProcessed = nlapiStringToDate(nlapiGetFieldValue('custpage_2663_process_date'));
                    var discDate = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discdate', lineNum);
                    var tranType = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_trantype', lineNum);
                	var validTranTypeList = ['vendorbill', 'invoice'];

                	var termValue = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_disctermhdn', lineNum), 10);
                    var maxDiscAmt = amountRemaining * (termValue / 100);

                    if(discAmt != 0){
						//consider discount with no expiration
	                    if(isInArray(tranType, validTranTypeList) && origDiscAmt && ((dateToBeProcessed <= nlapiStringToDate(discDate) && discDate) || (origDiscAmt && !discDate))){
	                    	if(discAmt && discAmt >= 0){
	                    		if(discAmt > maxDiscAmt){
		                    		showAlertMsg(MESSAGEMAP_ALERT['discamtexceed']);
		                        	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, nlapiFormatCurrency(origDiscAmt));
		                    	}
	                    	} else if (discAmt){
		                    	showAlertMsg(MESSAGEMAP_ALERT['zerodisc']);
		                    	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, nlapiFormatCurrency(origDiscAmt) );
	                    	}

	                        discAmt = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum), 10) ? parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum), 10) : 0.0;

	                        var paymentAmount = parseFloat(nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum));

	                    	if(paymentAmount + discAmt > amountRemaining){
		                    	showAlertMsg(MESSAGEMAP_ALERT['exceedremainingamt'] + tranType + MESSAGEMAP_ALERT['exceedremainingamt2']);
	                            nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum, nlapiFormatCurrency(amountRemaining - discAmt));
	                    	}
	                    } else{
	                    	if(!isInArray(tranType, validTranTypeList)){
	                    		if(paymentType == 'eft')
	                    			showAlertMsg(MESSAGEMAP_ALERT['discvendorbill']);
	                    		else if (paymentType == 'dd')
	                    			showAlertMsg(MESSAGEMAP_ALERT['discvendorbill']);
	                    		else
	                    			showAlertMsg(MESSAGEMAP_ALERT['discvendorinvoice']);
	                    	} else if(!origDiscAmt){
	                    		if(paymentType == 'eft')
	                    			showAlertMsg(MESSAGEMAP_ALERT['discnotermseft']);
	                    		else
	                    			showAlertMsg(MESSAGEMAP_ALERT['discnotermsdd']);
	                    	} else if(dateToBeProcessed > nlapiStringToDate(discDate) && discDate){
	                    		showAlertMsg(MESSAGEMAP_ALERT['discafterperiod']);
	                    	}
	                    	nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum, '');
	                    }
                    }
                    //Set name to MarkProperty to make sure MarkData is updated with correct amount
                    name =  this._sublistClient.MarkProperty;
                }

                if (otherProps && otherProps.length > 0) {
                	if (name == 'custpage_pay' || isInArray(name, otherProps)) {
                		var isSelected = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T';
                		if (isSelected || isInArray(name, otherProps)) {
    	             		var markObj = {};
    	             		for (var i = 0, ii = otherProps.length; i < ii; i++) {
    	             			var propName = otherProps[i];
                        		var propVal = nlapiGetLineItemValue('custpage_2663_sublist', propName, lineNum);
                        		markObj[propName] = propVal;
                        		if (name == propName) {
                        			if (propVal) {
                        				nlapiSetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum, 'T', false);
                        			}
                        			//Set name to MarkProperty to make sure MarkData is updated with correct prop value
                        			name =  this._sublistClient.MarkProperty;
                        		}
    	                	}
    	             		nlapiSetLineItemValue('custpage_2663_sublist', this._sublistClient.MarkProperty, lineNum, JSON.stringify(markObj));
    	             	} else if (name == 'custpage_pay') {
    	             		for (var i = 0, ii = otherProps.length; i < ii; i++) {
    	             			var propName = otherProps[i];
    	             			if (propName.indexOf('amount') < 0 && propName != 'custpage_email_notif_hidden') {
    	             				nlapiSetLineItemValue('custpage_2663_sublist', propName, lineNum, '', false);
    	             			}
    	             			if(propName == 'custpage_email_notif'){
	             					var hiddenEmail = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_email_notif_hidden', lineNum);
    	             				nlapiSetLineItemValue('custpage_2663_sublist', propName, lineNum, hiddenEmail, false);
	             				}
    	                	}
    	             		name =  this._sublistClient.MarkProperty;
    	             		nlapiSetLineItemValue('custpage_2663_sublist', this._sublistClient.MarkProperty, lineNum, '');
    	             	}
                	}
                }

                if (currFlag) {
                    if (nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T') {
                        var paymentAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum);
                        var markObj = {};
                        markObj.amount = paymentAmt;
                        if (isMultiCurrency()) {
                            var currencyId = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_currencyhdn', lineNum);
                            markObj.currency = currencyId;
                        }
                        var entityId = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_entityid', lineNum);
                        if (entityId) {
                        	markObj.entity = entityId;
                        }
                        var tranType = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_trantype', lineNum);
                        if (tranType) {
                        	markObj.type = tranType;
                        }
                        var discAmt = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_discamount', lineNum);
                        if (discAmt) {
                        	markObj.custpage_discamount = discAmt;
                        }
                        nlapiSetLineItemValue('custpage_2663_sublist', this._sublistClient.MarkProperty, lineNum, JSON.stringify(markObj));
                    }
                    else {
                        nlapiSetLineItemValue('custpage_2663_sublist', this._sublistClient.MarkProperty, lineNum, '');
                    }
                }

                // update the sublist marked fields
                this._sublistClient._fieldChanged(type, name, lineNum);

                // recalc lines
                this._uiObj.RecalcLines();
            }
        }
        else {
            // call for refresh
            this._sublistClient._fieldChanged(type, name, lineNum);
        }
    }

    this.FieldChanged = fieldChanged;
};

/**
 * Sublist client parent class
 *
 * @param uiObj
 * @returns {psg_ep.SublistClient}
 */
psg_ep.SublistClient = function(uiObj) {
    if (!uiObj) {
        throw nlapiCreateError('EP_00033', 'Cannot create sublist object without ui object', true);
    }

    if (!nlapiGetFieldValue('custpage_sublist_ep_name')) {
        throw nlapiCreateError('EP_00036', 'The sublist id is not set', true);
    }

    this._uiObj = uiObj;
    this.SublistId = nlapiGetFieldValue('custpage_sublist_ep_name');
    this.MarkCol = nlapiGetFieldValue(this.SublistId + '_markcolumn');
    this.MarkKey = nlapiGetFieldValue(this.SublistId + '_markkey');
    this.MarkProperty = nlapiGetFieldValue(this.SublistId + '_markobjprop');

    /**
     * Field changed function for sublist recalc and refresh fields
     *
     * @param type
     * @param name
     * @param lineNum
     */
    function fieldChanged(type, name, lineNum) {

        // ---- Sublist fields ----
        if (name == this.SublistId + '_page' || name == this.SublistId + '_max') {
            nlapiSetFieldValue(this.SublistId + '_currpage', nlapiGetFieldValue(this.SublistId + '_page'), false);
            nlapiSetFieldValue(this.SublistId + '_maxinpage', nlapiGetFieldValue(this.SublistId + '_max'), false);
            this._uiObj.RefreshPage();
        }
        else {
            if (name == this.MarkCol || name == this.MarkProperty) {
                if (this.MarkKey && this.MarkProperty) {
                    // prepare object for marking
                    toggleLineMarked(this, lineNum, nlapiGetLineItemValue(this.SublistId, this.MarkProperty, lineNum));
                    // set mark all field to false
                    nlapiSetFieldValue(this.SublistId + '_mark_all', 'F', false);
                }
            }
        }
    }

    /**
     * Adds the marked line to hidden fields and refreshes the page dropdown
     *
     * @param {psg_ep.SublistClient} thisObj
     * @param {String} lineNum
     * @param {String} lineVal
     */
    function toggleLineMarked(thisObj, lineNum, lineVal) {
        if (thisObj && lineNum) {
            var sublistId = thisObj.SublistId;
            var markCol = thisObj.MarkCol;
            var markKey = thisObj.MarkKey;

            if (sublistId && markCol && markKey) {
                lineVal = lineVal || '';

                var isLineSelected = nlapiGetLineItemValue(sublistId, markCol, lineNum) == 'T' ? true : false;
                var lineKey = nlapiGetLineItemValue(sublistId, markKey, lineNum);

                // get marked lines for page number
                var pageNum = nlapiGetFieldValue(sublistId + '_currpage');
                var markedDataInPageStr = nlapiGetFieldValue(sublistId + '_markdata' + pageNum) || '{}';
                var markedDataInPageObj = JSON.parse(markedDataInPageStr);
                if (isLineSelected) {
                    //updatePageDropdown(sublistId, markedDataInPageObj, isLineSelected, new Number(pageNum));
                    markedDataInPageObj[lineKey] = lineVal;
                }
                else {
                    delete markedDataInPageObj[lineKey];
                    //updatePageDropdown(sublistId, markedDataInPageObj, isLineSelected, new Number(pageNum));
                }

                nlapiSetFieldValue(sublistId + '_markdata' + pageNum, JSON.stringify(markedDataInPageObj), false);
            }
        }
    }

    /**
     * Update the page dropdown
     *
     * @param {String} sublistId
     * @param {} markedDataObj
     * @param {Boolean} lineSelected
     * @param {Number} pageNum
     */
    function updatePageDropdown(sublistId, markedDataObj, lineSelected, pageNum) {
        if (JSON.stringify(markedDataObj) == '{}') {
            updatePageDropdownIdx(sublistId, pageNum, lineSelected, true);
        }
    }

    /**
     * Update the page dropdown index
     *
     * @param {String} sublistId
     * @param {Number} pageNum
     * @param {Boolean} hasSelected
     * @param {Boolean} selectedFlag
     */
    function updatePageDropdownIdx(sublistId, pageNum, hasSelected, selectedFlag) {
        var spanElement = document.getElementById(sublistId + '_page_fs');
        var dropdownObj = getDropdown(spanElement);
        var dropdownIdx = pageNum - 1;
        var currPageDropdownText = dropdownObj.textArray[dropdownIdx];
        var currPageDropdownVal = dropdownObj.valueArray[dropdownIdx];

        var newVal = currPageDropdownText;
        if (hasSelected == true) {
            // set the page as marked
            if (currPageDropdownText.indexOf(' (*)') == -1) {
                newVal = currPageDropdownText + ' (*)';
            }
        }
        else {
            // set the page as unmarked
            if (currPageDropdownText.indexOf(' (*)') != -1) {
                newVal = currPageDropdownText.substring(0, currPageDropdownText.indexOf(' (*)'));
            }
        }
        dropdownObj.setOptionText(currPageDropdownVal, newVal);
        if (selectedFlag == true) {
            dropdownObj.setText(newVal);
        }
    }

    this._fieldChanged = fieldChanged;
};

/**
 * Field validator functions
 *
 * @returns {psg_ep.PaymentSelectionValidator}
 */
psg_ep.PaymentSelectionValidator = function() {
    /**
     * Checks whether there are selected transaction lines
     *
     * @param {String} paymentType
     * @param {String} batchFlag
     * @returns {Boolean}
     */
    function checkSelectedLines(paymentType, batchFlag) {
        var result = true;

        if (paymentType == 'eft' || paymentType == 'dd') {
            batchFlag = batchFlag || false;
            if (nlapiGetFieldValue('custpage_2663_total_amount') <= 0 && nlapiGetFieldValue('custpage_2663_payment_lines') == 0) {
                if (batchFlag == false) {
                    showAlertMsg(MESSAGEMAP_ALERT['paymenttranalert']);
                }
                else  {
                    showAlertMsg(MESSAGEMAP_ALERT['notran']);
                }
                result = false;
            }
        }
        else if (paymentType == 'pp') {
            if (nlapiGetFieldValue('custpage_2663_total_amount') <= 0 && nlapiGetFieldValue('custpage_2663_void_total_amount') <= 0) {
                showAlertMsg(MESSAGEMAP_ALERT['nocheques']);
                result = false;
            }
        }
        else if (paymentType == 'custref') {
            if (nlapiGetFieldValue('custpage_2663_total_amount') <= 0) {
                showAlertMsg(MESSAGEMAP_ALERT['notran']);
                result = false;
            }
        } else if (paymentType == 'reversal' || /*NOTE: For deprecation*/paymentType == 'notification') {
        	if (nlapiGetFieldValue('custpage_2663_payment_lines') <= 0) {
                showAlertMsg(MESSAGEMAP_ALERT['notran']);
                result = false;
            }
        }
        else {
            result = false;
        }
        return result;
    }

    /**
     * Check whether the processing date is within posting period
     *
     * @returns {Boolean}
     */
    function checkAccountingPeriod() {
    	var datePeriodMismatchPref = nlapiGetContext().getPreference('DATEPERIODMISMATCH');
        var result = true;
        if (datePeriodMismatchPref != 'ALLOW') {
        	var processDate = nlapiGetFieldValue('custpage_2663_process_date');
        	if (processDate) {
        		var accountingPeriod = getAccountingPeriod(processDate);
                result = accountingPeriod == nlapiGetFieldValue('custpage_2663_postingperiod');
                if (!result) {
                    showAlertMsg(MESSAGEMAP_ALERT['acctrange']);
                    result = datePeriodMismatchPref == 'WARN';
                }
        	}
        }
        return result;
    }

    /**
     * Set the accounting period from process date
     */
    function setAccountingPeriodFromProcessDate() {
        if (nlapiGetFieldValue('custpage_2663_process_date') && nlapiGetFieldValue('custpage_2663_postingperiod')) {
            var accountingPeriod = getAccountingPeriod(nlapiGetFieldValue('custpage_2663_process_date'), true);
            if (accountingPeriod) {
                if (nlapiGetFieldValue('custpage_2663_postingperiod') != accountingPeriod) {
                    nlapiSetFieldValue('custpage_2663_postingperiod', accountingPeriod, false);
                }
            }
        }
    }

    /**
     * Check if DCL is set if it was set to mandatory while selecting transactions
     *
     * @returns {Boolean}
     */
    function checkDCLSettings() {
        var result = true;

        var dclSettings = getDCLSettings();
        var dclToSet = [];
        if (nlapiGetField('custpage_2663_department') && !nlapiGetFieldValue('custpage_2663_department') && !nlapiGetField('custpage_2663_department').isMandatory() && dclSettings.deptField.isMandatory) {
            dclToSet.push(nlapiGetContext().getPreference('NAMING_DEPARTMENT'));
        }
        if (nlapiGetField('custpage_2663_classification') && !nlapiGetFieldValue('custpage_2663_classification') && !nlapiGetField('custpage_2663_classification').isMandatory() && dclSettings.classField.isMandatory) {
            dclToSet.push(nlapiGetContext().getPreference('NAMING_CLASS'));
        }
        if (nlapiGetField('custpage_2663_location') && !nlapiGetFieldValue('custpage_2663_location') && !nlapiGetField('custpage_2663_location').isMandatory() && dclSettings.locField.isMandatory) {
            dclToSet.push(nlapiGetContext().getPreference('NAMING_LOCATION'));
        }
        if (dclToSet.length > 0) {
            result = false;
            showAlertMsg(MESSAGEMAP_ALERT['acctprefmodified'] + dclToSet.join(', '));
        }

        return result;
    }

    /**
     * Check whether it's possible to start payment processing
     *
     * @param {String} fileFormat
     * @param {String} account
     * @param {String} subsidiaryId
     * @returns {Boolean}
     */
    function canStartPaymentProcessing(fileFormat, account, subsidiaryId) {
        var res = true;
        if (fileFormat && account) {
            res = canStartProcessing(fileFormat, account, subsidiaryId);
            if (res == false) {
                var subsidiaryIdText = nlapiGetFieldText('custpage_2663_subsidiary');
                var fileFormatText = nlapiGetFieldText('custpage_2663_format_display');
                var accountText = nlapiGetFieldText('custpage_2663_ap_account') || nlapiGetFieldText('custpage_2663_ar_account');

                var errorMessage = MESSAGEMAP_ALERT['queuepaymentprocess'];
                errorMessage += MESSAGEMAP_ALERT['fileformat'] + fileFormatText + '\n';
                if (accountText) {
                    errorMessage += MESSAGEMAP_ALERT['acct'] + accountText + '\n';
                }
                if (subsidiaryIdText) {
                    errorMessage += MESSAGEMAP_ALERT['subsidiary'] + subsidiaryIdText + '\n';
                }
                errorMessage += MESSAGEMAP_ALERT['trylater'];
                showAlertMsg(errorMessage);
            }
        }
        else {
            res = false;
        }

        return res;
    };

    /**
     * Check whether it's possible to start payment batch creation
     *
     * @param {String} bankAccount
     * @param {String} account
     * @param {String} subsidiaryId
     * @returns {Boolean}
     */
    function canStartBatchCreation(bankAccount, account, subsidiaryId) {
        var ret = false;
		if (bankAccount && account) {
            var filters = [new nlobjSearchFilter('custrecord_2663_bank_account', null, 'is', bankAccount),
                           new nlobjSearchFilter('custrecord_2663_account', null, 'is', account),
                           new nlobjSearchFilter('custrecord_2663_status', null, 'is', BATCH_UPDATING)
                          ];

            if (isOneWorld()) {
            	filters.push(new nlobjSearchFilter('custrecord_2663_payment_subsidiary', null, 'is', subsidiaryId));
            }
            var res = nlapiSearchRecord('customrecord_2663_file_admin', null, filters, new nlobjSearchColumn('altname'));
            if (res) {
            	var subsidiaryIdText = nlapiGetFieldText('custpage_2663_subsidiary');
            	var bankAccountText = nlapiGetFieldText('custpage_2663_bank_account');
                var accountText = nlapiGetFieldText('custpage_2663_ap_account');
                var batchName = res[0].getValue('altname');

				var errorMessage = 'Another Payment Batch is currently being updated for:\n\n';
                errorMessage += 'Bank Account: ' + bankAccountText + '\n';
                if (accountText) {
                    errorMessage += 'Account: ' + accountText + '\n';
                }
                if (subsidiaryIdText) {
                    errorMessage += 'Subsidiary: ' + subsidiaryIdText + '\n';
                }
                if (batchName) {
                	errorMessage += 'Payment Batch: ' + batchName + '\n';
                }

                errorMessage += '\nPlease retry at a later time.';
                showAlertMsg(errorMessage);
            }
			else {
				ret = true;
			}
        }
        return ret;
    };

    /**
     * Returns true when the payment processing can start for a PFA with specified file format, account, and subsidiary
     *
     * @param fileFormat
     * @param account
     * @param subsidiaryId
     * @returns {Boolean}
     */
    function canStartProcessing(fileFormat, account, subsidiaryId) {
        var result = false;
        var oneWorldFlag = isOneWorld();
        if ((oneWorldFlag == true && subsidiaryId && fileFormat) || (oneWorldFlag == false && fileFormat)) {
            var searchResults = getProcessingPFARecords([PAYPROCESSED, PAYFAILED, PAYERROR, PAYCANCELLED, PAYMARKED], [EP_PROCESSPAYMENTS]);
            if (searchResults) {
                var sameSetFromFiltersFound = false;
                for (var i = 0; i < searchResults.length; i++) {
                    var subValue = searchResults[i].getValue('custrecord_2663_payment_subsidiary');
                    var eftTemplate = searchResults[i].getValue('custrecord_2663_eft_template', 'custrecord_2663_bank_account');
                    var ddTemplate = searchResults[i].getValue('custrecord_2663_dd_template', 'custrecord_2663_bank_account');
                    var ppTemplate = searchResults[i].getValue('custrecord_2663_pp_template', 'custrecord_2663_bank_account');
                    var accountValue = searchResults[i].getValue('custrecord_2663_account');

                    //check if PFA with same subsidiary, file format and
                    // check sub
                    var subFlag = false;
                    if (oneWorldFlag == false) {
                        subFlag = true;
                    }
                    else if (subsidiaryId && subsidiaryId == subValue) {
                        subFlag = true;
                    }

                    // check file format
                    var fileFormatFlag = false;
                    if (fileFormat == eftTemplate || fileFormat == ddTemplate || fileFormat == ppTemplate) {
                        fileFormatFlag = true;
                    }

                    // check account
                    var acctFlag = false;
                    if (!account) {
                        acctFlag = true;
                    }
                    else if (account == accountValue) {
                        acctFlag = true; // no account specified
                    }

                    if (subFlag == true && fileFormatFlag == true && acctFlag == true) {
                        sameSetFromFiltersFound = true;
                        break;
                    }
                }

                if (sameSetFromFiltersFound == false) {
                    result = true;
                }
            } else {
                result = true;
            }
        }
        return result;
    }

    /**
     * Gets the currently processing PFA records
     *
     * @param {Array} statuses
     * @param {Array} processes
     * @param {Array} pdaIds
     * @param {String} subsidiary
     */
    function getProcessingPFARecords(statuses, processes, pfaIds, subsidiary) {
        if (statuses && statuses.length > 0) {
        	var filters = [];
            var columns = [];
            // filter for queued/processing payment file admin records
        	filters.push(new nlobjSearchFilter('custrecord_2663_file_processed', null, 'noneof', statuses));
        	if (processes && processes.length > 0) {
        		filters.push(new nlobjSearchFilter('custrecord_2663_last_process', null, 'anyof', processes));
        	}
        	if (pfaIds && pfaIds.length > 0) {
        		filters.push(new nlobjSearchFilter('internalid', null, 'noneof', pfaIds));
        	}
        	if (isOneWorld() && subsidiary) {
        		filters.push(new nlobjSearchFilter('custrecord_2663_payment_subsidiary', null, 'is', subsidiary));
        	}
        	columns.push(new nlobjSearchColumn('name'));
            columns.push(new nlobjSearchColumn('custrecord_2663_file_processed'));
            columns.push(new nlobjSearchColumn('custrecord_2663_last_process'));
            columns.push(new nlobjSearchColumn('custrecord_2663_payment_subsidiary'));
            columns.push(new nlobjSearchColumn('custrecord_2663_bank_account'));
            columns.push(new nlobjSearchColumn('custrecord_2663_account'));
            columns.push(new nlobjSearchColumn('custrecord_2663_eft_template', 'custrecord_2663_bank_account'));
            columns.push(new nlobjSearchColumn('custrecord_2663_dd_template', 'custrecord_2663_bank_account'));
            columns.push(new nlobjSearchColumn('custrecord_2663_pp_template', 'custrecord_2663_bank_account'));

            return nlapiSearchRecord('customrecord_2663_file_admin', null, filters, columns);
        }
        return null;
    }

    /**
     * Get the accounting period to where the date belongs
     *
     * @param {String} date
     * @param {Boolean} nextOpen
     */
    function getAccountingPeriod(date, nextOpen) {
        var accountingPeriod = '';

        if (date) {
            var procDate = nlapiStringToDate(date);
            var startDateObj = JSON.parse(nlapiGetFieldValue('custpage_2663_ppstart'));
            var endDateObj = JSON.parse(nlapiGetFieldValue('custpage_2663_ppend'));
            var closedObj = JSON.parse(nlapiGetFieldValue('custpage_2663_ppclosed'));
            var checkNextOpenPeriod = false;
            var periodIds = [];
            if (startDateObj && endDateObj) {
                for (var i in startDateObj) {
                	if (nextOpen && checkNextOpenPeriod) {
                		if (closedObj[i] == 'F') {
                			accountingPeriod = i;
                			break;
                		}
                	} else {
                		var startDateStr = startDateObj[i];
                        var endDateStr = endDateObj[i];
                        if (startDateStr && endDateStr) {
                            var startDate = nlapiStringToDate(startDateStr);
                            var endDate = nlapiStringToDate(endDateStr);
                            if (startDate <= procDate && endDate >= procDate) {
                                if (nextOpen && closedObj && closedObj[i] == 'T') {
                                	checkNextOpenPeriod = true;
                                } else {
                                	accountingPeriod = i;
                                	break;
                                }
                            }
                        }
                	}
                	if (nextOpen && i && closedObj[i] == 'F') {
                		periodIds.push(i);
                	}
                }
            }
            if (nextOpen && !accountingPeriod && periodIds.length > 0) {
            	var currDate = new Date();
            	if (procDate > currDate) {
            		accountingPeriod = periodIds[periodIds.length - 1];
            	} else if (procDate < currDate) {
            		accountingPeriod = periodIds[0];
            	}
            }
        }

        return accountingPeriod;
    }

    /**
     * Checks amount to be paid per entity
     *
     * @returns {Boolean}   flag for acceptable amount for all entities
     */
    function checkEntityAmt(){

        var result = true;
        var isSummarized = nlapiGetFieldValue('custpage_2663_summarized') == 'T';
        var isCreditIncluded = false;
        var mapEntityAmt = {};

        if (isSummarized){
            // get info from batch record fields
            var batchId = nlapiGetFieldValue('custpage_2663_batchid');
            var objBatchInfo = nlapiLookupField('customrecord_2663_file_admin', batchId, ['custrecord_2663_batch_with_credit', 'custrecord_2663_batch_map_entity_amt']);
            isCreditIncluded = objBatchInfo['custrecord_2663_batch_with_credit'] === 'T';
            mapEntityAmt = JSON.parse(objBatchInfo['custrecord_2663_batch_map_entity_amt'] || '{}');
        }

        else {
        // get exchange rates (if with value)
	        var exchangeRates;
	        if (nlapiGetFieldValue('custpage_2663_exchange_rates')) {
	            try {
	              exchangeRates = JSON.parse(nlapiGetFieldValue('custpage_2663_exchange_rates'));
	            }
	            catch(ex) {
	              showAlertMsg(MESSAGEMAP_ALERT['exchangeratestr'] + nlapiGetFieldValue('custpage_2663_exchange_rates') + MESSAGEMAP_ALERT['defaultrate']);
	            }
	        }

	        // loop through transactions to be processed
	        var creditRecTypes = ['creditmemo','customerpayment','vendorcredit','vendorpayment'];
	        var sublistLineCount = nlapiGetLineItemCount('custpage_2663_sublist');
	        for (var lineNum = 1; lineNum <= sublistLineCount; lineNum++) {// TODO: Bug here, only checks current page
	            if (nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_pay', lineNum) == 'T'){

	                // get currency
	                var currency = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_currencyhdn', lineNum) || 'default';

	                // get exchange rate
	                var exchangeRate = 1;
	                if (exchangeRates && exchangeRates[currency]) {
	                    exchangeRate = exchangeRates[currency];
	                }

	                // solve for amount
	                var lineAmount = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_payment', lineNum);
	                lineAmount *= exchangeRate;

	                // create entity - currency - amount map
	                var entityName = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_entity', lineNum);
	                if (mapEntityAmt[entityName]) {
	                    if (mapEntityAmt[entityName][currency]){
	                        mapEntityAmt[entityName][currency] += lineAmount;
	                    }
	                    else {
	                        mapEntityAmt[entityName][currency] = lineAmount;
	                    }
	                }
	                else {
	                    mapEntityAmt[entityName] = {};
	                    mapEntityAmt[entityName][currency] = lineAmount;
	                }

	                // check if this is a credit transaction
	                var tranType = nlapiGetLineItemValue('custpage_2663_sublist', 'custpage_trantype', lineNum);
	                if (!isCreditIncluded && isInArray(tranType, creditRecTypes)){
	                    isCreditIncluded = true;
	                }

	            }
	    	}
        }

        // credit related validations
        if (isCreditIncluded) {
            // check if there's a total negative value for each entity-currency combination
            var invalidEntities = [];
            for (var entity in mapEntityAmt){
                for (var currency in mapEntityAmt[entity]){
                    if (mapEntityAmt[entity][currency] < 0){
                        invalidEntities.push(entity);
                        break;
                    }
                }
            }

            // inform the user of the entities with invalid net amounts
            if (invalidEntities.length > 0){
                var message = MESSAGEMAP_ALERT['exceedcreditamt'];
                for (var i = 0, ii = invalidEntities.length; i < ii; i++){
                    message += invalidEntities[i] + '\n';
                }
                showAlertMsg(message);
                result = false;
            }

            // Aggregate by Payee is mandatory when credits are included
            if (result && nlapiGetFieldValue('custpage_2663_aggregate') == 'F'){
                if(!confirm(MESSAGEMAP_ALERT['requiredagg'])){
                    result = false;
                }else{
                    nlapiSetFieldValue('custpage_2663_aggregate', 'T', false);
                }
            }
        }
        return result;
    }

    function validateSegments(){
        var result = true;
        var subsidiary = nlapiGetFieldValue('custpage_2663_subsidiary');
        var subsidiaryName = nlapiGetFieldText('custpage_2663_subsidiary');

        var segmentResult = _2663.validateSegments({
            subsidiary: subsidiary,
            subsidiaryName: subsidiaryName,
            department: nlapiGetFieldValue('custpage_2663_department'),
            classification: nlapiGetFieldValue('custpage_2663_classification'),
            location: nlapiGetFieldValue('custpage_2663_location'),
            TRANSLATION_MSGS: {'ps.alert.validateSegments': MESSAGEMAP_ALERT['validatesegments']},
        	msgNames: {messages: {validateSegments: 'validatesegments' }}
        });

        if (!segmentResult.isSuccess){
            showAlertMsg(segmentResult.message);
            result = false;
        }

        return result;
    }

    this.CheckSelectedLines = checkSelectedLines;
    this.CheckAccountingPeriod = checkAccountingPeriod;
    this.CheckEntityAmt = checkEntityAmt;
    this.SetAccountingPeriodFromProcessDate = setAccountingPeriodFromProcessDate;
    this.CheckDCLSettings = checkDCLSettings;
    this.CanStartPaymentProcessing = canStartPaymentProcessing;
    this.CanStartBatchCreation = canStartBatchCreation;
    this.ValidateSegments = validateSegments;
};

/**
 * Class for exchange rate subtab
 *
 * @returns {psg_ep.PaymentSelectionClient_ExchangeRate}
 */
psg_ep.PaymentSelectionClient_ExchangeRate = function() {
    /**
     * Field changed function for exchange rate
     *
     * @param {String} type
     * @param {String} name
     * @param {String} lineNum
     */
    function fieldChanged(type, name, lineNum) {

        if (name == 'custpage_currency_exchange') {
            // set value to 1 if less than or equal to 0
            if (nlapiGetLineItemValue('custpage_exchange_rate', 'custpage_currency_exchange', lineNum) <= 0) {
                nlapiSetLineItemValue('custpage_exchange_rate', 'custpage_currency_exchange', lineNum, 1);
            }
            // set the exchange rate
            if (nlapiGetFieldValue('custpage_2663_exchange_rates')) {
                var exchangeRateObj = JSON.parse(nlapiGetFieldValue('custpage_2663_exchange_rates'));
                exchangeRateObj[nlapiGetLineItemValue('custpage_exchange_rate', 'custpage_currency_id', lineNum)] = nlapiGetLineItemValue('custpage_exchange_rate', 'custpage_currency_exchange', lineNum);
                nlapiSetFieldValue('custpage_2663_exchange_rates', JSON.stringify(exchangeRateObj), false);
            }
        }
    }

    this.FieldChanged = fieldChanged;
};

function showAlertMsg(msg){
	alert(msg)
}