<div class='form-row row'>
    <div class='col-xs-12 form-group required'>
        <label class='control-label'>Name on Card</label> 
        <input class='form-control' size='4' type='text'>
    </div>
</div>

<div class='form-row row'>
    <div class='col-xs-12 form-group card required'>
        <label class='control-label'>Card Number</label> 
        <input autocomplete='off' class='form-control card-number' size='20' type='text'>
    </div>
</div>

<div class='form-row row'>
    <div class='col-xs-12 col-md-4 form-group cvc required'>
        <label class='control-label'>CVC</label> 
        <input autocomplete='off' class='form-control card-cvc' placeholder='ex. 311' size='4' type='text'>
    </div>
    <div class='col-xs-12 col-md-4 form-group expiration required'>
        <label class='control-label'>Expiration Month</label> 
        <input class='form-control card-expiry-month' placeholder='MM' size='2' type='text'>
    </div>
    <div class='col-xs-12 col-md-4 form-group expiration required'>
        <label class='control-label'>Expiration Year</label> 
        <input class='form-control card-expiry-year' placeholder='YYYY' size='4' type='text'>
    </div>
</div>
<div class="form-row hidden recurringinterval">
    <div class='col-xs-12 form-group'>
        <label for="name">Recurring Interval</label>
        <select class="form-control" id="rinterval" name="recurring_cycle">
            <option value="0">Select Interval</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
    </div>
 </div>
<div class='form-row row'>
    <div class='col-md-12 error form-group hide'>
        <div class='alert-danger alert'>Please correct the errors and try
            again.</div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <button class="btn btn-primary btn-lg btn-block" type="submit">Pay Now</button>
    </div>
</div>
