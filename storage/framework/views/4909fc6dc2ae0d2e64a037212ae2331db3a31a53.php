<?php

$name = $data['name'];

?>
<?php echo $__env->make('emails.'.$name, \Illuminate\Support\Arr::except(get_defined_vars(), array('__data', '__path')))->render(); ?>;