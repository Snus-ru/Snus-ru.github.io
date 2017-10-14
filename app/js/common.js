;$(function() {

	var formMail = $('#contact-form');

	// simple cart js start	
	simpleCart({
		cartStyle: "div"
	});

	simpleCart.currency({
		code: "RUB" ,
		name: "Рубль" ,
		symbol: " &#8381;" ,
		delimiter: " " , 
		decimal: "," , 
		after: true ,
		accuracy: 0
	});

	function updateForm()  {
		simpleCart.ready(function() {
			$('.del').remove();
			simpleCart.each(function(item, x) {
				formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Название" value="' + item.get('name') + '">');
				formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Количество" value="' + item.get('quantity') + '">');
				formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Цена за еденицу" value="' + item.get('price') + '">');
				formMail.append('<input class="del" type="hidden" name="' + item.get('id') + ' Общая стоимость" value="' + item.get('total') + '">');
			});
		});
	}
	updateForm();

	simpleCart.bind( 'update' , function(){
		updateForm();
	});
	
	// simple cart js end	

	// HTML text input allows only numeric input START
	$("#txtboxToFilter").keydown(function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
						 // Allow: Ctrl/cmd+A
						 (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
						 // Allow: Ctrl/cmd+C
						 (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
						 // Allow: Ctrl/cmd+X
						 (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
						 // Allow: home, end, left, right
						 (e.keyCode >= 35 && e.keyCode <= 39)) {
								 // let it happen, don't do anything
								return;
							}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});
	// HTML text input allows only numeric input END


	// Форма заказа, приходит на почту START
	formMail.submit(function(event) {

		event.preventDefault();

		$.ajax({
			url: "//formspree.io/snus.msi@gmail.ru", 
			method: "POST",
			data: formMail.serialize(),
			dataType: "json"
		}).done(function(){
			$("#phone").val("");
			$("#message").val("");
			simpleCart.empty();
			$("#checkout").html('<div class="text-center"><h1>Спасибо за заказ</h1><p>Ожидайте, мы с Вами свяжемся в течении суток</p><p><a href="/">Перейти на главную</a></p></div>');
		}).fail(function(){
			alert("Ошибка");
		});
	});
	// Форма заказа, приходит на почту END




});