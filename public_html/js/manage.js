$(document).ready(function(){
	var DOMAIN = "http://localhost/inv_project/public_html";

	//Mange Category
	manageCategory(1);
	function manageCategory(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageCategory:1,pageno:pn},
			success : function(data){
				$("#get_category").html(data);		
			}
		})
	}

	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageCategory(pn);
	})

	$("body").delegate(".del_cat","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteCategory:1,id:did},
				success : function(data){
					if (data == "DEPENDENT_CATEGORY") {
						alert("Sorry ! this Category is dependent on other sub categories");
					}else if(data == "CATEGORY_DELETED"){
						alert("Category Deleted Successfully..! happy");
						manageCategory(1);
					}else if(data == "DELETED"){
						alert("Deleted Successfully");
					}else{
						alert(data);
					}		
				}
			})
		}
	})

	//Fetch category
	fetch_category();
	function fetch_category(){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {getCategory:1},
			success : function(data){
				var root = "<option value='0'>Root</option>";
				var choose = "<option value=''>Choose Category</option>";
				$("#parent_cat").html(root+data);
				$("#select_cat").html(choose+data);
			}
		})
	}

	//Fetch Brand
	fetch_brand();
	function fetch_brand(){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {getBrand:1},
			success : function(data){
				var choose = "<option value=''>Choose Brand</option>";
				$("#select_brand").html(choose+data);
			}
		})
	}

	//Update Category
	$("body").delegate(".edit_cat","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateCategory:1,id:eid},
			success : function(data){
				console.log(data);
				$("#cid").val(data["cid"]);
				$("#update_category").val(data["category_name"]);
				$("#parent_cat").val(data["parent_cat"]);
			}
		})
	})

	$("#update_category_form").on("submit",function(){
		if ($("#update_category").val() == "") {
			$("#update_category").addClass("border-danger");
			$("#cat_error").html("<span class='text-danger'>Please Enter Category Name</span>");
		}else{
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data  : $("#update_category_form").serialize(),
				success : function(data){
					window.location.href = "";
				}
			})
		}
	})

	//----------Brand-------------
	manageBrand(1);
	function manageBrand(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageBrand:1,pageno:pn},
			success : function(data){
				$("#get_brand").html(data);		
			}
		})
	}

	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageBrand(pn);
	})

	$("body").delegate(".del_brand","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteBrand:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Brand is deleted");
						manageBrand(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//Update Brand
	$("body").delegate(".edit_brand","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateBrand:1,id:eid},
			success : function(data){
				$("#bid").val(data["bid"]);
				$("#update_brand").val(data["brand_name"]);
			}
		})
	})

	$("#update_brand_form").on("submit",function(){
		if ($("#update_brand").val() == "") {
			$("#update_brand").addClass("border-danger");
			$("#brand_error").html("<span class='text-danger'>Please Enter Brand Name</span>");
		}else{
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data  : $("#update_brand_form").serialize(),
				success : function(data){
					alert(data);
					window.location.href = "";
				}
			})
		}
	})

	//---------------------Products-----------------
	manageProduct(1);
	function manageProduct(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageProduct:1,pageno:pn},
			success : function(data){
				$("#get_product").html(data);	
			}
		})
	}
	//page Number Buttons
	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageProduct(pn);
	})

	//delete product
	$("body").delegate(".del_product","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteProduct:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Product is deleted");
						manageProduct(1);
					}else{
						alert(data);
					}		
				}
			})
		}
	})

	//Update product
	$("body").delegate(".edit_product","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateProduct:1,id:eid},
			success : function(data){
				$("#pid").val(data["pid"]);
				$("#update_product").val(data["product_name"]);
				$("#select_cat").val(data["cid"]);
				$("#select_brand").val(data["bid"]);
				$("#product_price").val(data["product_price"]);
				$("#product_qty").val(data["product_stock"]);
			}
		})
	})

	//Update product
	$("#form_update_product").on("submit",function(){
		// console.log($("#form_update_product").serialize());
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : $("#form_update_product").serialize(),
			success : function(data){
				if (data == "UPDATED") {
					alert("Product Updated Successfully..!");
					window.location.href = "";
				}else{
					alert(data);
				}
			}
		})
	})

	//---------------------People-----------------
	managePeople(1);
	function managePeople(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {managePeople:1,pageno:pn},
			success : function(data){
				$("#get_people").html(data);	
			}
		})
	}
	
	// delete profile
	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		managePeople(pn);
	})

	$("body").delegate(".del_people","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deletePeople:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Profile is deleted");
						managePeople(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//Update people
	$("body").delegate(".edit_people","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updatePeople:1,id:eid},
			success : function(data){
				$("#id").val(data["id"]);
				$("#update_name").val(data["username"]);
				$("#update_employeeid").val(data["employeeid"]);
				$("#update_email").val(data["email"]);
				$("#update_type").val(data["usertype"]);
				$("#update_notes").val(data["notes"]);

			}
		})
	})

	//Update people
	$("#update_people_form").on("submit",function(){
		$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : $("#update_people_form").serialize(),
				success : function(data){
					if (data == "UPDATED") {
						alert("Profile Updated Successfully..!");
						window.location.href = "";
					}else{
						alert(data);
					}
				}
			})
	})

	//---------------------Purchase-----------------
	managePurchase(1);
	function managePurchase(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {managePurchase:1,pageno:pn},
			success : function(data){
				$("#get_purchase").html(data);
			}
		})
	}
	// delete purchase
	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		managePurchase(pn);
	})

	$("body").delegate(".del_purchase","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deletePurchase:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Purchase is deleted");
						managePurchase(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//Update Purchase
	$("body").delegate(".edit_purchase","click",function(){
		alert("We can`t allow you to do so bro")
	})

	//---------------------Order-----------------
	manageOrder(1);
	function manageOrder(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageOrder:1,pageno:pn},
			success : function(data){
				$("#get_order").html(data);
			}
		})
	}
	// delete order
	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageOrder(pn);
	})

	$("body").delegate(".del_order","click",function(){
		var did = $(this).attr("did");
		if (confirm("Are you sure ? You want to delete..!")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteOrder:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Order is deleted");
						manageOrder(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	// //Update Order
	$("body").delegate(".edit_order","click",function(){
		alert("We can`t allow you to do so bro")
	})
})