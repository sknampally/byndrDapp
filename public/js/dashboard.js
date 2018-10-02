
showloading();





var contractAddress = '0x619b31ee72c74a5baff90f9df7879af112c57e32';
var mainContract = web3.eth.contract(abiMyLibrary).at(contractAddress);

var totalBookCount;
var booksIssued;
var totalMembers;

var networkID;
var nameOfLibrary

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider);
    if (web3.currentProvider.isMetaMask === true || web3.currentProvider.isTrust === true) {
        web3.version.getNetwork((err, netId) => {
            networkID = netId;
            if (netId == 3) {
                // Do nothing
            } else {
                alert("You're not on right network. Switch to Ropsten Network in Metamask.");
            }
            account = web3.eth.accounts[0];
            ethBalance(account);
        });
    } else {
        //$('.yourAddr').text('Not found');
    }
}

mainContract.nameOfLibrary.call(function(err,res){
    if(!err){ 
        nameOfLibrary = res;
        $("#nameOfLib").text(nameOfLibrary);

        
        console.log("name set to :" + nameOfLibrary);
    } else {
        nameOfLibrary = "error - could not connect to library";
        console.log("name set to :"+nameOfLibrary);
    }
});

updateBookCount();

/* add  total book count */






mainContract.totalMemberCount.call(function(err,res){
    if(!err){ 
        totalMemberCount = res;
        $(".totalMemberCount").text(totalMemberCount);

        
        console.log("total member count :" + totalMemberCount);
    } else {
        totalMemberCount = "error - could not connect to library";
        console.log("total member count :"+totalMemberCount);
    }
});



function ethBalance(account) {
    web3.eth.getBalance(account, function (err, res) {
        if (!err) {
            // Add the balance to UI
        } else {
            web3Error();
            console.error(err);
        };
    });
}

