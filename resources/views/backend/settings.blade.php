@extends('backend.layouts.app')

@section('title','General Settings || PrepMyMeal')

@section('content')
<!--main content start-->
<section id="main-content">
	<section class="wrapper">
		<!--page start-->
		<div class="row">
			<div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading">
                        General Settings
                        <span class="tools pull-right">
						</span>
                    </header>
                    <div class="panel-body">
						<div class="position-center">
							{!! Form::open(['route'=>'storeSettings']) !!}
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control" name="webEmail" id="email" placeholder="Enter email" value="{{ $option->email }}">
                                </div>
                                <div class="form-group">
                                    <label for="ups_email">UPS Email address</label>
                                    <input type="ups_email" class="form-control" name="upsEmail" id="ups_email" placeholder="Enter UPS Email address" value="{{ $option->ups_email }}">
                                </div>
                                <div class="form-group">
                                    <label for="kitchen_email">Kitchen Email address</label>
                                    <input type="kitchen_email" class="form-control" name="kitchenEmail" id="kitchen_email" placeholder="Enter Kitchen Email address" value="{{ $option->kitchen_email }}">
                                </div>
                                <div class="form-group">
                                    <label for="marketing_email">Marketing Email address</label>
                                    <input type="marketing_email" class="form-control" name="marketingEmail" id="marketing_email" placeholder="Enter Marketing Email address" value="{{ $option->marketing_email }}">
                                </div>
                                <div class="form-group">
                                    <label for="mobile">Mobile No.</label>
                                    <input type="text" class="form-control" name="webMobile" id="mobile" placeholder="Mobile No" value="{{ $option->phone }}">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="mobile">Taxes & Charges</label>
                                </div>
                                <div class="form-group">
                                    <label for="shipping_tax">Shipping Charge</label>
                                    <input type="text" class="form-control" name="shippingTax" id="shipping_tax" placeholder="Enter Shipping
                                    Charge" value="{{ $option->shipping_tax }}">
                                </div>
                                <div class="form-group">
                                    <label for="vat_tax">VAT Tax (in %)</label>
                                    <input type="text" class="form-control" name="vatTax" id="vat_tax" placeholder="VAT tax" value="{{
                                    $option->vat_tax }}">
                                </div>
                            <div class="form-group">
                                <label for="drink_vat_tax">Drink VAT Tax (in %)</label>
                                <input type="text" class="form-control" name="drinkVatTax" id="drink_vat_tax" placeholder="VAT tax"
                                       value="{{ $option->drink_vat_tax }}">
                            </div>
                                <hr>
                                <div class="form-group">
                                    <label for="mobile">Social Links</label>
                                </div>
								<div class="form-group">
                                    <label for="facebook">Facebook</label>
                                    <input type="text" class="form-control" name="facebook" id="facebook" placeholder="https://www.facebook.com/{page}" value="{{ $option->facebook }}">
                                </div>
								<div class="form-group">
                                    <label for="twitter">Twitter</label>
                                    <input type="text" class="form-control" name="twitter" id="twitter" placeholder="https://twitter.com/{page}" value="{{ $option->twitter }}">
                                </div>
								<div class="form-group">
                                    <label for="linkedin">LinkedIn</label>
                                    <input type="text" class="form-control" name="linkedin" id="linkedin" placeholder="https://www.linkedin.com/in/{page}" value="{{ $option->linkedin }}">
                                </div>
								<div class="form-group">
                                    <label for="googlePlus">Google Plus</label>
                                    <input type="text" class="form-control" name="googlePlus" id="googlePlus" placeholder="https://plus.google.com/{page}" value="{{ $option->googlePlus }}">
                                </div>
                                <div class="form-group">
                                    <label for="youtube">Youtube</label>
                                    <input type="text" class="form-control" name="youtube" id="youtube" placeholder="https://www.youtube.com/channel/{channel_id}" value="{{ $option->youtube }}">
                                </div>
                                <div class="form-group">
                                    <label for="instagram">Instagram</label>
                                    <input type="text" class="form-control" name="instagram" id="instagram" placeholder="https://www.instagram.com/{page}" value="{{ $option->instagram }}">
                                </div>
                                <div class="form-group">
                                    <label for="flickr">Flickr</label>
                                    <input type="text" class="form-control" name="flickr" id="flickr" placeholder="https://www.flickr.com/photos/{page}" value="{{ $option->flickr }}">
                                </div>
                                <div class="form-group">
                                    <label for="vimeo">Vimeo</label>
                                    <input type="text" class="form-control" name="vimeo" id="vimeo" placeholder="https://vimeo.com/{page}" value="{{ $option->vimeo }}">
                                </div>
                                <div class="form-group">
                                    <label for="telegram">Telegram</label>
                                    <input type="text" class="form-control" name="telegram" id="telegram" placeholder="https://t.me/{page}" value="{{ $option->telegram }}">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="verifyTag">Site Verification Link</label>
                                    <textarea class="form-control" name="verifyTag" id="verifyTag" placeholder="<meta name='google-site-verification' content='' />" rows="3" cols="40">{{ $option->verifyTag }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="googleAnalytics">Google Analytics</label>
                                    <textarea class="form-control" name="googleAnalytics" id="googleAnalytics" placeholder="Google Analytics" rows="8" cols="40">{{ $option->googleAnalytics }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="chatLink">Chat Script</label>
                                    <textarea class="form-control" name="chatLink" id="chatLink" placeholder="Chat Script" rows="8" cols="40">{{ $option->chatLink }}</textarea>
                                </div>
                                <button type="submit" class="btn btn-info">Submit</button>
                            </form>
						</div>
			        </div>
			    </section>
			</div>
		</div>
	</section>
</section>
@endsection

@section('styles')

@endsection

@section('scripts')

@endsection