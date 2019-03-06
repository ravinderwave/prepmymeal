<!--sidebar start-->
<aside>
    <div id="sidebar" class="nav-collapse">
        <!-- sidebar menu start-->
        <div class="leftside-navigation">
            <ul class="sidebar-menu" id="nav-accordion">
                <li>
                    <a href="{{ url('/') }}" target="_blank">
                        <i class="fa fa-globe"></i>
                        <span>Visit Website</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend']) }}" href="{{ url('/backend') }}">
                        <i class="fa fa-dashboard"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/components/*']) }}" href="{{ url('/backend/components') }}">
                        <i class="fa fa-th-large"></i>
                        <span>Components</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/meals/*']) }}" href="{{ url('/backend/meals') }}">
                        <i class="fa fa-cutlery"></i>
                        <span>Meals</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/users/*']) }}" href="{{ url('/backend/users') }}">
                        <i class="fa fa-users"></i>
                        <span>Users</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/orders/*']) }}" href="{{ url('/backend/orders') }}">
                        <i class="fa fa-shopping-cart"></i>
                        <span>Orders</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/coupons/*']) }}" href="{{ url('/backend/coupons') }}">
                        <i class="fa fa-gift"></i>
                        <span>Coupons</span>
                    </a>
                </li>
                <li>
                    <a class="{{ set_active(['backend/settings']) }}"  href="{{ route('settings') }}"><i class="fa fa-cogs"></i><span> Settings</span></a>
                </li>
            </ul>            
        </div>
        <!-- sidebar menu end-->
    </div>
</aside>
<!--sidebar end-->