$(document).ready(function() {
    console.log("document ready")
    var state = GetParameterValues('state');

    // if(state == undefined) {
    //     $('#list_books_block').css('display','block');
    //     $('#list_books tbody').append('<tr><td>1</td><td>Tiger Nixon</td><td>System Architect</td><td>Edinburgh</td><td>61</td><td ><span class="issue_book" data-id="1">Issue Book</span></td></tr><tr><td>2</td><td>Garrett Winters</td><td>Accountant</td><td>Tokyo</td><td>63</td><td ><span class="issue_book_disable">Book Issued</span></td></tr>');
    //     $('#list_books').DataTable(); // data table constructor
    //     $('#menu_dashboard').addClass('active');
    // }

    // if((state == "list_of_books")) {
    //     $('#list_books_block').css('display','block');
    //     $('#list_books tbody').append('<tr><td>1</td><td>Tiger Nixon</td><td>System Architect</td><td>Edinburgh</td><td>61</td><td ><span class="issue_book" data-id="1">Issue Book</span></td></tr><tr><td>2</td><td>Garrett Winters</td><td>Accountant</td><td>Tokyo</td><td>63</td><td ><span class="issue_book_disable">Book Issued</span></td></tr>');
    //     $('#list_books').DataTable(); // data table constructor
    //     $('#dashboard_stats').css('display','none');
    //     $('#menu_list_of_books').addClass('active');
    // }

    // if(state == "available_books") {
    //     $('#available_books_block').css('display','block');
    //     $('#available_books tbody').append('<tr><td>1</td><td>Tiger Nixon</td><td>System Architect</td><td>Edinburgh</td><td>61</td><td ><span class="issue_book" data-id="1">Issue Book</span></td></tr><tr><td>2</td><td>Garrett Winters</td><td>Accountant</td><td>Tokyo</td><td>63</td><td ><span class="issue_book_disable">Book Issued</span></td></tr>');
    //     $('#available_books').DataTable(); // data table constructor
    //     $('#dashboard_stats').css('display','none');
    //     $('#menu_available_books').addClass('active');
    // }

    // if(state == "books_issued") {
    //     $('#issued_books_block').css('display','block');
    //     var temp = [];
        
    //     console.log("issued book count is " + issuedBookCount);
    //     for (i = 0; i < 5; i++) {
    //         temp = '<tr><td>';
    //         temp = temp + i;
    //         temp = temp + '</td><td>Tiger Nixon</td><td>System Architect</td><td>Edinburgh</td><td>61</td><td><span class="issue_book_disable">Book Issued</span></td></tr>';
    //         $('#issued_books tbody').append(temp);
            
    //     };
        
    //     $('#issued_books').DataTable(); // data table constructor
    // }

    /* Current User Role as a Normal User or Pro user */
    // First Set as Normal user . then do  a call to change the button if the user has already joined

    $('.current_user_role').html('<a class="btn btn-success join_library">Join Library</a>');
    $('#menu_more_books').css('display','none');
    $('#menu_join_library').css('display','block');
    var curr_user_role = 'more_books';

    if(curr_user_role == 'more_books') {

        $('.current_user_role').html('<a class="btn btn-success more_books">Go Pro</a>');
        $('#menu_more_books').css('display','block');
        $('#menu_join_library').css('display','none');

    }else{

        $('.current_user_role').html('<a class="btn btn-success join_library">Join Library</a>');
        $('#menu_more_books').css('display','none');
        $('#menu_join_library').css('display','block');

    }


    /* Add book Functionality */

    $('.add_book').on('click',function(){
        $('.add_book_main').fadeIn();
    });


    $('.add_book_close').on('click',function(){
        $('.add_book_main').fadeOut();
    });

    $('#add_book_form').submit(function(e){
    e.preventDefault();

    var book_name = $('#book_name').val();
    var book_author = $('#book_author').val();
    var book_genre = $('#book_genre').val();
    var today = new Date('d/m/Y');

    if(book_genre && book_author && book_genre) {
        // Add Book Functionality 
        console.log (book_name,book_author, book_genre, today);
        // getting invalid date here 
        mainContract.addBook(book_name,book_author, book_genre, "22/09/2018",function(error, result){
            if(!error){
                console.log(JSON.stringify(result));
                
                $('.add_book_status').removeClass('error');
                $('.add_book_status').addClass('success');
                $('.add_book_status').html('You Have added Book Successfully');
                // RAHEEM -> Close this window here 
                setTimeout(function(){ location.reload(!0); }, 1000);
                // change to todays date 
            }
            else {
                console.error(error);
                $('.add_book_status').removeClass('success');
                $('.add_book_status').addClass('error');
                $('.add_book_status').html('Please fill all the fields');
            }
         }) 
        // end add book functionality

    } else {
        $('.add_book_status').removeClass('success');
        $('.add_book_status').addClass('error');
        $('.add_book_status').html('Please fill all the fields');


    }
    console.log("demo");
});

/* Add book Functionality */


/* Join Library Functionality */

$('.join_library').on('click',function(){

$('.join_library_main').fadeIn();

});


$('.join_library_close').on('click',function(){

$('.join_library_main').fadeOut();

});

$('#join_library_form').submit(function(e){
e.preventDefault();

var join_name = $('#join_name').val();
var join_email = $('#join_email').val();


if(join_name && join_email) {

// Join Library Functionality 
alert("join");

mainContract.joinClub({from:web3.eth.accounts[0],gas:3000000,value:"1000000000"},function(err,res){if(!err){console.log(res)} else {console.log(err)}})

// end Join Library functionality
$('.join_library_status').removeClass('error');
$('.join_library_status').addClass('success');
$('.join_library_status').html('You Have Joined Library Successfully');

setTimeout(function(){ location.reload(!0); }, 1000);

}else{

$('.join_library_status').removeClass('success');
$('.join_library_status').addClass('error');
$('.join_library_status').html('Please fill all the fields');

}

});

/* Join Library Functionality */


/* More books Functionality */

$('.more_books').on('click',function(){

    $('.more_books_main').fadeIn();
    });
    
    
    $('.more_books_close').on('click',function(){
    
    $('.more_books_main').fadeOut();
    
    });
    
    $('#more_books_form').submit(function(e){
    e.preventDefault();
    
    var more_books_name = $('#more_books_name').val();
    var more_books_email = $('#more_books_email').val();
    
    
    if(more_books_name && more_books_email) {
    
    // More books Functionality 
    alert("Go Pro");
    
    mainContract.joinClub({from:web3.eth.accounts[0],gas:3000000,value:"1000000000"},function(err,res){if(!err){console.log(res)} else {console.log(err)}})
    
    // end More books functionality
    $('.more_books_status').removeClass('error');
    $('.more_books_status').addClass('success');
    $('.more_books_status').html('You Have Subscribed Library Successfully');
    mainContract.joinClub({from:web3.eth.accounts[0],gas:3000000,value:"1000000000"},function(err,res){if(!err){console.log(res)} else {console.log(err)}})
 
    
    setTimeout(function(){ location.reload(!0); }, 1000);

    }else{
    
    $('.more_books_status').removeClass('success');
    $('.more_books_status').addClass('error');
    $('.more_books_status').html('Please fill all the fields');
    mainContract.joinClub({from:web3.eth.accounts[0],gas:3000000,value:"1000000000"},function(err,res){if(!err){console.log(res)} else {console.log(err)}})
 
    
    }
    
    });
    
    /* More books Functionality */

// Code for issue book -- Button click functionality
    $('body').on('click','.issue_book',function(){
        var book_id = $(this).data('id');
        mainContract.issueBook(book_id,function(err,res){if(!err){console.log(res)} else {console.log(err)}})
        location.reload(!0);

    });

/* end of Code for Issue Book*/

    // readd the button for selecting Genre 
    $("#book_genre").select2({
        theme: "bootstrap",
        placeholder: "Select a Genre"
    });


} );


