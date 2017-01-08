<style>
</style>
<template>
	<div>
		<div class="row">
			<ol class="breadcrumb">
				<li><a href="#/main/home"><span class="glyphicon glyphicon-home"></span></a></li>
				<li class="active">{{title}}</li>
			</ol>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<h4></h4>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>