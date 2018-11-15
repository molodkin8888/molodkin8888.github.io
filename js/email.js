
$(document).on('click', '#modal_btn', function(){
	var name_modal = $('#modal_name').val();
	var modal_phone = $('#phone_modal').val();	

	var str = `<div>
            <div><span><strong>First Name: </strong></span>${name_modal}<span></span></div>
            <div><span><strong>Last Name: </strong></span>${modal_phone}<span></span></div>
                </div>`

                var data = {
                	 "Email": "zhenya.molodkin@gmail.com",
               		 "Subject": `оформить заказ - ${name_modal} ${modal_phone}`,
               		 "Message": str
                }

                $.ajax({
                	url: "https://molodkin.info:9080/process-form",
                	type: "POST",
                	contentType: "application/json",
                	data: JSON.stringify(data),
                	success:function createList(data){
						$('#modal_name').val('');
						$('#phone_modal').val('');
                	},
                	error: function(){
                        $('#exampleModalCenter').modal('hide');
                        $('#errorModal').modal('show');
                		$('#modal_name').val('');
						$('#phone_modal').val('');
                	}
                })
});



$(document).on('click', '#call_me_now_btn', function(){
    var name_modal = $('#name').val();
    var modal_phone = $('#phone_number').val();  

    var str = `<div>
            <div><span><strong>First Name: </strong></span>${name_modal}<span></span></div>
            <div><span><strong>Last Name: </strong></span>${modal_phone}<span></span></div>
                </div>`

                var data = {
                     "Email": "zhenya.molodkin@gmail.com",
                     "Subject": `оформить заказ - ${name_modal} ${modal_phone}`,
                     "Message": str
                }

                $.ajax({
                    url: "https://molodkin.info:9080/process-form",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success:function createList(data){
                        $('#name').val('');
                        $('#phone_number').val('');
                    },
                    error: function(){
                        $('#exampleModalCenter').modal('hide');
                        $('#errorModal').modal('show');
                        $('#name').val('');
                        $('#phone_number').val('');
                    }
                })
});

$(document).on('click', '#send_sale_btn', function(){
    var name_modal = $('#name_sale').val();
    var modal_phone = $('#phone_number_sale').val();  

    var str = `<div>
            <div><span><strong>First Name: </strong></span>${name_modal}<span></span></div>
            <div><span><strong>Last Name: </strong></span>${modal_phone}<span></span></div>
                </div>`

                var data = {
                     "Email": "zhenya.molodkin@gmail.com",
                     "Subject": `оформить заказ - ${name_modal} ${modal_phone}`,
                     "Message": str
                }

                $.ajax({
                    url: "https://molodkin.info:9080/process-form",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success:function createList(data){
                        $('#name_sale').val('');
                        $('#phone_number_sale').val('');
                    },
                    error: function(){
                        $('#exampleModalCenter').modal('hide');
                        $('#errorModal').modal('show');
                        $('#name_sale').val('');
                        $('#phone_number_sale').val('');
                    }
                })
});

$(document).on('click', '#call_right_now_btns', function(){
    var name_modal = $('#name_right_now').val();
    var modal_phone = $('#right_now_inp').val();  

    var str = `<div>
            <div><span><strong>First Name: </strong></span>${name_modal}<span></span></div>
            <div><span><strong>Last Name: </strong></span>${modal_phone}<span></span></div>
                </div>`

                var data = {
                     "Email": "zhenya.molodkin@gmail.com",
                     "Subject": `оформить заказ - ${name_modal} ${modal_phone}`,
                     "Message": str
                }

                $.ajax({
                    url: "https://molodkin.info:9080/process-form",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success:function createList(data){
                        $('#name_right_now').val('');
                        $('#right_now_inp').val('');
                    },
                    error: function(){
                        $('#exampleModalCenter').modal('hide');
                        $('#errorModal').modal('show');
                        $('#name_right_now').val('');
                        $('#right_now_inp').val('');
                    }
                })
});