stopLoading();



// starts showing the loader function 
function showloading() {
    $('#loader').css('display','block');
}
  
// stops showing the loader function   
function stopLoading() {
    $('#loader').css('display','none');
}

// function to get a specific parameter
function GetParameterValues(param) {  
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
    for (var i = 0; i < url.length; i++) {  
        var urlparam = url[i].split('=');  
        if (urlparam[0] == param) {  
            return urlparam[1];  
        }  
    }  
}

function updateBookCount(){
    mainContract.totalBookCount.call(function(err,res){
        if(!err){ 
            totalBookCount = res;
            updateAvailableAndIssuedBookCount();  // called from within to ensure that totalBookCount is set
            $(".totalBookCount").text(totalBookCount);          
            console.log("name set to :" + totalBookCount);
        } else {
            totalBookCount = "error - could not connect to library";
            console.log("total book count set to :"+totalBookCount);
        }
    });
}

// called from within updateBookCount so no need to call it seperately
function updateAvailableAndIssuedBookCount() {
    mainContract.availableBookCount.call(function(err,res){
        if(!err){ 
            availableBookCount = res;
            
            $(".availableBookCount").text(availableBookCount);
            issuedBookCount = totalBookCount - availableBookCount;
            $(".issuedBookCount").text(issuedBookCount);        
            {
                $('#list_books_block').css('display','block');
                counterStop = totalBookCount;
                for (i = 0; i < counterStop; i++) {   
                    mainContract.AllBooks.call(i,updateTable(err,res));
                };
            }
            
        } else {
            avaialbleBookCount = "error - could not connect to library";
            console.log("name set to :"+avaialbleBookCount);
        }
});
}

// udates the list of books table on row at a time 
function updateTable (err,book){
    /*  
        struct Book {
        uint16 bookNumber;
        string nameOfBook;
        string author;        
        string genre;
        string date;
        address borrower;
        bool issued;
    }
    */
    temp = '<tr><td>';
    temp += book[0] ; // currently counter in smart contract byndr6 is off by 1 , but code is already fixed
    temp += '</td><td>'
    temp += book[1];
    temp += '</td><td>'
    temp += book[2];
    temp += '</td><td>Genre</td><td>'
    temp += '13/9/2018'
    if ((book[6])){
        temp += '</td><td><span class="issue_book_disable">Book Issued'}
    else {
        temp+='</td><td><span class="issue_book" data-id="'+(book[0]-1)+'">Issue Book'
    };

    temp += '</span></td></tr>';
    console.log(book[0].c[0], book[6], temp);
    $('#list_books tbody').append(temp);
   
    if ( book[0].c[0] == (counterStop.c[0] )) {
        $('#list_books').DataTable(); // data table constructor
        $('#menu_dashboard').addClass('active'); 
        console.log(res,counterStop);
       
    }
}